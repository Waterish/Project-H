// js/actions.js
import * as state from './state.js';
import * as ui from './ui.js';
import { VORPAL_EFFECTS, MONSTERS, OFFLINE_RELICS } from './constants.js';
import { CONTRAPTIONS } from './constants.js';
//import { callGemini, getOfflineJournalEntry } from './api.js'; // Assuming you move API calls to api.js

export function handleWork() {
    const activeEffects = state.getActiveEffects();

    if (state.gameState.energy < 16) {
        ui.logMessage("You're too tired to work.", "warning");
        return; // Return early if the action can't be performed
    }

    let moneyGain = Math.floor(Math.random() * 20) + 10;
    if (activeEffects.some(e => e.name === VORPAL_EFFECTS['Solar Flare'].name)) moneyGain *= 3;
    else if (activeEffects.some(e => e.name === VORPAL_EFFECTS['Raging Inferno'].name)) moneyGain *= 2;
    else if (activeEffects.some(e => e.name === VORPAL_EFFECTS['Burning Greed'].name)) moneyGain *= 1.5;
    const gain = { money: Math.round(moneyGain) };
    const cost = { energy: 15, hunger: 10, happiness: 5, family: 5 };
    
    state.updateGameState(gain, cost);
    ui.logMessage(`You worked hard and earned $${gain.money}. Your family misses you.`, "action");
}

export function handleEat() {
    if (state.gameState.food < 1) {
        ui.logMessage("You have no food to eat.", "warning");
        return;
    }
    const gain = { hunger: 100 - state.gameState.hunger };
    const cost = { food: 1 };

    state.updateGameState(gain, cost);
    ui.logMessage("You ate a meal and feel full.", "action");
}

export function handleBuyFood() {
    const modifiers = state.getPurchaseModifiers();
    const cost = { money: Math.round(10 * modifiers.shop) };

    if (state.gameState.money < cost.money) {
        ui.logMessage("You can't afford to buy food.", "warning");
        return;
    }
    
    const gain = { food: 1 };
    
    state.updateGameState(gain);
    ui.logMessage(`You bought some food for $${cost.money}.`, "action")
    ui.updateShopModalUI(); 
}

export function handleBuySupplies() {
    const modifiers = state.getPurchaseModifiers();
    const cost = { money: Math.round(20 * modifiers.shop) };

    if (state.gameState.money < cost.money) {
        ui.logMessage("You can't afford these supplies.", "warning");
        return;
    }
    
    const gain = { supplies: 1 };
    
    state.updateGameState(gain);
    ui.logMessage(`You bought some supplies for $${cost.money}.`, "action")
    ui.updateShopModalUI(); 
}

export function handleBuyAmmo() {
    const modifiers = state.getPurchaseModifiers();
    const cost = { money: Math.round(80 * modifiers.shop) };

    if (state.gameState.money < cost.money) {
        ui.logMessage("You can't afford an Energy Bolt.", "warning");
        return;
    }
    
    const gain = { ammo: 1 };
    
    state.updateGameState(gain);
    ui.logMessage(`You bought an Energy Bolt for $${cost.money}. Looks like you can use it as ammo.`, "action")
    ui.updateShopModalUI(); 
}

export function handleBuyTrashcan() {
    const modifiers = state.getPurchaseModifiers();
    const cost = { money: Math.round(4000 * modifiers.shop) };

    if (state.gameState.money < cost.money) {
        ui.logMessage("You can't afford this strange trashcan. Time to get the family credit card!", "warning");
        return;
    }
    
    state.gameState.hasGoldenTrashcan = true;
    state.updateGameState(cost);
    ui.logMessage(`You bought the Trashcan of Fate! It seems to hum with recycling energy.`, "action")
    ui.updateShopModalUI(); 
}

export function handlePlay() {
    const activeEffects = state.getActiveEffects();

    if (state.gameState.energy < 11) {
        ui.logMessage("You're too tired to play.", "warning");
        return; // Return early if the action can't be performed
    }
    if (state.gameState.money < 5) {
        ui.logMessage("You can't afford to play. Just how broke are you?", "warning");
        return; // Return early if the action can't be performed
    }

    let happinessGain = 25;
    if (activeEffects.some(e => e.name === VORPAL_EFFECTS.Tsunami.name)) happinessGain *= 3;
    else if (activeEffects.some(e => e.name === VORPAL_EFFECTS['Soothing Tides'].name)) happinessGain *= 2;
    else if (activeEffects.some(e => e.name === VORPAL_EFFECTS['Calm Waters'].name)) happinessGain *= 1.5;
    const gain = { happiness: Math.round(happinessGain) };
    const cost = { money: 5, energy: 10 };
    
    state.updateGameState(gain, cost);
    ui.logMessage("You had some fun!", "action");
}

