// js/constants.js

export const RELIC_ELEMENTS = ['Fire', 'Water', 'Earth', 'Wind', 'Ice', 'Lightning'];

export const OFFLINE_RELICS = [
    // Fire
    { name: "Emberheart Shard", description: "A fragment that pulses with a faint, warm light, as if a tiny heart beats within.", element: "Fire" },
    { name: "Ashen Phoenix Feather", description: "Said to be plucked from a bird reborn in flame, it never fully burns.", element: "Fire" },
    { name: "Magma-forged Ring", description: "A simple band of obsidian that is always warm to the touch.", element: "Fire" },
    { name: "Sun-Kissed Cinder", description: "A piece of charcoal that glitters with captured sunlight.", element: "Fire" },
    { name: "Pyre Locket", description: "A small locket that, when opened, reveals a tiny, harmless, and eternal flame.", element: "Fire" },
    // Water
    { name: "Geyser Pearl", description: "A perfectly smooth pearl that seems to contain a swirling storm.", element: "Water" },
    { name: "Tears of the Sea", description: "A vial of water that never evaporates and hums with a sad melody.", element: "Water" },
    { name: "Riverstone of Memory", description: "Holding it brings fleeting images of places you've never been.", element: "Water" },
    { name: "Tide-Caller's Conch", description: "They say if you listen closely, you can hear the whispers of the next high tide.", element: "Water" },
    { name: "Abyssal Droplet", description: "A single drop of water so pure it seems to bend light around it.", element: "Water" },
    // Earth
    { name: "Heart of the Mountain", description: "A dense, perfectly cubical stone that feels heavier than it should.", element: "Earth" },
    { name: "Root-carved Totem", description: "A small wooden figure that seems to subtly change its expression when you're not looking.", element: "Earth" },
    { name: "Unbroken Geode", description: "A rough, unassuming rock that rattles, hinting at the beauty locked inside.", element: "Earth" },
    { name: "Petal-Fossil", description: "The impression of a flower that never existed in this world, pressed into ancient stone.", element: "Earth" },
    { name: "Living Loam", description: "A handful of soil that slowly replenishes itself if spilled.", element: "Earth" },
    // Wind
    { name: "Zephyr in a Bottle", description: "A sealed bottle that, when shaken, echoes with the sound of a gentle breeze.", element: "Wind" },
    { name: "Storm-Torn Pennant", description: "A scrap of fabric that always flutters, even in a sealed room.", element: "Wind" },
    { name: "Whispering Reed", description: "A hollow reed that produces a soft, musical note when you breathe near it.", element: "Wind" },
    { name: "Sky-Sailor's Charm", description: "A small, light stone carved into the shape of a cloud.", element: "Wind" },
    { name: "Echoing Chime", description: "A tiny chime that rings with a sound only you can hear.", element: "Wind" },
    // Ice
    { name: "Unmelting Snowflake", description: "A delicate, intricate snowflake preserved in a crystal that never warms up.", element: "Ice" },
    { name: "Glacial Core Shard", description: "A piece of ancient ice that reveals rings of time, like a tree.", element: "Ice" },
    { name: "Hoarfrost Crystal", description: "A crystal that slowly gathers a layer of frost, even in a warm room.", element: "Ice" },
    { name: "Winter's Bite Amulet", description: "An amulet that makes the air around it feel a few degrees colder.", element: "Ice" },
    { name: "Rime-Etched Lens", description: "Looking through this lens makes the world appear as if it's covered in a thin layer of frost.", element: "Ice" },
    // Lightning
    { name: "Bottled Ball Lightning", description: "A sphere of crackling energy, safely contained within a glass orb.", element: "Lightning" },
    { name: "Fulgurite Spike", description: "Glassy sand fused into a sharp spike by a powerful lightning strike.", element: "Lightning" },
    { name: "Static-Charged Lodestone", description: "A magnetic rock that makes the hairs on your arm stand on end.", element: "Lightning" },
    { name: "Thunderclap Stone", description: "When two of these are struck together, they produce a startlingly loud clap.", element: "Lightning" },
    { name: "Sparking Synapse", description: "A strange, organic-looking node that occasionally flashes with a tiny blue spark.", element: "Lightning" }
];

