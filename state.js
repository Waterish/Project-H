// js/state.js
import { defaultState } from './constants.js';
import { VORPAL_EFFECTS } from './constants.js'; // Make sure to import this

export let gameState = {};
export let isOnline = false;
export let isGameOver = false;
let isPaused = false; // Add this variable

export function initializeState(isOnlineMode) {
    // Reset all state variables to their default values
    gameState = JSON.parse(JSON.stringify(defaultState)); 
    isOnline = isOnlineMode;
    isGameOver = false;
    isPaused = false;
}

export function setGameOver(status) {
    isGameOver = status;
}

export function updateGameState(gain, cost) {
    gameState.money += (gain.money || 0) - (cost.money || 0);
    gameState.energy = Math.max(1, gameState.energy + (gain.energy || 0) - (cost.energy || 0));
    gameState.happiness = Math.max(1, gameState.happiness + (gain.happiness || 0));
    gameState.family += (gain.family || 0);
    gameState.friends += (gain.friends || 0);
    gameState.science += (gain.science || 0) - (cost.science || 0);
    gameState.hunger = Math.max(1, gameState.hunger + (gain.hunger || 0) - (cost.hunger || 0));
    gameState.supplies += (gain.supplies || 0) - (cost.supplies || 0);
    gameState.energyBolts += (gain.energyBolts || 0) - (cost.energyBolts || 0);
    gameState.lifeCrystals += (gain.lifeCrystals || 0) - (cost.lifeCrystals || 0);
    gameState.etherBubbles += (gain.etherBubbles || 0) - (cost.etherBubbles || 0);
    gameState.food += (gain.food || 0);

    if (gain.energyBolts > 0) gameState.hasEverFoundAmmo = true;
    if (gain.etherBubbles > 0) gameState.hasEverFoundEtherBubble = true;
    if (gain.lifeCrystals > 0) gameState.hasEverFoundLifeCrystal = true;
}

export function getPurchaseModifiers() {
    // Determine Vorpal Effect Discount
    const activeEffects = getActiveEffects(); // You'd also move getActiveEffects to state.js
    const isSolarFlare = activeEffects.some(e => e.name === VORPAL_EFFECTS['Solar Flare'].name);
    const isRagingInferno = activeEffects.some(e => e.name === VORPAL_EFFECTS['Raging Inferno'].name);

    const contraptionDiscount = isSolarFlare ? 0.7 : 1.0;
    const shopDiscount = isSolarFlare ? 0.7 : (isRagingInferno ? 0.9 : 1.0);

    // Determine Family Status Modifier for the shop
    const familyBonus = gameState.family >= 85 ? 0.5 : 1.0;
    const familyPenalty = gameState.family < 15 ? 10.0 : 1.0;
    
    // Combine modifiers
    const finalShopModifier = familyPenalty * familyBonus * shopDiscount;

    return {
        shop: finalShopModifier,
        contraption: contraptionDiscount
    };
}

export function getActiveEffects() {
    const effects = [];
    
    // Add relic-based effect
    if (gameState.activeVorpalEffect) {
        effects.push(gameState.activeVorpalEffect);
    }

    // Add all sealed effects, avoiding duplicates
    gameState.permanentlySealedEffects.forEach(sealedName => {
        if (!effects.some(e => e.name === sealedName)) {
            const sealedEffect = Object.values(VORPAL_EFFECTS).find(e => e.name === sealedName);
            if (sealedEffect) {
                effects.push(sealedEffect);
            }
        }
    });

    if (effects.length === 0) {
        return [VORPAL_EFFECTS.None];
    }
    return effects;
}

export function getIsPaused() {
    return isPaused;
}

export function togglePaused() {
    isPaused = !isPaused;
    return isPaused;
}

export function checkGameOverConditions() {
    console.log('Checking game over. Stats:', { 
        hunger: gameState.hunger, 
        energy: gameState.energy, 
        happiness: gameState.happiness 
    });

    if (isGameOver) return null; // Don't re-trigger

    let reason = "";
    if (gameState.hunger <= 0) reason = "You starved!";
    else if (gameState.energy <= 0) reason = "You collapsed from exhaustion!";
    else if (gameState.happiness <= 0) reason = "You became overwhelmed by sadness.";

    if (reason) {
        isGameOver = true;
        return reason;
    }

    return null;
}

export function isGameActive() {
    // A simple way to check if a game has started is to see if the gameState has been initialized.
    // The money property is a good indicator.
    return gameState.money !== undefined;
}

export function getIsGameOver() {
    return isGameOver;
}