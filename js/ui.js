// js/ui.js
import { VORPAL_EFFECTS, RELIC_ELEMENTS, OFFLINE_RELICS, VORPAL_COMBO_ORDER, MONSTERS } from './constants.js';
import * as state from './state.js';

// --- DOM ELEMENTS ---
const moneyStatEl = document.getElementById('money-stat');
const foodStatEl = document.getElementById('food-stat');
const suppliesStatEl = document.getElementById('supplies-stat');
const lifeCrystalStatEl = document.getElementById('life-crystal-stat');
const lifeCrystalStatContainer = document.getElementById('life-crystal-stat-container');
const ammoStatEl = document.getElementById('ammo-stat');
const ammoStatContainer = document.getElementById('ammo-stat-container');
const relicStatEl = document.getElementById('relic-stat');
const scienceStatEl = document.getElementById('science-stat');
const relicStatContainer = document.getElementById('relic-stat-container');
const scienceStatContainer = document.getElementById('science-stat-container');
const etherBubbleStatEl = document.getElementById('ether-bubble-stat');
const etherBubbleStatContainer = document.getElementById('ether-bubble-stat-container');
const energyBarEl = document.getElementById('energy-bar');
const happinessBarEl = document.getElementById('happiness-bar');
const hungerBarEl = document.getElementById('hunger-bar');
const familyBarEl = document.getElementById('family-bar');
const friendsBarEl = document.getElementById('friends-bar');
const energyValueEl = document.getElementById('energy-value');
const happinessValueEl = document.getElementById('happiness-value');
const hungerValueEl = document.getElementById('hunger-value');
const familyValueEl = document.getElementById('family-value');
const friendsValueEl = document.getElementById('friends-value');
const energyWarningEl = document.getElementById('energy-warning');
const happinessWarningEl = document.getElementById('happiness-warning');
const hungerWarningEl = document.getElementById('hunger-warning');
const familyStatusEl = document.getElementById('family-status');
const friendsStatusEl = document.getElementById('friends-status');
const messageLogEl = document.getElementById('message-log');
const toastContainer = document.getElementById('toast-container');
const endlessModeIndicator = document.getElementById('endless-mode-indicator');
const trashcanIndicator = document.getElementById('trashcan-indicator');
// Buttons
const workBtn = document.getElementById('work-btn');
const eatBtn = document.getElementById('eat-btn');
const playBtn = document.getElementById('play-btn');
const sleepBtn = document.getElementById('sleep-btn');
const familyBtn = document.getElementById('family-btn');
const friendsBtn = document.getElementById('friends-btn');
const portalBtn = document.getElementById('portal-btn');
const contraptionsBtn = document.getElementById('contraptions-btn');
const reflectBtn = document.getElementById('reflect-btn');
const viewRelicsBtn = document.getElementById('view-relics-btn');
const pauseBtn = document.getElementById('pause-btn');
const vorpalGearBtn = document.getElementById('vorpal-gear-btn');
const newLifeBtn = document.getElementById('new-life-btn');
const shopBtn = document.getElementById('shop-btn');
const compendiumBtn = document.getElementById('compendium-btn');
// Modals
const gameOverModal = document.getElementById('game-over-modal');
const gameOverTitleEl = document.getElementById('game-over-title');
const gameOverMessage = document.getElementById('game-over-message');
const restartBtn = document.getElementById('restart-btn');
const continueBtn = document.getElementById('continue-btn');
const relicModal = document.getElementById('relic-modal');
const relicListEl = document.getElementById('relic-list');
const closeRelicModalBtn = document.getElementById('close-relic-modal-btn');
const contraptionModal = document.getElementById('contraption-modal');
const closeContraptionModalBtn = document.getElementById('close-contraption-modal-btn');
const buildZapperBtn = document.getElementById('build-zapper-btn');
const buildVorpalGearBtn = document.getElementById('build-vorpal-gear-btn');
const buildElementalDischargerBtn = document.getElementById('build-elemental-discharger-btn');
const buildCompendiumBtn = document.getElementById('build-compendium-btn');
const buildNeutralizerBtn = document.getElementById('build-neutralizer-btn');
const neutralizerNameEl = document.getElementById('neutralizer-name');
const neutralizerCostEl = document.getElementById('neutralizer-cost');
const sifelimEncounterModal = document.getElementById('sifelim-encounter-modal');
const closeSifelimModalBtn = document.getElementById('close-sifelim-modal-btn');
const sifelimFinalEncounterModal = document.getElementById('sifelim-final-encounter-modal');
const fireNeutralizerBtn = document.getElementById('fire-neutralizer-btn');
const endlessModeModal = document.getElementById('endless-mode-modal');
const closeEndlessModalBtn = document.getElementById('close-endless-modal-btn');
const vorpalGearModal = document.getElementById('vorpal-gear-modal');
const closeVorpalGearModalBtn = document.getElementById('close-vorpal-gear-modal-btn');
const vorpalGearSlotsEl = document.getElementById('vorpal-gear-slots');
const vorpalGearInventoryEl = document.getElementById('vorpal-gear-inventory');
const portalDiscoveryModal = document.getElementById('portal-discovery-modal');
const closePortalDiscoveryModalBtn = document.getElementById('close-portal-discovery-modal-btn');
const firstRelicModal = document.getElementById('first-relic-modal');
const closeFirstRelicModalBtn = document.getElementById('close-first-relic-modal-btn');
const firstLifeCrystalModal = document.getElementById('first-life-crystal-modal');
const closeFirstLifeCrystalModalBtn = document.getElementById('close-first-life-crystal-modal-btn');
const neutralizerBuiltModal = document.getElementById('neutralizer-built-modal');
const closeNeutralizerBuiltModalBtn = document.getElementById('close-neutralizer-built-modal-btn');
const newLifeModal = document.getElementById('new-life-modal');
const startOnlineBtn = document.getElementById('start-online-btn');
const startOfflineBtn = document.getElementById('start-offline-btn');
const cancelNewLifeBtn = document.getElementById('cancel-new-life-btn');
const shopModal = document.getElementById('shop-modal');
const closeShopModalBtn = document.getElementById('close-shop-modal-btn');
const shopBuyFoodBtn = document.getElementById('shop-buy-food-btn');
const shopBuySuppliesBtn = document.getElementById('shop-buy-supplies-btn');
const shopBuyAmmoBtn = document.getElementById('shop-buy-ammo-btn');
const shopBuyTrashcanBtn = document.getElementById('shop-buy-trashcan-btn');
const shopTrashcanItem = document.getElementById('shop-trashcan-item');
const foodCostEl = document.getElementById('food-cost');
const suppliesCostEl = document.getElementById('supplies-cost');
const ammoCostEl = document.getElementById('ammo-cost');
const foodHaveEl = document.getElementById('food-have');
const suppliesHaveEl = document.getElementById('supplies-have');
const ammoHaveEl = document.getElementById('ammo-have');
const ammoNameEl = document.getElementById('ammo-name');
const ammoDescEl = document.getElementById('ammo-desc');
const shopAmmoItem = document.getElementById('shop-ammo-item');
const shopBonusIndicator = document.getElementById('shop-bonus-indicator');
const shopPenaltyIndicator = document.getElementById('shop-penalty-indicator');
const shopMoneyDisplay = document.getElementById('shop-money-display');
const contraptionMoneyDisplay = document.getElementById('contraption-money-display');
const contraptionScienceDisplay = document.getElementById('contraption-science-display');
const relicMoneyDisplay = document.getElementById('relic-money-display');
const relicScienceDisplay = document.getElementById('relic-science-display');
const compendiumModal = document.getElementById('compendium-modal');
const closeCompendiumModalBtn = document.getElementById('close-compendium-modal-btn');
const compendiumRelicsEl = document.getElementById('compendium-relics');
const compendiumMonstersEl = document.getElementById('compendium-monsters');
const compendiumVorpalEffectsEl = document.getElementById('compendium-vorpal-effects');
const vorpalEffectDisplay = document.getElementById('vorpal-effect-display');
const vorpalEffectName = document.getElementById('vorpal-effect-name');
const vorpalEffectDescription = document.getElementById('vorpal-effect-description');
const vorpalGearEffectDisplay = document.getElementById('vorpal-gear-effect-display');
const vorpalGearEffectName = document.getElementById('modal-vorpal-effect-name');
const vorpalGearEffectDescription = document.getElementById('modal-vorpal-effect-description');
const lifeCrystalFoundModal = document.getElementById('life-crystal-found-modal');
const closeLifeCrystalFoundModalBtn = document.getElementById('close-life-crystal-found-modal-btn');
const completionModal = document.getElementById('completion-modal');
const completionTitleEl = document.getElementById('completion-title');
const completionMessageEl = document.getElementById('completion-message');
const completionRewardEl = document.getElementById('completion-reward');
const closeCompletionModalBtn = document.getElementById('close-completion-modal-btn');
const vorpalDiscoveryTrackerEl = document.getElementById('vorpal-discovery-tracker');
const etherSealBtn = document.getElementById('ether-seal-btn');
// Overlays
const loadingOverlay = document.getElementById('loading-overlay');
const gameContainer = document.getElementById('game-container');
const userIdDisplay = document.getElementById('userIdDisplay');

