import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Module-level variables to hold the firebase instances
let app, auth, db, userId;

/**
 * Initializes the Firebase app and services.
 * @returns {Promise<boolean>} A promise that resolves to true if initialization is successful.
 */
export function initializeFirebase() {
    // Your Firebase config object
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
    
    if (!firebaseConfig) {
        console.warn("Firebase config not found. Online mode will be disabled.");
        return Promise.resolve(false);
    }
    
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);

    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                userId = user.uid;
                console.log("Firebase user authenticated:", userId);
            }
            resolve(true); // Indicate that initialization and auth state check is complete
        });
    });
}

/**
 * Signs the user in anonymously.
 * @returns {Promise<string|null>} A promise that resolves with the user ID or null on failure.
 */
export async function authenticateUser() {
    if (!auth) return null;
    try {
        if (!auth.currentUser) {
            const userCredential = await signInAnonymously(auth);
            userId = userCredential.user.uid;
        }
        return userId;
    } catch (error) {
        console.error("Anonymous sign-in failed:", error);
        return null;
    }
}

/**
 * Saves the entire game state to Firestore.
 * @param {object} gameState The current game state object.
 */
export async function saveGameState(gameState) {
    if (!db || !userId) {
        // console.log("Offline mode or user not authenticated. Skipping save.");
        return;
    }

    const gameDocRef = doc(db, `artifacts/${app.options.appId}/users/${userId}/gameState/main`);
    const stateToSave = { ...gameState, lastUpdate: serverTimestamp() };
    
    try {
        // Use updateDoc for existing games, but setDoc can work as an upsert
        await setDoc(gameDocRef, stateToSave, { merge: true });
    } catch (error) {
        console.error("Error saving game state:", error);
    }
}

/**
 * Creates a new game document in Firestore.
 * @param {object} defaultGameState The default state for a new game.
 */
export async function createNewGameInDb(defaultGameState) {
    if (!db || !userId) {
        console.error("Cannot create new game, user not authenticated.");
        return;
    }

    const gameDocRef = doc(db, `artifacts/${app.options.appId}/users/${userId}/gameState/main`);
    const stateToSave = { ...defaultGameState, lastUpdate: serverTimestamp() };

    try {
        await setDoc(gameDocRef, stateToSave);
        console.log("New game created in Firestore.");
    } catch (error) {
        console.error("Error creating new game in Firestore:", error);
    }
}