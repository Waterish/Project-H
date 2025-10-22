# This file stores the initial state and all static data for the game.
# It's translated directly from the JavaScript `initialGameState` object.

INITIAL_GAME_STATE = {
    "day": 1,
    "timeOfDay": 'Day',
    "nightActionTaken": False,
    "fuel": 100,
    "hull": 100,
    "aethelCredits": 0,
    "player": {
        "health": 100,
        "maxHealth": 100,
        "sustenance": 100,
        "maxSustenance": 100,
        "weapon": None
    },
    "inventory": {
        "materials": {},
        "tools": {},
        "keyItems": {},
        "consumables": {}
    },
    "recipes": {
        'Geo-Scanner': { 'desc': "Allows safe navigation of energized flora.", 'materials': { 'Scrap Metal': 10, 'Circuit Board': 2, 'Crystal Shard': 5 }, 'makes': { 'type': 'tools', 'name': 'Geo-Scanner' } },
        'Laser Cutter': { 'desc': "A tool modified for defense. Better than nothing.", 'materials': { 'Scrap Metal': 10, 'Crystal Shard': 5, 'Energy Geode': 1 }, 'makes': { 'type': 'tools', 'name': 'Laser Cutter' } },
        # ... All other recipes would be translated here ...
    },
    "upgrades": {
        "range": 0,
        "scanner": 0,
        "coolant": 0
    },
    "currentPlanet": 'Xylos',
    "specialCondition": { "name": 'None', "effect": None },
    "inspiration": None,
    "pinnedItem": None,
    "flags": {
        "guaranteedAnomaly": False,
        "aethelMarketUnlocked": False,
        "strangerJoined": False,
        "resourceBonus": None,
        "echoDriveAttemptedToday": False,
        "cookedToday": False,
        "guaranteedFlee": False
    },
    "knownTraders": {
        'Xylos': False,
        'Krylar': False,
        'Aethel': False,
        'Ouroboros': False
    },
    "dailyReportEvents": [],
    "travelCosts": {
        'Xylos-Krylar': 20, 'Xylos-Aethel': 40, 'Xylos-Ouroboros': 60,
        'Krylar-Aethel': 30, 'Krylar-Ouroboros': 50, 'Aethel-Ouroboros': 30,
    },
    "planets": {
        'Xylos': {
            'name': 'Xylos',
            'desc': 'A verdant world with shimmering crystal formations and vast, quiet salt flats...',
            # ... All planet data, creatures, regions, etc., would be translated here ...
        },
        # ... Other planets ...
    },
    "creatures": {
        # ... All creature data ...
    },
    "goal": {
        "partsFound": 0,
        "parts": ['Echo Drive Casing', 'Echo Drive Core', 'Echo Drive Modulator'],
        "totalParts": 3
    }
}