let openModalCount = 0;
/**
 * Checks if any modal is currently open.
 * @returns {boolean}
 */
export function isModalOpen() {
    return openModalCount > 0;
}

export function initGame() {
    logMessage("Welcome to LifeSim! Your journey begins now.", "system");
    disableAllActions(false);
    updateUI();
    if(gameLoopInterval) clearInterval(gameLoopInterval);
    gameLoopInterval = setInterval(gameLoop, 5000);
}

export function updateUI() {
    if (state.gameState.money === undefined) return; // Exit if game hasn't started

    // --- Update Top Stat Displays ---
    document.getElementById('money-stat').textContent = `$${Math.round(state.gameState.money)}`;
    document.getElementById('food-stat').textContent = state.gameState.food;
    document.getElementById('supplies-stat').textContent = state.gameState.supplies;
    document.getElementById('ammo-stat').textContent = state.gameState.energyBolts;
    document.getElementById('relic-stat').textContent = state.gameState.relicsOnHand.length;
    document.getElementById('science-stat').textContent = state.gameState.science;
    document.getElementById('ether-bubble-stat').textContent = state.gameState.etherBubbles;
    document.getElementById('life-crystal-stat').textContent = state.gameState.lifeCrystals;

    // --- Update Progress Bars and Values ---
    const bars = ['energy', 'happiness', 'hunger', 'family', 'friends'];
    bars.forEach(stat => {
        const barEl = document.getElementById(`${stat}-bar`);
        const valueEl = document.getElementById(`${stat}-value`);
        if (barEl && valueEl) {
            const value = Math.round(state.gameState[stat]);
            barEl.style.width = `${value}%`;
            valueEl.textContent = `${value}/100`;
        }
    });

    // --- Update Warnings & Statuses ---
    document.getElementById('energy-warning').classList.toggle('hidden', state.gameState.energy > 8);
    document.getElementById('happiness-warning').classList.toggle('hidden', state.gameState.happiness > 8);
    document.getElementById('hunger-warning').classList.toggle('hidden', state.gameState.hunger > 8);
    updateSocialStatus(familyStatusEl, state.gameState.family, '💳 Family Credit!', '💸 Homeless');
    updateSocialStatus(friendsStatusEl, state.gameState.friends, '✊ Resilience!', '👹 All Alone');
    
    // --- Update Conditional Elements Visibility ---
    const hasRelics = state.gameState.relicsOnHand.length > 0 || state.gameState.hasEverFoundRelic;
    document.getElementById('relic-stat-container').style.display = hasRelics ? 'flex' : 'none';
    document.getElementById('science-stat-container').style.display = state.gameState.science > 0 || hasRelics ? 'flex' : 'none';
    document.getElementById('ammo-stat-container').style.display = state.gameState.energyBolts > 0 || state.gameState.hasEverFoundAmmo ? 'flex' : 'none';
    document.getElementById('life-crystal-stat-container').style.display = state.gameState.lifeCrystals > 0 || state.gameState.hasEverFoundLifeCrystal ? 'flex' : 'none';
    document.getElementById('ether-bubble-stat-container').style.display = state.gameState.etherBubbles > 0 || state.gameState.hasEverFoundEtherBubble ? 'flex' : 'none';
    document.getElementById('view-relics-btn').style.display = state.gameState.hasEverFoundRelic ? 'block' : 'none';
    document.getElementById('contraptions-btn').style.display = state.gameState.hasBuiltFirstExperiment ? 'block' : 'none';
    document.getElementById('portal-btn').style.display = state.gameState.portalDiscovered ? 'block' : 'none';
    document.getElementById('vorpal-gear-btn').style.display = state.gameState.hasVorpalGear ? 'block' : 'none';
    document.getElementById('compendium-btn').style.display = state.gameState.hasCompendium ? 'block' : 'none';
}

