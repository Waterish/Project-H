extends Node2D


# Called when the node enters the scene tree for the first time.
func _ready():
	# The '$' sign is a shortcut for "get node"
	# We are getting the "Label" node and changing its "text" property.
	$"Label".text = "Hello, World! From GDScript!"


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass
