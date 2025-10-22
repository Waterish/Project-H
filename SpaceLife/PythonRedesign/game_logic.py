import json
import os
import copy
import random
import math

from game_data import INITIAL_GAME_STATE

class GameLogic:
    """
    Handles all the state management and core mechanics of the game.
    It is completely separated from the UI.
    """
    def __init__(self, ui_update_callback, log_callback):
        self.ui_update_callback = ui_update_callback
        self.log_callback = log_callback
        self.game_state = None
        self.save_file_path = os.path.join(
            os.path.dirname(__file__), 'savegame.json'
        )

    def start_game(self):
        """Initializes a new game."""
        self.game_state = copy.deepcopy(INITIAL_GAME_STATE)
        self.log_callback("Your starship is stranded...", "system")
        self.ui_update_callback(self.game_state)

    def _update_and_log(self, message, msg_type='info'):
        """Helper to log a message and then update the UI."""
        self.log_callback(message, msg_type)
        self.ui_update_callback(self.game_state)

    def get_available_actions(self):
        # ... (This will contain the logic from your renderActions JS function)
        # Simplified for brevity. This logic would be translated from JS to Python.
        actions = []
        if self.game_state['timeOfDay'] == 'Day':
            actions = [
                {'name': f"Explore {self.game_state['planets'][self.game_state['currentPlanet']]['name']}", 'class': 'btn-explore', 'handler': self.explore_region},
                {'name': 'Check for Anomalies', 'class': 'btn-anomaly', 'handler': self.check_anomalies},
                {'name': 'Visit Local Lifeforms', 'class': 'btn-visit', 'handler': self.visit_locals},
                {'name': 'Travel', 'class': 'btn-travel', 'handler': self.travel},
            ]
        else: # Night
            if self.game_state['nightActionTaken']:
                 actions = [{'name': 'Get Some Sleep', 'class': 'btn-sleep', 'handler': self.get_some_sleep}]
            else:
                actions = [
                    {'name': f"Explore {self.game_state['planets'][self.game_state['currentPlanet']]['name']}", 'class': 'btn-explore', 'handler': self.explore_region},
                    {'name': 'Work on Starship', 'class': 'btn-work', 'handler': self.work_on_starship},
                    {'name': 'Check Communicator', 'class': 'btn-comms', 'handler': self.check_communicator},
                    {'name': 'Manage Base', 'class': 'btn-base', 'handler': self.manage_base},
                ]
        return actions

    # --- Action Handlers (Translated from JavaScript) ---
    def explore_region(self, *args):
        self._update_and_log("Exploring...", "info")
        # In a real Kivy app, this would open a modal to select a region.
        # For this example, let's assume exploring the first available region.
        # ... Full exploration logic would be translated here ...
        self.advance_time()

    def check_anomalies(self, *args):
        self._update_and_log("Scanning for anomalies...", "info")
        # ... Anomaly logic translated here ...
        self.advance_time()

    def visit_locals(self, *args):
        self._update_and_log("Hailing local lifeforms...", "info")
        # ... Visit locals logic translated here ...
        self.advance_time()
        
    def travel(self, *args):
        self._update_and_log("Travel modal would open.", "info")
        # Logic for traveling would be here
        
    def work_on_starship(self, *args):
        self._update_and_log("Starship maintenance modal would open.", "info")

    def check_communicator(self, *args):
        self._update_and_log("Communicator modal would open.", "info")

    def manage_base(self, *args):
        self._update_and_log("Base management modal would open.", "info")
        
    def get_some_sleep(self, *args):
        self.log_callback("You settle in for the night...", "info")
        self.advance_time()

    def advance_time(self):
        """Handles the progression of time, days, and resource consumption."""
        is_night_action = self.game_state['timeOfDay'] == 'Night'

        if is_night_action and not self.game_state['nightActionTaken']:
            self.game_state['nightActionTaken'] = True
        elif not is_night_action:
            self.game_state['timeOfDay'] = 'Night'
        else: # Sleeping
            self.game_state['day'] += 1
            self.game_state['timeOfDay'] = 'Day'
            self.game_state['nightActionTaken'] = False
            self.game_state['flags']['cookedToday'] = False
        
        # ... Add sustenance logic and other end-of-turn effects here ...
        self.ui_update_callback(self.game_state)
    
    # --- Persistence ---
    def save_game(self):
        try:
            with open(self.save_file_path, 'w') as f:
                json.dump(self.game_state, f, indent=4)
            self.log_callback("Game Saved.", "system")
        except Exception as e:
            self.log_callback(f"Error saving game: {e}", "danger")

    def load_game(self):
        if not os.path.exists(self.save_file_path):
            self.log_callback("No save file found.", "warning")
            return
        try:
            with open(self.save_file_path, 'r') as f:
                self.game_state = json.load(f)
            self.log_callback("Game Loaded.", "system")
            self.ui_update_callback(self.game_state)
        except Exception as e:
            self.log_callback(f"Error loading game: {e}", "danger")