export function updateSocialStatus(element, value, bonusText, penaltyText) {
    if (value >= 85) {
        element.textContent = bonusText;
        element.className = 'text-xs font-bold px-2 py-1 rounded-full text-green-700 bg-green-100';
        element.classList.remove('hidden');
    } else if (value < 15) {
        element.textContent = penaltyText;
        element.className = 'text-xs font-bold px-2 py-1 rounded-full text-red-700 bg-red-100';
        element.classList.remove('hidden');
    } else {
        element.classList.add('hidden');
    }
}

export function updateShopModalUI() {
    const modifiers = state.getPurchaseModifiers();
    const familyBonus = state.gameState.family >= 85;
    const familyPenalty = state.gameState.family < 15;


    shopBonusIndicator.classList.toggle('hidden', !familyBonus);
    shopPenaltyIndicator.classList.toggle('hidden', !familyPenalty);

    const costs = [foodCostEl, suppliesCostEl, ammoCostEl];
    costs.forEach(el => {
        el.classList.toggle('font-bold', familyPenalty);
        el.classList.toggle('text-red-600', familyPenalty);
    });

    shopMoneyDisplay.textContent = Math.round(state.gameState.money);
    foodCostEl.textContent = `$${Math.round(10 * modifiers.shop)}`;
    suppliesCostEl.textContent = `$${Math.round(20 * modifiers.shop)}`;
    ammoCostEl.textContent = `$${Math.round(80 * modifiers.shop)}`;
    foodHaveEl.textContent = state.gameState.food;
    suppliesHaveEl.textContent = state.gameState.supplies;
    ammoHaveEl.textContent = state.gameState.energyBolts;

    if (state.gameState.hasZapper || state.gameState.hasElementalDischarger) {
        ammoNameEl.textContent = "Energy Bolt ⚡";
        ammoDescEl.textContent = "A bolt of pure energy. Ammo for contraptions.";
        shopBuyAmmoBtn.disabled = false;
        shopAmmoItem.classList.remove('opacity-50');
    } else {
        ammoNameEl.textContent = "???";
        ammoDescEl.textContent = "Ammo for some kind of otherworldly weapon I suppose.";
        shopBuyAmmoBtn.disabled = true;
        shopAmmoItem.classList.add('opacity-50');
    }
    
    shopTrashcanItem.classList.toggle('hidden', !(state.gameState.relicCompendium.length >= OFFLINE_RELICS.length));
    if(state.gameState.hasGoldenTrashcan) {
        shopBuyTrashcanBtn.disabled = true;
        shopBuyTrashcanBtn.textContent = "Owned";
    } else {
        shopBuyTrashcanBtn.disabled = state.gameState.money < 2000;
        shopBuyTrashcanBtn.textContent = "Buy";
    }
}

export function updateContraptionModalUI() {
    const modifiers = state.getPurchaseModifiers();
    contraptionMoneyDisplay.textContent = Math.round(state.gameState.money);
    contraptionScienceDisplay.textContent = state.gameState.science;

    const updateButtonState = (btn, hasItemFlag, scienceCost, moneyCost) => {
        if (hasItemFlag) {
            btn.textContent = 'Owned ✅';
            btn.disabled = true;
        } else {
            btn.textContent = 'Build';
            // Use the modifier from our getter function
            const discountedMoney = Math.round(moneyCost * modifiers.contraption);
            btn.disabled = !(state.gameState.science >= scienceCost && state.gameState.money >= discountedMoney);
        }
    };

    const updateCostDisplay = (costEl, scienceCost, moneyCost) => {
        const discountedMoney = Math.round(moneyCost * modifiers.contraption);
        // Check if a discount is active to display the strikethrough text
        if (modifiers.contraption < 1) {
            costEl.innerHTML = `${scienceCost} Science, <span class="line-through text-slate-400">$${moneyCost}</span> <span class="text-green-600 font-bold">$${discountedMoney}</span>`;
        } else {
            costEl.textContent = `${scienceCost} Science, $${moneyCost}`;
        }
    };

    // Update each contraption with its correct cost
    updateButtonState(buildCompendiumBtn, state.gameState.hasCompendium, 1, 40);
    updateCostDisplay(document.getElementById('compendium-cost-display'), 1, 40);

    updateButtonState(buildVorpalGearBtn, state.gameState.hasVorpalGear, 5, 100);
    updateCostDisplay(document.getElementById('vorpal-gear-cost-display'), 5, 100);

    updateButtonState(buildZapperBtn, state.gameState.hasZapper, 10, 200);
    updateCostDisplay(document.getElementById('zapper-cost-display'), 10, 200);
    
    updateButtonState(buildElementalDischargerBtn, state.gameState.hasElementalDischarger, 15, 300);
    updateCostDisplay(document.getElementById('elemental-discharger-cost-display'), 15, 300);

    // Neutralizer logic
    if (state.gameState.hasNeutralizer) {
        buildNeutralizerBtn.textContent = 'Owned ✅';
        buildNeutralizerBtn.disabled = true;
    } else {
        const moneyCost = 400;
        const scienceCost = 20;
        const crystalCost = 3;
        const discountedMoney = Math.round(moneyCost * modifiers.contraption);
        
        updateCostDisplay(neutralizerCostEl, scienceCost, moneyCost); // This will handle the text display
        
        buildNeutralizerBtn.textContent = 'Build';
        buildNeutralizerBtn.disabled = !(state.gameState.science >= scienceCost && state.gameState.money >= discountedMoney && state.gameState.lifeCrystals >= crystalCost);
    }
    
    if (state.gameState.hasEverFoundLifeCrystal) {
        neutralizerNameEl.textContent = "Neutralizer";
    } else {
        neutralizerNameEl.textContent = "???";
        neutralizerCostEl.textContent = "???";
    }
}