export const OFFLINE_JOURNAL_ENTRIES = {
    lowHunger: "My stomach is rumbling. I need to find something to eat soon.",
    lowEnergy: "Feeling drained. I should probably sleep or get something to eat soon.",
    lowHappiness: "All work and no play... I feel so bored. I need to do something fun.",
    lowSocial: "It's been a while since I've seen my friends or family. Maybe I should reach out.",
    lowMoney: "My wallet feels light. A little work would probably solve that.",
    hasRelicsToExperiment: "These strange relics are piling up. I wonder what would happen if I experimented with one?",
    hasGearToUse: "This Vorpal Gear is fascinating. I should try equipping some relics to see what happens.",
    hasEtherBubbles: "These Ether Bubbles seem special. I should try using one to seal a powerful Vorpal Combo.",
    noAmmo: "My weapon is useless without ammo. I should visit the shop.",
    generic: "Just another day. I feel like I should be doing something more... adventurous."
};

export const MONSTERS = [
    // Regular Monsters
    { name: "Abyssal Creeper", element: "Water", type: "regular", damage: { energy: -10, happiness: -15 }, reward: { money: 20, science: 3, food: 1, supplies: 1, relics: 1 } },
    { name: "Crystalline Golem", element: "Earth", type: "regular", damage: { energy: -15, happiness: -10 }, reward: { money: 25, science: 3, food: 1, supplies: 1, relics: 1, etherBubbles: 1 } },
    { name: "Shrieking Gale-Sprite", element: "Wind", type: "regular", damage: { energy: -5, happiness: -20 }, reward: { money: 15, science: 3, food: 1, supplies: 1, relics: 1 } },
    // Large Monsters
    { name: "Molten Behemoth", element: "Fire", type: "large", damage: { energy: -25, happiness: -15 }, reward: { money: 500, science: 6, food: 2, supplies: 2, relics: 3, lifeCrystals: 1, etherBubbles: 1 } },
    { name: "Glacial Colossus", element: "Ice", type: "large", damage: { energy: -20, happiness: -20 }, reward: { money: 50, science: 6, food: 2, supplies: 2, relics: 3, lifeCrystals: 1, etherBubbles: 1 } },
    { name: "Voltaic Wyrm", element: "Lightning", type: "large", damage: { energy: -15, happiness: -25 }, reward: { money: 50, science: 6, food: 2, supplies: 2, relics: 3, lifeCrystals: 1, etherBubbles: 2 } }
];

