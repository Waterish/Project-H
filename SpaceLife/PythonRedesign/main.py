import json
import os
import copy
from kivy.app import App
from kivy.uix.gridlayout import GridLayout
from kivy.properties import StringProperty, NumericProperty, ObjectProperty, ListProperty
from kivy.clock import Clock
from kivy.utils import get_color_from_hex
from kivy.core.window import Window

from game_logic import GameLogic
from game_data import INITIAL_GAME_STATE

# Set a background color similar to the original game
Window.clearcolor = get_color_from_hex('#0c0a1a')

class GameWidget(GridLayout):
    """
    The root widget for the game, connecting the UI (from .kv file)
    with the game logic.
    """
    # --- Properties for UI Binding ---
    # These properties are automatically watched by Kivy. When they change,
    # the UI elements bound to them in the .kv file will update.

    # Header
    day_string = StringProperty('Day: 1')
    time_of_day_string = StringProperty('Daytime')
    special_condition_string = StringProperty('Clear Skies')
    inspiration_string = StringProperty('')
    inspiration_visible = NumericProperty(0) # Use 0 for hidden, 1 for visible

    # Planet Info
    planet_name_string = StringProperty('')
    planet_desc_string = StringProperty('')
    base_status_string = StringProperty('')
    base_button_visible = NumericProperty(0)

    # Player & Ship Stats
    health_value = NumericProperty(100)
    health_max = NumericProperty(100)
    health_string = StringProperty('100 / 100')
    sustenance_value = NumericProperty(100)
    sustenance_max = NumericProperty(100)
    sustenance_string = StringProperty('100 / 100')
    fuel_value = NumericProperty(100)
    fuel_string = StringProperty('100 / 100')
    hull_value = NumericProperty(100)
    hull_string = StringProperty('100 / 100')
    equipment_string = StringProperty('None')
    upgrades_string = StringProperty('None')
    aethel_credits_string = StringProperty('0')
    aethel_credits_visible = NumericProperty(0)

    # Log
    log_entries = ListProperty([])

    # Modal and Actions
    action_buttons_widget = ObjectProperty(None)
    modal_widget = ObjectProperty(None)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Initialize the game logic
        self.game = GameLogic(self.update_ui, self.log_message)
        # Start the game
        self.game.start_game()

    def update_ui(self, game_state):
        """
        Called by the game logic to update all UI properties.
        """
        self.day_string = f"Day: {game_state['day']}"
        self.time_of_day_string = game_state['timeOfDay']
        self.special_condition_string = game_state['specialCondition']['name']

        # Inspiration
        inspiration = game_state.get('inspiration')
        if inspiration and inspiration.get('planet') == game_state['currentPlanet']:
            self.inspiration_string = f"Inspired: Find {inspiration.get('item')}"
            self.inspiration_visible = 1
        else:
            self.inspiration_visible = 0
            self.inspiration_string = ''

        # Planet Info
        planet_data = game_state['planets'][game_state['currentPlanet']]
        self.planet_name_string = planet_data['name']
        self.planet_desc_string = planet_data['desc']
        
        # Base Status & Button
        base = planet_data['base']
        if base['progress'] > 0:
            base_progress_names = ["No site selected", "Campsite Scouted", "Basic Camp", "Established Base"]
            status_text = f"Base Status: {base_progress_names[base['progress']]}"
            self.base_status_string = status_text
            self.base_button_visible = 1 if base['progress'] >= 2 else 0
        else:
            self.base_status_string = ''
            self.base_button_visible = 0

        # Player & Ship Stats
        player = game_state['player']
        self.health_value = player['health']
        self.health_max = player['maxHealth']
        self.health_string = f"{player['health']} / {player['maxHealth']}"
        self.sustenance_value = player['sustenance']
        self.sustenance_max = player['maxSustenance']
        self.sustenance_string = f"{player['sustenance']} / {player['maxSustenance']}"
        self.fuel_value = game_state['fuel']
        self.fuel_string = f"{game_state['fuel']} / 100"
        self.hull_value = game_state['hull']
        self.hull_string = f"{game_state['hull']} / 100"
        
        # Equipment & Upgrades
        self.equipment_string = game_state['player'].get('weapon') or 'None'
        installed_upgrades = [name.replace('_', ' ').title() for name, val in game_state['upgrades'].items() if val > 0]
        self.upgrades_string = ', '.join(installed_upgrades) if installed_upgrades else 'None'

        # Credits
        if game_state['aethelCredits'] > 0 or game_state['flags']['aethelMarketUnlocked']:
            self.aethel_credits_visible = 1
            self.aethel_credits_string = str(game_state['aethelCredits'])
        else:
            self.aethel_credits_visible = 0
            
        # Update Action Buttons
        self.populate_actions()
        
        # Update inventory widgets
        self.ids.inventory_widget.update_inventory(game_state['inventory'])
        
        # Update pinned item
        self.ids.datapad_widget.update_datapad(game_state)


    def log_message(self, message, msg_type='info'):
        """Adds a message to the log display."""
        colors = {
            'info': 'a0a0ff', 'success': '50ff50', 'warning': 'ffff50',
            'danger': 'ff5050', 'system': '50ffff'
        }
        # Kivy markup for coloring text
        formatted_message = f"[color={colors.get(msg_type, 'ffffff')}]{message}[/color]"
        self.log_entries.insert(0, {'text': formatted_message})
        # Cap the log at 50 entries for performance
        if len(self.log_entries) > 50:
            self.log_entries.pop()
            
    def populate_actions(self):
        """Create and add action buttons to the UI."""
        self.action_buttons_widget.clear_widgets()
        actions = self.game.get_available_actions()
        
        for action in actions:
            btn = self.ids.action_buttons_widget.create_button(
                text=action['name'],
                on_press=action['handler'],
                style=action.get('class', 'btn-explore')
            )
            self.action_buttons_widget.add_widget(btn)

    def save_game(self):
        self.game.save_game()

    def load_game(self):
        self.game.load_game()

class SpaceLifeApp(App):
    def build(self):
        return GameWidget()

if __name__ == '__main__':
    SpaceLifeApp().run()
