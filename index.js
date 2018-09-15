/*
Reference List
HuntingZoneIDs: Bluebox-1023 | Caiman-1023 | crabs-6553782 | mongos seems to be dependent on location, are the zone ids the same as orignal location?
Template IDs: Bluebox-88888888 | Caiman-99999999,99999991,99999992 | crabs-1021 | unknown for mongos | Test-mob - 181_2023

To discover more ids, hook S_SPAWN_NPC and check huntingzoneid and templateId. Or use 'mob-id-finder' module on my Github (SerenTera)

Configs are in config.json. If you do not have it, it will be auto generated on your first login
*/
	
const path = require('path'),
	  fs = require('fs')	 

module.exports = function markmob(mod) {
	
	let	mobid=[],
		config,
		fileopen = true,
		stopwrite,
		enabled,
		active = false,
		markenabled,
		messager,
		alerts,
		Item_ID,
		Monster_ID,
		specialMobSearch
	
	try{
		config = JSON.parse(fs.readFileSync(path.join(__dirname,'config.json'), 'utf8'))
		let defaultConfig = JSON.parse(fs.readFileSync(path.join(__dirname,'lib','configDefault.json'), 'utf8'))
		if(config.gameVersion !== defaultConfig.gameVersion || config.entriesVersion != defaultConfig.gameVersion && config.allowAutoEntryRemoval) {
			let oldMonsterList = JSON.parse(JSON.stringify(config.Monster_ID)), //Deep Clone to replace new list with old config using shallow merge
				newMonsterEntry = JSON.parse(JSON.stringify(defaultConfig.newEntries))

			if(config.allowAutoEntryRemoval === undefined) {
				console.log('[Monster Marker] A new config option (allowAutoEntryRemoval) is added to allow this module to automatically clear old event monster entries. It is by default enabled, and you have to disable it in config.json before next login if you do not want this.');
			}
			else if(config.allowAutoEntryRemoval) {
				for(let key of defaultConfig.deleteEntries) {	//Delete old unused entries for events that are over using deleteEntries
					if(oldMonsterList[key]) {
						console.log(`[Monster Marker] Removed old event entry: ${oldMonsterList[key]}`)  
						delete oldMonsterList[key]
					}
				}
				config.entriesVersion = defaultConfig.gameVersion
			}

			Object.assign(oldMonsterList,newMonsterEntry) //Remember to remove the newentries for every update as well as remove old entries from past event
			
			config = Object.assign({},defaultConfig,config,{gameVersion:defaultConfig.gameVersion,Monster_ID:oldMonsterList}) //shallow merge
			delete config.newEntries
			delete config.deleteEntries
			save(config,'config.json')
			console.log('[Monster Marker] Updated new config file. Current settings transferred over.')
		}
		configInit()
	}
	catch(e){
		let defaultConfig = JSON.parse(fs.readFileSync(path.join(__dirname,'lib','configDefault.json'), 'utf8'))
		config = defaultConfig
		delete config.newEntries
		delete config.deleteEntries
		config.entriesVersion = defaultConfig.gameVersion
		save(config,'config.json')
		configInit()
		console.log('[Monster Marker] New config file generated. Settings in config.json.')
	}		

	
///////Commands
	mod.command.add('warn', {
		$default() {
			mod.command.message('Invalid Command. Type "warn info" for help')
		},
		
		info() {
			mod.command.message(`Version: ${config.gameVersion}`)
			mod.command.message('Commands: warn [arguments]\nArguments are as follows:\ntoggle: Enable/Disable Module\nalert: Toggle popup alerts\nmarker: Toggles markers spawn\nclear: Clears marker\nactive: Checks if module is active zone\nadd huntingZone templateId name: Adds the entry to the config')
		},
		
		toggle() {
			enabled=!enabled
			mod.command.message( enabled ? ' Module Enabled' : ' Module Disabled')
		
			if(!enabled)
				for(let itemid of mobid) despawnthis(itemid)
		},
	
		alert() {
			alerts = !alerts
			mod.command.message(alerts ? 'System popup notice enabled' : 'System popup notice disabled')
		},
	
		marker() {
			markenabled = !markenabled
			mod.command.message(markenabled ? 'Item Markers enabled' : 'Item Markers disabled')
		},
	
		clear() {
			mod.command.message('Item Markers Clear Attempted')
			for(let itemid of mobid) despawnthis(itemid)
		},

		active() {
			mod.command.message(`Active status: ${active}`)
		},
	
		add(huntingZone,templateId,name) {
			config.Monster_ID[`${huntingZone}_${templateId}`] = name
			Monster_ID[`${huntingZone}_${templateId}`] = name
			save(config,'config.json')
			mod.command.message(` Added Config Entry: ${huntingZone}_${templateId}= ${name}`)
		}
		
	})
	
////////Dispatches
	mod.hook('S_SPAWN_NPC', 9, event => {	//Use version >5. Hunting zone ids are indeed only int16 types.
		if(!active || !enabled) return 
		
	
		if(Monster_ID[`${event.huntingZoneId}_${event.templateId}`]) {
			if(markenabled) {
				markthis(event.loc,event.gameId.low), // low is enough, seems like high are all the same values anyway (change this for impending bigint)
				mobid.push(event.gameId.low)
			}
			
			if(alerts) notice('Found '+ Monster_ID[`${event.huntingZoneId}_${event.templateId}`])
			 
			if(messager) mod.command.message(' Found '+ Monster_ID[`${event.huntingZoneId}_${event.templateId}`])
		}
	
		else if(specialMobSearch && event.bySpawnEvent) { //New def
			if(markenabled) {
				markthis(event.loc,event.gameId.low), 
				mobid.push(event.gameId.low)
			}
			
			if(alerts) notice('Found Special Monster')
			
			if(messager) mod.command.message(' Found Special Monster')
		}
			
	}) 

	mod.hook('S_DESPAWN_NPC', 3, event => {
		if(mobid.includes(event.gameId.low)) {
			despawnthis(event.gameId.low),
			mobid.splice(mobid.indexOf(event.gameId.low), 1)
		}
	})
	
	mod.hook('S_LOAD_TOPO', 3, event => { //reset mobid list on location change
		mobid=[]
		active = event.zone < 9000  //Check if it is a dungeon instance, since event mobs can come from dungeon
	})
	
	
////////Functions
	function markthis(locs,idRef) {
		mod.send('S_SPAWN_DROPITEM', 6, {
			gameId: {low:idRef,high:0,unsigned:true},
			loc:locs,
			item: Item_ID, 
			amount: 1,
			expiry: 300000, //expiry time,milseconds (300000=5 mins?)
			explode:false,
			masterwork:false,
			enchant:0,
			source:0,
			debug:false,
			owners: [{id: 0}]
		})
	}
	
	function despawnthis(despawnid) {
		mod.send('S_DESPAWN_DROPITEM', 4, {
			gameId: {low:despawnid,high:0,unsigned:true}
		})
	}
	
	function notice(msg) {
		mod.send('S_DUNGEON_EVENT_MESSAGE', 2, {
            type: 2,
            chat: false,
            channel: 0,
            message: msg
        })
    }
	
	function save(data,args) {
		if(!Array.isArray(args)) args = [args] //Find a way around this later -.-
		
		if(fileopen) {
			fileopen=false
			fs.writeFile(path.join(__dirname, ...args), JSON.stringify(data,null,"\t"), err => {
				if(err) mod.command.message('Error Writing File, attempting to rewrite')
				fileopen = true
			})
		}
		else {
			clearTimeout(stopwrite)			 //if file still being written
			stopwrite=setTimeout(save(__dirname,...args),2000)
			return
		}
	}
	
	function configInit() {
		({enabled,markenabled,messager,alerts,Item_ID,Monster_ID,specialMobSearch} = config)
	}
}