export function updateVorpalGearModalUI() {
    if (state.gameState.activeVorpalEffect && state.gameState.activeVorpalEffect.name !== 'None') {
        vorpalGearEffectDisplay.classList.remove('hidden');
        vorpalGearEffectName.textContent = state.gameState.activeVorpalEffect.name;
        vorpalGearEffectDescription.textContent = state.gameState.activeVorpalEffect.description;
    } else {
        vorpalGearEffectDisplay.classList.add('hidden');
    }

    vorpalGearSlotsEl.innerHTML = '';
    state.gameState.equippedRelics.forEach((relic, index) => {
        const slotDiv = document.createElement('div');
        slotDiv.className = 'relic-slot bg-slate-100 rounded-lg p-2 flex items-center justify-center';
        slotDiv.dataset.slotIndex = index;
        if (relic) {
            const relicDiv = createRelicElement(relic, 'slot');
            slotDiv.appendChild(relicDiv);
        } else {
            slotDiv.innerHTML = `<span class="text-slate-400 pointer-events-none">Slot ${index + 1}</span>`;
        }
        vorpalGearSlotsEl.appendChild(slotDiv);
    });

    vorpalGearInventoryEl.innerHTML = '';
    const equippedIds = new Set(state.gameState.equippedRelics.filter(r => r).map(r => r.id));
    const availableRelics = state.gameState.relicsOnHand
        .filter(r => !equippedIds.has(r.id))
        .sort((a, b) => RELIC_ELEMENTS.indexOf(a.element) - RELIC_ELEMENTS.indexOf(b.element));

    if (availableRelics.length > 0) {
        availableRelics.forEach(relic => {
            const relicDiv = createRelicElement(relic, 'inventory');
            vorpalGearInventoryEl.appendChild(relicDiv);
        });
    } else {
        vorpalGearInventoryEl.innerHTML = '<p class="text-slate-500 col-span-2 pointer-events-none">No relics available to equip.</p>';
    }
    updateVorpalDiscoveryTrackerUI();
    addDragAndDropListeners();
}

export function updateVorpalDiscoveryTrackerUI() {
    vorpalDiscoveryTrackerEl.innerHTML = '';
    VORPAL_COMBO_ORDER.forEach(effectKey => {
        const effect = VORPAL_EFFECTS[effectKey];
        const isDiscovered = state.gameState.discoveredVorpalEffects.includes(effectKey);
        const isSealed = state.gameState.permanentlySealedEffects.includes(effect.name);
        const span = document.createElement('span');
        span.className = `p-1 ${isSealed ? 'sealed-effect-icon' : ''}`;
        span.title = isDiscovered ? `${effect.name} - ${effect.description}` : 'Undiscovered';
        
        const emojiMatch = effect.name.match(/\p{Emoji}/u);
        span.textContent = isDiscovered && emojiMatch ? emojiMatch[0] : '❓';
        
        vorpalDiscoveryTrackerEl.appendChild(span);
    });

    const currentEffect = state.gameState.activeVorpalEffect;
    const canSeal = state.gameState.etherBubbles > 0 &&
                    currentEffect.type === 'combo' &&
                    !state.gameState.permanentlySealedEffects.includes(currentEffect.name);
    etherSealBtn.disabled = !canSeal;
}

export function createRelicElement(relic, sourceType) {
    const elementColors = { Fire: 'border-red-500', Water: 'border-blue-500', Earth: 'border-amber-600', Wind: 'border-green-500', Ice: 'border-cyan-400', Lightning: 'border-yellow-400' };
    const textColors = { Fire: 'text-red-500', Water: 'text-blue-500', Earth: 'text-amber-600', Wind: 'text-green-500', Ice: 'text-cyan-400', Lightning: 'text-yellow-400' };
    
    const relicDiv = document.createElement('div');
    relicDiv.className = `relic-item p-2 rounded-lg bg-white w-full ${elementColors[relic.element] || 'border-gray-500'}`;
    relicDiv.draggable = true;
    relicDiv.dataset.relicId = relic.id;
    relicDiv.dataset.source = sourceType;
    relicDiv.innerHTML = `<h4 class="font-bold text-sm text-slate-700 pointer-events-none">${relic.name}</h4>
                            <p class="text-xs ${textColors[relic.element] || 'text-gray-500'} pointer-events-none">${relic.element}</p>`;
    return relicDiv;
}

export function updateBarColor(barElement, value, colorClasses) {
    barElement.classList.remove(...colorClasses);
    if (value <= 8) barElement.classList.add(colorClasses[0]);
    else if (value < 50) barElement.classList.add(colorClasses[1]);
    else barElement.classList.add(colorClasses[2]);
}

export function logMessage(message, type = "action") {
    const p = document.createElement('p');
    const prefixes = { action: "➡️", system: "💡", warning: "⚠️", portal: "🌀", monster: "👹", science: "🔬", zapper: "⚡️", relic: "💎", reflection: "✍️", win: "🏆", contraption: "⚙️" };
    p.innerHTML = `${prefixes[type] || "➡️"} ${message}`;
    messageLogEl.appendChild(p);
    messageLogEl.scrollTop = messageLogEl.scrollHeight;
}

/**
 * Displays a modal element.
 * @param {HTMLElement} modalElement The modal to show.
 */
export function openModal(modalElement) {
    if (!modalElement) return;

    openModalCount++;
    modalElement.classList.remove('hidden');
}

/**
 * Hides a modal element.
 * @param {HTMLElement} modalElement The modal to hide.
 */
export function closeModal(modalElement) {
    if (!modalElement) return;

    openModalCount = Math.max(0, openModalCount - 1); // Prevent going below zero
    modalElement.classList.add('hidden');
}

// --- DRAG AND DROP LOGIC (MOUSE & TOUCH) ---
let draggedItem = null;
let ghostItem = null;
let lastTouchTarget = null;

export function addDragAndDropListeners() {
    document.querySelectorAll('.relic-item').forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('touchstart', handleTouchStart, { passive: false });
    });
    document.querySelectorAll('.relic-slot').forEach(slot => {
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('dragleave', handleDragLeave);
        slot.addEventListener('drop', handleDrop);
    });
    vorpalGearInventoryEl.addEventListener('dragover', handleDragOver);
    vorpalGearInventoryEl.addEventListener('dragleave', handleDragLeave);
    vorpalGearInventoryEl.addEventListener('drop', handleDrop);
    
    document.body.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.body.addEventListener('touchend', handleTouchEnd);
}

export function handleDragStart(e) {
    draggedItem = e.target;
    e.dataTransfer.setData('text/plain', e.target.dataset.relicId);
    setTimeout(() => e.target.classList.add('dragging'), 0);
}

export function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedItem = null;
}

export function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

export function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

export function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const relicId = parseFloat(e.dataTransfer.getData('text/plain'));
    const target = e.currentTarget;
    processDrop(relicId, target);
}