export const VORPAL_EFFECTS = {
    None: { name: "None", description: "" },
    // Single Element Effects
    "Burning Greed": { name: "Burning Greed 🔥", description: "Money gains from Work are slightly increased.", type: "single" },
    "Raging Inferno": { name: "Raging Inferno 🔥🔥", description: "Money gains from Work are moderately increased and shop prices are slightly reduced.", type: "single" },
    "Solar Flare": { name: "Solar Flare ☀️", description: "Money gains are significantly increased and all shop/contraption costs are reduced by 30%.", type: "combo" },
    "Calm Waters": { name: "Calm Waters 💧", description: "Happiness gains are slightly increased.", type: "single" },
    "Soothing Tides": { name: "Soothing Tides 💧💧", description: "Happiness gains are moderately increased and happiness decay is slightly reduced.", type: "single" },
    Tsunami: { name: "Tsunami 🌊", description: "Happiness gains are significantly increased and happiness decay is greatly reduced.", type: "combo" },
    "Steady Ground": { name: "Steady Ground 🪨", description: "Family relationship gains are slightly increased.", type: "single" },
    "Sturdy Foundation": { name: "Sturdy Foundation 🪨🪨", description: "Family relationship gains are moderately increased and family decay is slightly reduced.", type: "single" },
    Mountain: { name: "Mountain ⛰️", description: "Family relationship gains are significantly increased and family decay is greatly reduced.", type: "combo" },
    "Gentle Breeze": { name: "Gentle Breeze 💨", description: "Energy decays slightly slower.", type: "single" },
    "Favorable Winds": { name: "Favorable Winds 💨💨", description: "Energy decays moderately slower.", type: "single" },
    Cyclone: { name: "Cyclone 🌪️", description: "Energy decays significantly slower.", type: "combo" },
    "Cooling Presence": { name: "Cooling Presence ❄️", description: "Hunger decays slightly slower.", type: "single" },
    "Deep Freeze": { name: "Deep Freeze ❄️❄️", description: "Hunger decays moderately slower.", type: "single" },
    Blizzard: { name: "Blizzard 🌨️", description: "Hunger decays significantly slower.", type: "combo" },
    "Static Charge": { name: "Static Charge ⚡", description: "Friend relationship gains are slightly increased.", type: "single" },
    "Magnetic Personality": { name: "Magnetic Personality ⚡⚡", description: "Friend relationship gains are moderately increased and friend decay is slightly reduced.", type: "single" },
    Thunderstorm: { name: "Thunderstorm ⛈️", description: "Friend relationship gains are significantly increased and friend decay is greatly reduced.", type: "combo" },
    // Combo Effects
    Firestorm: { name: "Firestorm ☄️", description: "Reduces ammo costs. Zapper: 0, Discharger: 2.", type: "combo" },
    Glacier: { name: "Glacier 🏔️", description: "Greatly increases your luck when exploring the portal.", type: "combo" },
    "Mixed Energies": { name: "Mixed Energies 🌟", description: "A chaotic mix of powers grants a small, random bonus each day.", type: "combo" }
};

export const VORPAL_COMBO_ORDER = ["Solar Flare", "Tsunami", "Mountain", "Cyclone", "Blizzard", "Thunderstorm", "Firestorm", "Glacier", "Mixed Energies"];

export const defaultState = {
    money: 50, energy: 100, happiness: 80, family: 70, friends: 60, hunger: 100, food: 2, supplies: 1, lifeCrystals: 0, energyBolts: 0, etherBubbles: 0,
    relicsOnHand: [], relicCompendium: [], science: 0, 
    hasZapper: false, hasVorpalGear: false, hasElementalDischarger: false, hasCompendium: false, hasNeutralizer: false, hasGoldenTrashcan: false,
    equippedRelics: [null, null, null],
    activeVorpalEffect: { name: "None", description: "" },
    permanentlySealedEffects: [],
    discoveredVorpalEffects: [],
    hasBuiltFirstExperiment: false, portalDiscovered: false, hasEverFoundRelic: false, hasEverFoundAmmo: false, hasEverFoundEtherBubble: false,
    hasEncounteredSifeLim: false, hasEverFoundLifeCrystal: false,
    discoveredMonsters: [], defeatedMonsters: [],
    compendiumCategoriesCompleted: { relics: false, monsters: false, vorpalEffects: false },
    rarePortalEventsTriggered: { ammo: false, ether: false, crystal: false },
    goldenTrashcanTick: 0,
    endlessMode: false,
    generatedRelicElements: [], // For online mode tracking
    lastUpdate: null
};

export const CONTRAPTIONS = {
    zapper: { cost: { science: 10, money: 200 }, flag: 'hasZapper', log: "Zapper built! You can now fight lesser portal creatures." },
    vorpalGear: { cost: { science: 5, money: 100 }, flag: 'hasVorpalGear', log: "Vorpal Gear constructed! Now you can equip relics." },
    // ... add all other contraptions here
    neutralizer: { cost: { science: 20, money: 400, lifeCrystals: 3 }, flag: 'hasNeutralizer', log: "The Neutralizer is complete!" }
};