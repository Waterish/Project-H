// js/main.js

import * as state from './state.js';
import * as ui from './ui.js';
import * as actions from './actions.js';
import * as fb from './firebase.js';

let gameLoopInterval = null;

/**
 * The main game loop, responsible for time-based state changes.
 */
function gameLoop() {
    // This condition now handles the pausing automatically
    if (state.getIsGameOver() || state.getIsPaused() || ui.isModalOpen()) {
        return;
    }

    actions.handleTimePassing();
    handleEndOfAction();
    ui.updateUI();
    fb.saveGameState();
}

/**
 * Starts the main game loop interval.
 */
function startGameLoop() {
    stopGameLoop(); // Ensure no duplicate loops are running
    gameLoopInterval = setInterval(gameLoop, 5000);
    if (!state.getIsPaused()) {
        ui.logMessage("Time resumes its flow...", "system");
    }
}

/**
 * Stops the main game loop interval.
 */
function stopGameLoop() {
    clearInterval(gameLoopInterval);
}

/**
 * Toggles the paused state of the game.
 */
function togglePause() {
    if (state.getIsGameOver()) return;

    const isNowPaused = state.togglePaused();
    ui.updatePauseButton(isNowPaused);

    if (isNowPaused) {
        stopGameLoop();
        ui.logMessage("Game paused.", "system");
    } else {
        startGameLoop();
    }
    ui.disableAllActions(isNowPaused);
}

/**
 * Initializes a new game session.
 * @param {boolean} isOnline - Whether to start an online or offline game.
 */
async function startNewGame(isOnline) {
    if (state.getIsPaused()) {
        togglePause(); // Unpause if starting a new game
    }

    state.initializeState(isOnline);
    ui.resetUI();
    ui.closeModal(document.getElementById('new-life-modal'));
    ui.showLoading(true);

    if (isOnline) {
        const userId = await fb.authenticateUser();
        if (userId) {
            await fb.createNewGameInDb();
            ui.setUserIdDisplay(userId);
        } else {
            ui.logMessage("Could not start online game. Starting in offline mode instead.", "warning");
            state.initializeState(false); // Fallback to offline
        }
    }

    ui.showLoading(false);
    ui.showGameContainer(true);
    ui.updateUI();
    startGameLoop();
}

/**
 * Sets up all event listeners for the game's buttons and modals.
 */
function setupEventListeners() {
    // --- Main Action Buttons ---
    const actionButtons = {
        'work-btn': actions.handleWork,
        'eat-btn': actions.handleEat,
        'play-btn': actions.handlePlay,
        'sleep-btn': actions.handleSleep,
        'family-btn': actions.handleVisitFamily,
        'friends-btn': actions.handleHangWithFriends,
        'portal-btn': actions.handleExplorePortal,
        'reflect-btn': actions.handleReflect
    };

    for (const [id, handler] of Object.entries(actionButtons)) {
        document.getElementById(id)?.addEventListener('click', () => {
            handler();
            handleEndOfAction();
            ui.updateUI();
            fb.saveGameState();
        });
    }

    // --- Modal Triggers & UI Buttons ---
    document.getElementById('pause-btn')?.addEventListener('click', togglePause);
    document.getElementById('new-life-btn')?.addEventListener('click', () => ui.openModal(document.getElementById('new-life-modal')));
    document.getElementById('shop-btn')?.addEventListener('click', ui.showShopModal);
    document.getElementById('contraptions-btn')?.addEventListener('click', ui.showContraptionModal);
    document.getElementById('view-relics-btn')?.addEventListener('click', ui.showRelicModal);
    document.getElementById('vorpal-gear-btn')?.addEventListener('click', ui.showVorpalGearModal);
    document.getElementById('compendium-btn')?.addEventListener('click', ui.showCompendiumModal);

    // --- New Life Modal ---
    document.getElementById('start-online-btn')?.addEventListener('click', () => startNewGame(true));
    document.getElementById('start-offline-btn')?.addEventListener('click', () => startNewGame(false));
    document.getElementById('cancel-new-life-btn')?.addEventListener('click', () => {
        if (state.isGameActive()) {
            ui.closeModal(document.getElementById('new-life-modal'));
        }
    });

    // --- Game Over Modal ---
    document.getElementById('restart-btn')?.addEventListener('click', () => {
        ui.closeModal(document.getElementById('game-over-modal'));
        ui.openModal(document.getElementById('new-life-modal'));
    });
    document.getElementById('continue-btn')?.addEventListener('click', () => {
        ui.closeModal(document.getElementById('game-over-modal'));
        actions.handleContinueToEndless(); // Delegate this logic
        ui.openModal(document.getElementById('endless-mode-modal'));
        startGameLoop();
    });

    // --- Shop Modal ---
    document.getElementById('close-shop-modal-btn')?.addEventListener('click', () => ui.closeModal(document.getElementById('shop-modal')));
    document.getElementById('shop-buy-food-btn')?.addEventListener('click', () => actions.handleBuy('food'));
    document.getElementById('shop-buy-supplies-btn')?.addEventListener('click', () => actions.handleBuy('supplies'));
    document.getElementById('shop-buy-ammo-btn')?.addEventListener('click', () => actions.handleBuy('ammo'));
    document.getElementById('shop-buy-trashcan-btn')?.addEventListener('click', () => actions.handleBuy('trashcan'));

    // --- Add all other modal close buttons and specific action buttons here ---
    // Example for a generic close button
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.closest('.modal-class').id; // You'd need a common class on your modals
            ui.closeModal(document.getElementById(modalId));
        });
    });

    //Relic List Listener
    document.getElementById('relic-list')?.addEventListener('click', (event) => {
        const target = event.target;
        const relicId = parseFloat(target.dataset.relicId);

        if (target.matches('.relic-sell-btn')) {
            actions.handleSellRelic(relicId);
            // The UI and state are updated inside handleSellRelic
        }

        if (target.matches('.relic-exp-btn')) {
            actions.handleBuildExperiment(relicId);
        }
    });
}

/**
 * Main entry point for the application.
 */
window.onload = async () => {
    // Expose functions to be called from other modules if needed (e.g., UI calling main logic)
    // This is useful for decoupling, so UI doesn't call actions directly.
    window.main = {
        startNewGame,
        togglePause,
        stopGameLoop,
        startGameLoop
    };

    const onlineCapable = await fb.initializeFirebase();
    ui.setOnlineButtonState(onlineCapable); // Let UI module handle DOM change

    setupEventListeners();
    ui.openModal(document.getElementById('new-life-modal'));
};

function handleEndOfAction() {
    ui.updateUI(); // First, update the UI with the new stats

    const gameOverReason = state.checkGameOverConditions(); // Then, check if the action ended the game
    if (gameOverReason) {
        ui.showGameOverModal(gameOverReason);
        stopGameLoop();
    } else {
        fb.saveGameState(); // Only save if the game isn't over
    }
}
