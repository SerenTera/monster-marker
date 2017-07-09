# WarnMe v3
Update v3: Changed to Id-based markers, Simplified code, Item markers cannot be picked up now. Now correctly despawns markers on despawning target even if the mob target moves around. 

Requires Commands module by Pinkie-Pie: https://github.com/pinkipi/command

A Tera Proxy module that warns you when specific objects(mobs like mongos/blue boxes) are in your VISIBLE vicinity (ie: IN YOUR SIGHT) and puts a marker on them. WILL NOT TELL U ANYTHING IF U CANT SEE IT DON'T ASK HOW TO DO THAT TY. Use common sense and do not use this module/ disable mobmarkers for mob targets with very common spawn rate, instead of complaining of lags >.> This is made for rare spawn events in mind.

This only warns you when the object is loaded onto your visible vicinity (ie. you can see it around you). A mob marker (vergos head) is spawned on mob(bluebox) and despawned when mob is dead/out of range. 

Warning is done via client sided system notices (displays a message in the middle of your screen) as default, but system messages (chat messages) can be turned on. To turn on chat message notification, set 'messager=true' under defaults in index.js or false to disable chat message notifications.

Module, system notices,System messages and Mobmarkers are enabled by default. Defaults can be changed on index.js.

## Commands:
Use the commands in /proxy chat. If you want to use it outside of /proxy chat, make sure you prefix the commands with '!'.

warntoggle - Toggles the module. Disabling the module will clear all markers as well.

warnalert - Toggles system notices

warnmarker - Toggles display of mobmarkers (switch on or off mob markers via toggle)-

warnclear - Attempts to clear all markers and reset the module. Use if vergos head failed to despawn for some weird reason

Currently only supports Big Blue Boxes. Can be modified for other objects.
Many thanks to teralove for the work on party death markers for codes on markers (https://github.com/teralove/party-death-markers)

## todo
Fix any bugs