export function handleSleep() {
    const gain = { energy: 100 - state.gameState.energy, happiness: 5 };
    const cost = { hunger: 5 };
    
    state.updateGameState(gain, cost);
    ui.logMessage("You feel well-rested.", "action");
}

export function handleVisitFamily() {
    const activeEffects = state.getActiveEffects();

    if (state.gameState.energy < 16) {
        ui.logMessage("You're too tired to visit family.", "warning");
        return; // Return early if the action can't be performed
    }

    let familyGain = 25;
    if (activeEffects.some(e => e.name === VORPAL_EFFECTS.Mountain.name)) familyGain *= 3;
    else if (activeEffects.some(e => e.name === VORPAL_EFFECTS['Sturdy Foundation'].name)) familyGain *= 2;
    else if (activeEffects.some(e => e.name === VORPAL_EFFECTS['Steady Ground'].name)) familyGain *= 1.5;
    const gain = { family: Math.round(familyGain), happiness: 10, hunger: 15 };
    const cost = { energy: 15 };
    
    state.updateGameState(gain, cost);
    ui.logMessage("Quality time with family. They fed you well!", "action");
}

export function handleHangWithFriends() {
    const activeEffects = state.getActiveEffects();
    // 1. Check prerequisites
    if (state.gameState.money < 15) {
        ui.logMessage("You need $15 to hang out.", "warning");
        return;
    }
    if (state.gameState.energy < 20) {
        ui.logMessage("You're too tired to see friends.", "warning");
        return;
    }

    // 2. Calculate gains and costs
    let friendsGain = 25;
    if (activeEffects.some(e => e.name === VORPAL_EFFECTS.Thunderstorm.name)) friendsGain *= 2;
    else if (activeEffects.some(e => e.name === VORPAL_EFFECTS['Magnetic Personality'].name)) friendsGain *= 1.5;
    else if (activeEffects.some(e => e.name === VORPAL_EFFECTS['Static Charge'].name)) friendsGain *= 1.2;

    const gain = { friends: Math.round(friendsGain), happiness: 15, hunger: 10 };
    const cost = { money: 15, energy: 20 };

    // 3. Update state and log
    state.updateGameState(gain, cost);
    ui.logMessage("Hanging out with friends was a blast! You grabbed a bite together.", "action");

    // 4. Handle side effects (like discovering the portal)
    if (!state.gameState.portalDiscovered && Math.random() < 0.3) {
        state.setPortalDiscovered(true);
        ui.openModal(document.getElementById('portal-discovery-modal'));
    }
}

export function handleExplorePortal() {
    const activeEffects = state.getActiveEffects();
    // 1. Check prerequisites
    if (state.gameState.energy < 35) {
        ui.logMessage("Too exhausted to enter the portal.", "warning");
        return;
    }
    if (state.gameState.supplies < 1) {
        ui.logMessage("You need supplies to explore the portal.", "warning");
        return;
    }
    
    // 2. Initial update and logging
    let happinessLoss = -5;
    let friendsLoss = -5;
    if (activeEffects.some(e => e.name === VORPAL_EFFECTS.Tsunami.name)) happinessLoss *= 0.2;
    if (activeEffects.some(e => e.name === VORPAL_EFFECTS.Thunderstorm.name)) friendsLoss *= 0.2;

    state.updateGameState({ happiness: happinessLoss, friends: friendsLoss }, { energy: 35, supplies: 1 });
    ui.logMessage("You step through the portal...", "portal");

    // 3. The portal event logic is complex, so it's good to keep it contained here
    _handlePortalEvent(activeEffects);
}

export function handleSellRelic(relicId) {
    const relicIndex = state.gameState.relicsOnHand.findIndex(r => r.id === relicId);

    if (relicIndex === -1) {
        ui.logMessage("Relic not found.", "warning");
        return;
    }

    const soldRelic = state.gameState.relicsOnHand.splice(relicIndex, 1)[0];
    const moneyGain = Math.floor(Math.random() * 50) + 100;
    
    state.updateGameState({ money: moneyGain }, {});
    ui.logMessage(`You sold "${soldRelic.name}" for $${moneyGain}.`, "action");
    ui.populateRelicModal(); // Refresh the modal UI
}

