# monster-marker
A Tera Proxy module that warns you when specific objects(mobs like mongos/blue boxes) are in your VISIBLE vicinity (ie: IN YOUR SIGHT) and puts a marker on them.
## Updates
Latest Version: v4.2.8 Added sSpawnNpc v9, various module.json stuff and special mob searching

Note: Special mob searching is enabled by default and can be disabled in config.json, under `specialMobSearch`. This is not tested since there is no event running atm. 

## Requirements and Infomation
Requires: 
- Commands module by Pinkie-Pie: https://github.com/pinkipi/command

Supports:
- Auto Update using Caali's Proxy

To find more mob ids, you can use mob-id-finder: https://github.com/SerenTera/Mob-id-finder

A Tera Proxy module that warns you when specific objects(mobs like mongos/blue boxes) are in your VISIBLE vicinity (ie: IN YOUR SIGHT) and puts a marker on them. WILL NOT TELL U ANYTHING IF U CANT SEE IT DON'T ASK HOW TO DO THAT TY. Use common sense and do not use this module/ disable mobmarkers for mob targets with very common spawn rate, instead of complaining of lags >.> This is made for rare spawn events in mind.

This only warns you when the object is loaded onto your visible vicinity (ie. you can see it around you). A mob marker (vergos head) is spawned on mob(bluebox) and despawned when mob is dead/out of range. 

Warning is done via client sided system notices (displays a message in the middle of your screen) as default, but system messages (chat messages) can be turned on. To turn on chat message notification, set 'messager=true' under defaults in index.js or false to disable chat message notifications.

## Config
Configuration can be done via config.json. If not present, it will be generated on first startup.

- `enabled`:Default enabling of the module. True to always enable on startup
- `markenabled`: Enables item markers on monsters. True to spawn item markers.
- `messager`: Enables Messaging via chats. True to enable
- `alerts`: Enable flashing messages for alert. True to enable.
- `Item_ID`: Item ID of item marker
- `Monster_ID`: List of Mobs to look out for. Format: `"<huntingZoneId>_<templateId>" : "<Name of mob>"`
- `specialMobSearch`: Searches for specialMobs based on bySpawnEvent field

## Commands:
Use the commands in /proxy chat. If you want to use it outside of /proxy chat, make sure you prefix the commands with '!'.

- `warntoggle` - Toggles the module. Disabling the module will clear all markers as well.

- `warnalert` - Toggles system notices

- `warnmarker` - Toggles display of mobmarkers (switch on or off mob markers via toggle)-

- `warnclear` - Attempts to clear all markers and reset the module. Use if vergos head failed to despawn for some weird reason

- `warnadd <huntingZoneId> <templateId> <name of entry>` - Adds and save a custom entry to the config.

Currently supports World Bams and Big Blue Boxes. Can be modified for other objects.
Many thanks to teralove for the work on party death markers for codes on markers (https://github.com/teralove/party-death-markers)

## ID List - NA Tera specific
- Hunting zone ids:
Bluebox-1023 | Caiman-1023 | 'summer event crabs'-6553782

- Template ids:
Bluebox-88888888 | Caiman-99999999,99999991,99999992 | 'summer event crabs'-1021

## todo
- Fix any bugs
- Maybe incoporate mob id finder. maybee

## Version History:

v3.0.0: Changed to Id-based markers, Simplified code, Item markers cannot be picked up now. Now correctly despawns markers on despawning target even if the mob target moves around. 

v4.0.0: Added World bams since a couple authors released similar modules already. Updated to use latest def to fix various mob identification issues. Added a different monster id system that is more intuitive and allows better customization than the old one.

v4.1.0: Updated packet definition for Male Brawler Patch

v4.2.0: Added Auto update. Configs are in config.json, if missing, it will be automatically generated on first login.

v4.2.1: Added NA easter event mobs (Caiman and Eggs). Added checks to disable if in dungeon. Choc Egg Caiman not included

v4.2.2: Added NA anniversary terron mobs. Deleted old event mob entries (NOT World Bam). Added new config option to automatically delete old event mobs entry, config name is `allowAutoEntryRemoval` and is Enabled by default. If you do not wish to have this, then set it to false in config.json, else the old event entries will be deleted on next login after updating.

v4.2.3 Add Khemadia for letters farming, add command for adding entries in game.

v4.2.4: Update sSpawnNpc to v8, Removed Khemedia, Added NA Giant Bam spawn event

v4.2.5: Added more NA Giant Bam spawn event

v4.2.6: Removed NA event bams

v4.2.8 Added sSpawnNpc v9, various module.jsons stuff and special mob searching

## Pictures
Spawns at box (Head cannot be picked up)
![screenshot](http://i.imgur.com/pRj1rY6.jpg "Spawn at Bluebox")

Despawns when box dies
![screenshot](http://i.imgur.com/IJuFvLk.jpg "Despawns after box dies")