export function handleTouchStart(e) {
    e.preventDefault();
    draggedItem = e.currentTarget;
    draggedItem.classList.add('dragging');
    
    ghostItem = draggedItem.cloneNode(true);
    ghostItem.classList.add('touch-ghost');
    document.body.appendChild(ghostItem);
    
    const touch = e.touches[0];
    positionGhost(touch.pageX, touch.pageY);
}

export function handleTouchMove(e) {
    if (!draggedItem || !ghostItem) return;
    e.preventDefault();
    const touch = e.touches[0];
    positionGhost(touch.pageX, touch.pageY);

    ghostItem.style.display = 'none';
    const newTarget = document.elementFromPoint(touch.clientX, touch.clientY);
    ghostItem.style.display = '';

    if (lastTouchTarget !== newTarget) {
        if (lastTouchTarget) lastTouchTarget.classList.remove('drag-over');
        
        const validTarget = newTarget ? newTarget.closest('.relic-slot, #vorpal-gear-inventory') : null;
        if (validTarget) {
            lastTouchTarget = validTarget;
            lastTouchTarget.classList.add('drag-over');
        } else {
            lastTouchTarget = null;
        }
    }
}

export function handleTouchEnd(e) {
    if (!draggedItem) return;
    
    if (lastTouchTarget) {
        const relicId = parseFloat(draggedItem.dataset.relicId);
        processDrop(relicId, lastTouchTarget);
        lastTouchTarget.classList.remove('drag-over');
    }
    
    draggedItem.classList.remove('dragging');
    document.body.removeChild(ghostItem);
    draggedItem = null;
    ghostItem = null;
    lastTouchTarget = null;
}

export function positionGhost(x, y) {
    if (!ghostItem) return;
    ghostItem.style.left = `${x - ghostItem.offsetWidth / 2}px`;
    ghostItem.style.top = `${y - ghostItem.offsetHeight / 2}px`;
}

export function processDrop(relicId, target) {
    const draggedRelic = state.gameState.relicsOnHand.find(r => r.id === relicId) || state.gameState.equippedRelics.find(r => r && r.id === relicId);
    if (!draggedRelic) return;

    const originalSlotIndex = state.gameState.equippedRelics.findIndex(r => r && r.id === relicId);

    if (target.classList.contains('relic-slot')) {
        const targetSlotIndex = parseInt(target.dataset.slotIndex);
        const relicInTargetSlot = state.gameState.equippedRelics[targetSlotIndex];
        if (originalSlotIndex > -1) {
            state.gameState.equippedRelics[originalSlotIndex] = relicInTargetSlot;
        }
        state.gameState.equippedRelics[targetSlotIndex] = draggedRelic;
    } else if (target.id === 'vorpal-gear-inventory') {
        if (originalSlotIndex > -1) {
            state.gameState.equippedRelics[originalSlotIndex] = null;
        }
    }
    
    calculateVorpalEffects();
    updateVorpalGearModalUI();
    updateUI();
}

export function calculateVorpalEffects() {
    const equipped = state.gameState.equippedRelics.filter(r => r);
    let effect = VORPAL_EFFECTS.None;
    let effectKey = null;

    if (equipped.length > 0) {
        const elements = equipped.map(r => r.element);
        const counts = elements.reduce((acc, el) => {
            acc[el] = (acc[el] || 0) + 1;
            return acc;
        }, {});
        const uniqueElements = Object.keys(counts);

        // Check 3-of-a-kind combos
        if (counts.Fire === 3) effectKey = 'Solar Flare';
        else if (counts.Water === 3) effectKey = 'Tsunami';
        else if (counts.Earth === 3) effectKey = 'Mountain';
        else if (counts.Wind === 3) effectKey = 'Cyclone';
        else if (counts.Ice === 3) effectKey = 'Blizzard';
        else if (counts.Lightning === 3) effectKey = 'Thunderstorm';
        // Check special named combos
        else if (uniqueElements.length === 3) {
            const sortedElements = uniqueElements.sort().join(',');
            if (sortedElements === 'Fire,Lightning,Wind') effectKey = 'Firestorm';
            else if (sortedElements === 'Earth,Ice,Water') effectKey = 'Glacier';
        }
        
        // If no major combo, check for minor effects
        if (!effectKey) {
            if (equipped.length === 1) {
                const el = elements[0];
                if (el === 'Fire') effectKey = 'Burning Greed';
                else if (el === 'Water') effectKey = 'Calm Waters';
                else if (el === 'Earth') effectKey = 'Steady Ground';
                else if (el === 'Wind') effectKey = 'Gentle Breeze';
                else if (el === 'Ice') effectKey = 'Cooling Presence';
                else if (el === 'Lightning') effectKey = 'Static Charge';
            } else if (equipped.length === 2 && uniqueElements.length === 1) {
                    const el = elements[0];
                if (el === 'Fire') effectKey = 'Raging Inferno';
                else if (el === 'Water') effectKey = 'Soothing Tides';
                else if (el === 'Earth') effectKey = 'Sturdy Foundation';
                else if (el === 'Wind') effectKey = 'Favorable Winds';
                else if (el === 'Ice') effectKey = 'Deep Freeze';
                else if (el === 'Lightning') effectKey = 'Magnetic Personality';
            }
        }

        // If still no effect, but multiple relics are equipped, it's Mixed Energies
        if (!effectKey && equipped.length > 1) {
            effectKey = 'Mixed Energies';
        }
    }
    
    if (effectKey) {
        effect = VORPAL_EFFECTS[effectKey];
    }

    // If no effect is calculated from relics but one is sealed, apply the sealed one.
    if (effect.name === "None" && state.gameState.permanentlySealedEffects.length > 0) {
        // For simplicity, we'll just apply the first sealed effect as the default.
        // A more complex UI could let the player choose.
        const firstSealedName = state.gameState.permanentlySealedEffects[0];
        const sealedKey = Object.keys(VORPAL_EFFECTS).find(key => VORPAL_EFFECTS[key].name === firstSealedName);
        if (sealedKey) effect = VORPAL_EFFECTS[sealedKey];
    }

    state.gameState.activeVorpalEffect = effect;

    // Log discovery
    if (effect.type === 'combo' && effectKey && !state.gameState.discoveredVorpalEffects.includes(effectKey)) {
        state.gameState.discoveredVorpalEffects.push(effectKey);
        checkCompendiumCompletion('vorpalEffects');
    }
}

