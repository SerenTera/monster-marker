# warnme v2- Integrated mob-marker
A Tera Proxy module that warns you when specific objects(mobs like mongos/blue boxes) are in your VISIBLE vicinity (ie: IN YOUR SIGHT) and puts a marker on them. WILL NOT TELL U ANYTHING IF U CANT SEE IT DON'T ASK HOW TO DO THAT TY. See mob-marker module for more info on the marker. 

Now with mobmarker integration so you can just use one module instead of two. mob-marker will still be kept for those who wants a standalone mobmarker without warnme functions.

This does not warn you about objects that are outside your range of sight. This only warns you when the object is loaded onto your visible vicinity (ie. you can see it around you). A mob marker (vergos head) is spawned on mob(bluebox) and despawned when mob is dead.

Warning is done via client sided system messages as default, but system notices (displays a message in the middle of your screen) can be turned on. Module and Mobmarkers are enabled by default. System notices is disabled by default. Defaults can be changed on index.js.

Commands:

!warn on - switches on module

!warn off -switches off module

!warn alert - Toggles system notices

!warn marker- Toggles display of mobmarkers (switch on or off mob markers via toggle)

!warn clear- Attempts to clear all markers and reset the module. Use if vergos head failed to despawn

Currently only supports Big Blue Boxes. Can be modified for other objects.
Many thanks to teralove for the work on party death markers for codes on markers (https://github.com/teralove/party-death-markers)