export function handleBuildExperiment(relicId) {
    const relicIndex = state.gameState.relicsOnHand.findIndex(r => r.id === relicId);

    if (relicIndex === -1) {
        ui.logMessage("Relic not found.", "warning");
        return;
    }

    state.gameState.relicsOnHand.splice(relicIndex, 1); // Directly modify state for simplicity here
    const scienceGain = Math.floor(Math.random() * 5) + 1;

    state.updateGameState({ science: scienceGain }, {});
    let logMsg = `You consumed a relic to advance your research by ${scienceGain} points.`;
    
    if (!state.gameState.hasBuiltFirstExperiment) {
        state.setHasBuiltFirstExperiment(true);
        logMsg += " As the relic dust settles, an idea flashes in your mind: schematics for advanced contraptions!";
    }
    
    ui.logMessage(logMsg, "science");
    ui.populateRelicModal(); // Refresh the modal UI
}

export function handleEtherSeal() {
    const currentEffect = state.gameState.activeVorpalEffect;

    if (state.gameState.etherBubbles < 1) return;
    if (currentEffect.type !== 'combo' || state.gameState.permanentlySealedEffects.includes(currentEffect.name)) {
        return;
    }

    state.addSealedEffect(currentEffect.name);
    state.updateGameState({}, { etherBubbles: 1 });
    ui.logMessage(`You used an Ether Bubble to permanently seal the ${currentEffect.name} effect!`, "contraption");
    ui.updateVorpalGearModalUI(); // Refresh the UI
}

export function handleBuild(itemName) {
    const item = CONTRAPTIONS[itemName];
    if (!item) return;

    const modifiers = state.getPurchaseModifiers();
    const finalCost = { ...item.cost };
    finalCost.money = Math.round(finalCost.money * modifiers.contraption);

    // Check if player can afford it
    for (const [resource, amount] of Object.entries(finalCost)) {
        if (state.gameState[resource] < amount) {
            ui.logMessage(`Cannot build: not enough ${resource}.`, "warning");
            return;
        }
    }

    state.updateGameState({}, finalCost);
    state.setBuildFlag(item.flag, true); // A new function in state.js to set boolean flags
    ui.logMessage(item.log, "contraption");

    if (itemName === 'neutralizer') {
        ui.openModal(document.getElementById('neutralizer-built-modal'));
    }

    // Refresh the contraption modal to show the item as "Owned"
    ui.updateContraptionModalUI();
}

export async function handleReflect() {
    if (state.gameState.energy < 10) {
        ui.logMessage("You're too tired to reflect.", "warning");
        return;
    }

    state.updateGameState({}, { energy: 10 });
    ui.logMessage(`Writing in journal... <span class="jiggle">✍️</span>`, "reflection");

    // The API call logic itself could be moved to a separate api.js module
    const prompt = `You are a character...`; // Your full prompt generation
    
    try {
        const text = await callGemini(prompt); // Assumes callGemini is in api.js
        ui.logMessage(text, "reflection");
    } catch (error) {
        console.error("API call failed, using fallback.", error);
        const entry = getOfflineJournalEntry(); // Also in api.js
        ui.logMessage(entry, "reflection");
    } finally {
        // You might need to manage an isApiCallInProgress flag in the state module
    }
}

export function handleTimePassing() {
    const activeEffects = state.getActiveEffects();

    // Base decay rates
    let energyDecay = 3;
    let hungerDecay = 4;
    let happinessDecay = 2;
    // ... add family/friends decay if you want

    // Apply Vorpal effect modifiers to decay rates
    activeEffects.forEach(effect => {
        if (effect.name === VORPAL_EFFECTS.Cyclone.name) energyDecay *= 0.2;
        else if (effect.name === VORPAL_EFFECTS['Favorable Winds'].name) energyDecay *= 0.5;
        // ... add all other decay-modifying effects from your original gameLoop ...
    });

    // CRITICAL: Apply the decay safely, ensuring stats don't drop below 1
    state.gameState.energy = Math.max(1, state.gameState.energy - energyDecay);
    state.gameState.happiness = Math.max(1, state.gameState.happiness - happinessDecay);
    state.gameState.hunger = Math.max(1, state.gameState.hunger - hungerDecay);

    ui.logMessage("Time passes...", "system");
}