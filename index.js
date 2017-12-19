/*
Reference List
HuntingZoneIDs: Bluebox-1023 | Caiman-1023 | crabs-182 | mongos seems to be dependent on location, are the zone ids the same as orignal location?
Template IDs: Bluebox-88888888 | Caiman-99999999,99999991,99999992 | crabs-1021 | unknown for mongos

To discover more ids, hook S_SPAWN_NPC and check huntingzoneid and templateId. Or use 'mob-id-finder' module on my Github (SerenTera)
*/
	
//Defaults:
let	enabled=true, 		//True: Enables the module (default true)
	markenabled=true,   //True: Enables the item markers (default true)
	messager=false, 	//True: Enables the system chat message (default false)
	alerts=true			//True: Enables the system notice (default true)
	
//Monster ids and other values:
const Item_ID = 98260,			//ItemId for the marker, Use different itemids if you feel like it.
	  
	  Monster_ID = { // Monster id values, in the form HuntingZoneId_TemplateId : 'Name of Monster'
		'4_5011'		: 'Tempest Kanash',
		'38_35'			: 'Nyxarras',
		'57_33'			: 'Betsael',
		'51_7011'		: 'Linyphi',
		'53_1000'		: 'Divine Reaver',
		'52_9050'		: 'Yunaras Snaggletooth',
		//'1023_8888888'	: 'Blue Box',
		//'181_2023'		: 'Test mob',
		
	  
	  
	  
	  
	  }
//------------------------------------All defaults and changeable values are above this line------------------------------------------------------------------//

const Command = require('command')

module.exports = function markmob(dispatch) {
	const command = Command(dispatch)

	let	mobid=[]
	
///////Commands
	command.add('warntoggle',() => {
		enabled=!enabled
		command.message( enabled ? '(Warnme) Module Enabled' : '(Warnme) Module Disabled')
		
		if(!enabled)
			for(let itemid of mobid) despawnthis(itemid)
	})
	
	command.add('warnalert',() => {
		alerts = !alerts
		command.message(alerts ? '(Warnme)System popup notice enabled' : '(Warnme)System popup notice disabled')
	})
	
	command.add('warnmarker',() => {
		markenabled = !markenabled
		command.message(markenabled ? '(Warnme)Item Markers enabled' : '(Warnme)Item Markers disabled')
	})
	
	command.add('warnclear',() => {
		command.message('(Warnme)Item Markers Clear Attempted')
		for(let itemid of mobid) despawnthis(itemid)
	})
	
	
////////Dispatches
	dispatch.hook('S_SPAWN_NPC', 5, event => {	//Use version 5. Hunting zone ids are indeed only int16 types.
		if(enabled && Monster_ID[`${event.huntingZoneId}_${event.templateId}`]) { 
			if(markenabled) {
				markthis(event.x,event.y,event.z,event.gameId.low), 			// low is enough, seems like high are all the same values anyway
				mobid.push(event.gameId.low)
			}
			
			if(alerts) notice('Found '+ Monster_ID[`${event.huntingZoneId}_${event.templateId}`])
			
			if(messager) command.message('(Warnme)Found '+ Monster_ID[`${event.huntingZoneId}_${event.templateId}`])
		}
	}) 

	dispatch.hook('S_DESPAWN_NPC', 2, event => {
		if(mobid.includes(event.gameId.low)) {
			despawnthis(event.gameId.low),
			mobid.splice(mobid.indexOf(event.gameId.low), 1)
		}
	})
	
	dispatch.hook('S_LOAD_TOPO',1, event => { //reset mobid list on location change
		mobid=[]
	})
	
	
////////Functions
	function markthis(locationx,locationy,locationz,idRef) {
		dispatch.toClient('S_SPAWN_DROPITEM', 1, {
			id: {low:idRef,high:0,unsigned:true},
			x: locationx,
			y: locationy,
			z: locationz,
			item: Item_ID, 
			amount: 1,
			expiry: 300000, //expiry time,milseconds (300000=5 mins?)
			owners: [{id: 0}]
		})
	}
	
	function despawnthis(despawnid) {
		dispatch.toClient('S_DESPAWN_DROPITEM', 1, {
			id: {low:despawnid,high:0,unsigned:true}
		})
	}
	
	function notice(msg) {
		dispatch.toClient('S_DUNGEON_EVENT_MESSAGE', 1, {
            unk1: 2,
            unk2: 0,
            unk3: 0,
            message: '(WarnMe) ' + msg
        })
    }
}
