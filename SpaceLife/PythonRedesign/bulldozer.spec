[app]

# (str) Title of your application
title = Space Life

# (str) Package name
package.name = spacelife

# (str) Package domain (needed for android/ios packaging)
package.domain = org.example

# (str) Source code where the main.py file is located
source.dir = .

# (list) Source files to include (let buildozer find them)
source.include_exts = py,png,jpg,kv,atlas

# (list) List of modules toComma-separated list of modules to exclude
# source.exclude_exts = spec

# (str) Application versioning (e.g. 1.0.0)
version = 1.0

# (list) Kivy requirements
# comma separated e.g. requirements = python3,kivy
requirements = python3,kivy

# (str) Presplash background color (for new android builds)
# p4a.presplash_color = #000000

# (str) The Android arch to build for, choices: armeabi-v7a, arm64-v8a, x86, x86_64
android.arch = arm64-v8a

# (list) Permissions
android.permissions =

# (str) Supported screen orientation. The default is 'portrait'
#orientation = landscape

# (bool) Indicate if the application should be fullscreen or not
fullscreen = 0

[buildozer]

# (int) Log level (0 = error, 1 = info, 2 = debug (with command output))
log_level = 2

# (int) Display warning if buildozer is run as root (0 = False, 1 = True)
warn_on_root = 1