export function checkCompendiumCompletion(category) {
    if (!state.gameState.hasCompendium) return;

    let isComplete = false;
    switch(category) {
        case 'relics':
            if (!state.gameState.compendiumCategoriesCompleted.relics && state.gameState.relicCompendium.length >= OFFLINE_RELICS.length) {
                isComplete = true;
                state.gameState.compendiumCategoriesCompleted.relics = true;
            }
            break;
        case 'monsters':
            const totalMonsters = MONSTERS.length + 1; // +1 for SifeLim
            if (!state.gameState.compendiumCategoriesCompleted.monsters && state.gameState.discoveredMonsters.length >= totalMonsters) {
                isComplete = true;
                state.gameState.compendiumCategoriesCompleted.monsters = true;
            }
            break;
        case 'vorpalEffects':
            const totalVorpal = Object.values(VORPAL_EFFECTS).filter(v => v.type === 'combo').length;
            if (!state.gameState.compendiumCategoriesCompleted.vorpalEffects && state.gameState.discoveredVorpalEffects.length >= totalVorpal) {
                isComplete = true;
                state.gameState.compendiumCategoriesCompleted.vorpalEffects = true;
            }
            break;
    }

    if (isComplete) {
        showCompletionModal(category);
        saveGame();
    }
}

export function showCompletionModal(category) {
    let title = "Category Complete!";
    let message = "";
    let gain = {};
    let rewardText = "";

    switch(category) {
        case 'relics':
            title = "Master Archivist!";
            message = "You've discovered every relic known to exist in the portal! Your vast knowledge has been rewarded.";
            gain = { money: 2000, science: 30 };
            rewardText = "Reward: +2000💰, +30🔬";
            break;
        case 'monsters':
            title = "Master Hunter!";
            message = "You've encountered every monstrous entity in the portal! Your bravery has been rewarded.";
            gain = { lifeCrystals: 1, energyBolts: 8 };
            rewardText = "Reward: +1🔮, +8⚡";
            break;
        case 'vorpalEffects':
            title = "Master Elementalist!";
            message = "You've discovered every possible elemental combination! Your mastery of the elements has been rewarded.";
            gain = { etherBubbles: 4 };
            rewardText = "Reward: +4🫧";
            break;
    }

    completionTitleEl.textContent = title;
    completionMessageEl.textContent = message;
    completionRewardEl.textContent = rewardText;
    updateGameState(gain, {});
    logMessage(`COMPENDIUM COMPLETE: ${title}! You earned a reward.`, 'win');
    showItemToast(rewardText, 'win');
    openModal(completionModal);
    updateUI();
}

export function populateRelicModal() {
    relicMoneyDisplay.textContent = Math.round(state.gameState.money);
    relicScienceDisplay.textContent = state.gameState.science;
    relicListEl.innerHTML = '';
    const elementColors = { Fire: 'text-red-500', Water: 'text-blue-500', Earth: 'text-amber-600', Wind: 'text-green-500', Ice: 'text-cyan-400', Lightning: 'text-yellow-400' };
    if (state.gameState.relicCompendium.length === 0) {
        relicListEl.innerHTML = `<p class="text-slate-500">You haven't found any relics yet.</p>`;
    } else {
        const sortedCompendium = [...state.gameState.relicCompendium].sort((a, b) => RELIC_ELEMENTS.indexOf(a.element) - RELIC_ELEMENTS.indexOf(b.element));

        sortedCompendium.forEach(compendiumRelic => {
            const div = document.createElement('div');
            
            const isPossessed = state.gameState.relicsOnHand.some(r => r.name === compendiumRelic.name) || state.gameState.equippedRelics.some(r => r && r.name === compendiumRelic.name);
            const onHandInstance = state.gameState.relicsOnHand.find(r => r.name === compendiumRelic.name);
            const isEquipped = state.gameState.equippedRelics.some(r => r && r.name === compendiumRelic.name);

            div.className = `p-3 bg-slate-100 rounded-lg ${!isPossessed ? 'opacity-50' : ''}`;
            
            let buttonsHTML = '';
            if (onHandInstance && !isEquipped) { 
                buttonsHTML = `
                    <div class="flex gap-2 mt-2">
                        <button class="relic-sell-btn text-xs bg-amber-500 hover:bg-amber-600 text-white font-semibold py-1 px-2 rounded" 
                            data-relic-id="${onHandInstance.id}">Sell</button>
                        <button class="relic-exp-btn text-xs bg-teal-500 hover:bg-teal-600 text-white font-semibold py-1 px-2 rounded" 
                            data-relic-id="${onHandInstance.id}">Experiment</button>
                    </div>`;
            }

            let statusText = '';
            if (isEquipped) {
                statusText = '<span class="text-purple-500 text-xs">(Equipped)</span>';
            } else if (!isPossessed) {
                statusText = '<span class="text-slate-500 text-xs">(Used)</span>';
            }

            div.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-bold text-cyan-700">${compendiumRelic.name} ${statusText}</h3>
                        <p class="text-slate-600 text-sm">${compendiumRelic.description}</p>
                    </div>
                    <span class="font-bold text-sm ${elementColors[compendiumRelic.element] || 'text-gray-500'}">${compendiumRelic.element}</span>
                </div>
                ${buttonsHTML}`;
            relicListEl.appendChild(div);
        });
    }
}

export function showRelicModal() {
    populateRelicModal();
    openModal(relicModal);
}

export function populateCompendiumModal() {
    const elementColors = { Fire: 'text-red-500 border-red-500', Water: 'text-blue-500 border-blue-500', Earth: 'text-amber-600 border-amber-600', Wind: 'text-green-500 border-green-500', Ice: 'text-cyan-400 border-cyan-400', Lightning: 'text-yellow-400 border-yellow-400' };
    compendiumRelicsEl.innerHTML = '';
    OFFLINE_RELICS.forEach(relic => {
        const isDiscovered = state.gameState.relicCompendium.some(r => r.name === relic.name);
        const div = document.createElement('div');
        div.className = `compendium-item p-2 rounded border ${isDiscovered ? 'discovered' : ''} ${isDiscovered ? elementColors[relic.element] : 'border-slate-200'}`;
        div.textContent = isDiscovered ? relic.name : '???';
        compendiumRelicsEl.appendChild(div);
    });

    compendiumMonstersEl.innerHTML = '';
    const allMonsters = [{name: "SifeLim", element: "None", type: "large"}, ...MONSTERS];
    allMonsters.forEach(monster => {
        const isDiscovered = state.gameState.discoveredMonsters.includes(monster.name);
        const isDefeated = state.gameState.defeatedMonsters.includes(monster.name);
        const div = document.createElement('div');
        div.className = `compendium-item p-2 rounded border ${isDiscovered ? 'discovered' : ''} ${isDiscovered ? elementColors[monster.element] || 'border-rose-500' : 'border-slate-200'}`;
        if (isDiscovered) {
            let typeText = monster.type === 'large' ? '(Greater)' : '(Lesser)';
            if (isDefeated) {
                div.innerHTML = `<span class="text-slate-400 line-through">${monster.name}</span> <span class="text-xs text-slate-400">${typeText}</span> <span class="text-slate-400">(Defeated)</span>`;
            } else {
                div.innerHTML = `${monster.name} <span class="text-xs text-slate-500">${typeText}</span>`;
            }
        } else {
            div.textContent = '???';
        }
        compendiumMonstersEl.appendChild(div);
    });

    compendiumVorpalEffectsEl.innerHTML = '';
    Object.values(VORPAL_EFFECTS).forEach(effect => {
        if (effect.type !== 'combo') return;
        const effectKey = Object.keys(VORPAL_EFFECTS).find(key => VORPAL_EFFECTS[key].name === effect.name);
        const isDiscovered = state.gameState.discoveredVorpalEffects.includes(effectKey);
        const isSealed = state.gameState.permanentlySealedEffects.includes(effect.name);
        const div = document.createElement('div');
        div.className = `compendium-item p-2 rounded border ${isDiscovered ? 'discovered border-purple-500 text-purple-700' : 'border-slate-200'}`;
        div.innerHTML = isDiscovered ? `<p class="font-bold">${effect.name} ${isSealed ? '🫧 <span class="text-slate-500">(Sealed)</span>' : ''}</p><p class="text-xs">${effect.description}</p>` : '???';
        compendiumVorpalEffectsEl.appendChild(div);
    });

    // Show completion indicators
    const relicsCompletedIndicator = document.getElementById('relics-completed-indicator');
    if (state.gameState.compendiumCategoriesCompleted.relics) {
        relicsCompletedIndicator.classList.remove('hidden');
        relicsCompletedIndicator.innerHTML = 'COMPLETED <span class="text-slate-400 font-normal">| Reward: $2000, 30 Science</span>';
    } else {
        relicsCompletedIndicator.classList.add('hidden');
    }

    const monstersCompletedIndicator = document.getElementById('monsters-completed-indicator');
    if (state.gameState.compendiumCategoriesCompleted.monsters) {
        monstersCompletedIndicator.classList.remove('hidden');
        monstersCompletedIndicator.innerHTML = 'COMPLETED <span class="text-slate-400 font-normal">| Reward: 1 Life Crystal, 8 Ammo</span>';
    } else {
        monstersCompletedIndicator.classList.add('hidden');
    }

    const vorpalCompletedIndicator = document.getElementById('vorpal-completed-indicator');
    if (state.gameState.compendiumCategoriesCompleted.vorpalEffects) {
        vorpalCompletedIndicator.classList.remove('hidden');
        vorpalCompletedIndicator.innerHTML = 'COMPLETED <span class="text-slate-400 font-normal">| Reward: 4 Ether Bubbles</span>';
    } else {
        vorpalCompletedIndicator.classList.add('hidden');
    }
}

export function addOfflineRelic(quantity, suppressToast = false) {
        for (let i = 0; i < quantity; i++) {
        const availableRelics = OFFLINE_RELICS.filter(or => !state.gameState.relicCompendium.some(cr => cr.name === or.name));
        if (availableRelics.length === 0) {
            if (!suppressToast) logMessage("You've discovered every known relic!", "system");
            return;
        }
        const relicPool = availableRelics;
        const newRelicData = relicPool[Math.floor(Math.random() * relicPool.length)];
        const newRelic = { ...newRelicData, id: Date.now() + Math.random() + i };
        state.gameState.relicsOnHand.push(newRelic);
        if (!state.gameState.relicCompendium.some(r => r.name === newRelic.name)) {
            state.gameState.relicCompendium.push(newRelic);
        }
        logMessage(`Found: ${newRelic.name} (${newRelic.element}) - ${newRelic.description}`, "relic");
    }
    if (!state.gameState.hasEverFoundRelic && quantity > 0) {
        openModal(firstRelicModal);
        state.gameState.hasEverFoundRelic = true;
    }
    if(quantity > 0 && !suppressToast) {
        showItemToast(`+${quantity} 💎`, 'relic');
    }
    if (quantity > 0) {
        checkCompendiumCompletion('relics');
    }
}

export function getOfflineJournalEntry() {
    if (state.gameState.hunger < 25) return OFFLINE_JOURNAL_ENTRIES.lowHunger;
    if (state.gameState.energy < 25) return OFFLINE_JOURNAL_ENTRIES.lowEnergy;
    if (state.gameState.happiness < 25) return OFFLINE_JOURNAL_ENTRIES.lowHappiness;
    if (state.gameState.family < 25 || state.gameState.friends < 25) return OFFLINE_JOURNAL_ENTRIES.lowSocial;
    if (state.gameState.money < 20) return OFFLINE_JOURNAL_ENTRIES.lowMoney;
    if ((state.gameState.hasZapper || state.gameState.hasElementalDischarger) && state.gameState.energyBolts === 0) return OFFLINE_JOURNAL_ENTRIES.noAmmo;
    if (state.gameState.etherBubbles > 0) return OFFLINE_JOURNAL_ENTRIES.hasEtherBubbles;
    if (state.gameState.hasVorpalGear && state.gameState.relicsOnHand.length > 0) return OFFLINE_JOURNAL_ENTRIES.hasGearToUse;
    if (state.gameState.hasEverFoundRelic) return OFFLINE_JOURNAL_ENTRIES.hasRelicsToExperiment;
    return OFFLINE_JOURNAL_ENTRIES.generic;
}

export function addRelicToState(relicData, quantity, suppressToast = false) {
    for (let i = 0; i < quantity; i++) {
        if (state.gameState.relicCompendium.length >= OFFLINE_RELICS.length) {
            if(!suppressToast) logMessage("You've discovered every known relic!", "system");
            return;
        }
        const newRelic = { ...relicData, id: Date.now() + Math.random() + i };
        state.gameState.relicsOnHand.push(newRelic);
        if (!state.gameState.relicCompendium.some(r => r.name === newRelic.name)) {
            state.gameState.relicCompendium.push(newRelic);
        }
        if(isOnlineMode) {
            state.gameState.generatedRelicElements.push(newRelic.element);
        }
        logMessage(`Found: ${newRelic.name} (${newRelic.element}) - ${newRelic.description}`, "relic");
    }
    if (!state.gameState.hasEverFoundRelic && quantity > 0) {
        openModal(firstRelicModal);
        state.gameState.hasEverFoundRelic = true;
    }
    if (quantity > 0 && !suppressToast) {
        showItemToast(`+${quantity} 💎`, 'relic');
    }
    if (quantity > 0) {
        checkCompendiumCompletion('relics');
    }
}

export function showItemToast(text, type) {
    const toast = document.createElement('div');
    toast.className = 'item-toast bg-black bg-opacity-70 text-white text-2xl font-bold py-4 px-6 rounded-lg';
    toast.textContent = text;
    toastContainer.appendChild(toast);
    
    // Trigger the animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Remove the toast after animation
    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove());
    }, 2000);
}

async function callGemini(prompt) {
    if (!isOnlineMode) {
        console.log("Offline mode: Skipping Gemini call.");
        return null;
    }
    isApiCallInProgress = true;
    const apiKey = ""; // Will be provided by the environment
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);
        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 && result.candidates[0].content.parts.length > 0) {
            return result.candidates[0].content.parts[0].text;
        }
        return null;
    } catch (error) {
        console.error("Gemini API call failed:", error);
        logMessage("The connection to the AI wavered and was lost.", "warning");
        return null;
    } finally {
        // isApiCallInProgress is handled by the calling function's finally block
    }
}


export function addUsedRelicFromTrashcan() {
    const possessedRelicNames = new Set([
        ...state.gameState.relicsOnHand.map(r => r.name),
        ...state.gameState.equippedRelics.filter(r => r).map(r => r.name)
    ]);
    const usedRelics = state.gameState.relicCompendium.filter(r => !possessedRelicNames.has(r.name));

    if (usedRelics.length > 0) {
        const relicToRestore = usedRelics[Math.floor(Math.random() * usedRelics.length)];
        const newRelic = { ...relicToRestore, id: Date.now() + Math.random() };
        state.gameState.relicsOnHand.push(newRelic);
        logMessage(`The Trashcan of Fate recycled a "${newRelic.name}"!`, "system");
        showItemToast('+1 💎', 'relic');
        updateUI();
    }
}

export function triggerWin(reason) {
    isGameOver = true;
    if (!state.gameState.defeatedMonsters.includes('SifeLim')) {
        state.gameState.defeatedMonsters.push('SifeLim');
    }
    clearInterval(gameLoopInterval);
    gameOverTitleEl.textContent = "Congratulations!";
    gameOverTitleEl.classList.remove('text-slate-800');
    gameOverTitleEl.classList.add('text-emerald-500');
    gameOverMessage.textContent = reason;
    continueBtn.classList.remove('hidden');
    openModal(gameOverModal);
    logMessage(reason, "win");
}

export function showGameOverModal(reason) {
    const gameOverModal = document.getElementById('game-over-modal');
    const gameOverMessage = document.getElementById('game-over-message');
    if (!gameOverModal || !gameOverMessage) return;

    gameOverMessage.textContent = reason;
    openModal(gameOverModal); // Use your existing openModal function
    logMessage(`GAME OVER: ${reason}`, "warning");
}

export function togglePause() {
    if (isGameOver) return;
    isPaused = !isPaused;
    if (isPaused) {
        clearInterval(gameLoopInterval);
        logMessage("Game paused.", "system");
        pauseBtn.textContent = "Resume";
        pauseBtn.classList.remove('bg-slate-400', 'hover:bg-slate-500');
        pauseBtn.classList.add('bg-emerald-500', 'hover:bg-emerald-600');
        disableAllActions(true);
    } else {
        if (openModalCount === 0) {
            gameLoopInterval = setInterval(gameLoop, 5000);
            logMessage("Game resumed.", "system");
        }
        pauseBtn.textContent = "Pause";
        pauseBtn.classList.add('bg-slate-400', 'hover:bg-slate-500');
        pauseBtn.classList.remove('bg-emerald-500', 'hover:bg-emerald-600');
        disableAllActions(false);
    }
}

export function disableAllActions(shouldDisable) {
    const buttons = document.querySelectorAll('.action-button');
    buttons.forEach(button => {
        // Keep New Life and Pause buttons always enabled
        if (button.id !== 'pause-btn' && button.id !== 'new-life-btn') {
            button.disabled = shouldDisable;
        }
    });
}

/**
 * Enables or disables the online button based on Firebase availability.
 * @param {boolean} isCapable - True if Firebase was initialized successfully.
 */
export function setOnlineButtonState(isCapable) {
    const startOnlineBtn = document.getElementById('start-online-btn');
    if (!startOnlineBtn) return;

    startOnlineBtn.disabled = !isCapable;

    if (!isCapable) {
        startOnlineBtn.textContent = "Online (Unavailable)";
    } else {
        startOnlineBtn.textContent = "Online Game";
    }
}

export function resetUI() {
    // Clear the message log
    const messageLogEl = document.getElementById('message-log');
    if (messageLogEl) {
        messageLogEl.innerHTML = '';
    }

    // Hide conditional UI elements
    const conditionalElements = [
        'ammo-stat-container', 'relic-stat-container', 'science-stat-container',
        'ether-bubble-stat-container', 'life-crystal-stat-container', 'vorpal-effect-display',
        'endless-mode-indicator', 'trashcan-indicator', 'portal-btn', 'view-relics-btn',
        'contraptions-btn', 'vorpal-gear-btn', 'compendium-btn'
    ];
    conditionalElements.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.add('hidden');
        }
    });

    // Reset pause button text
    const pauseBtn = document.getElementById('pause-btn');
    if (pauseBtn) {
        pauseBtn.textContent = 'Pause';
    }
}

export function showLoading(isLoading) {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.toggle('hidden', !isLoading);
    }
}

export function showGameContainer(isVisible) {
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
        gameContainer.classList.toggle('hidden', !isVisible);
    }
}

export function showShopModal() {
    updateShopModalUI();
    openModal(document.getElementById('shop-modal'));
}

export function showContraptionModal() {
    updateContraptionModalUI(); // This function already exists in your file
    openModal(document.getElementById('contraption-modal'));
}

export function showVorpalGearModal() {
    updateVorpalGearModalUI(); // This function should already exist in your file
    openModal(document.getElementById('vorpal-gear-modal'));
}

export function showCompendiumModal() {
    populateCompendiumModal(); // This function should already exist in your file
    openModal(document.getElementById('compendium-modal'));
}