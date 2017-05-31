/*
ZonesID: Bluebox-1023 | Caiman-1023 | mongos seems to be dependent on location, are the zone ids the same as orignal location?

Template IDs: Bluebox-88888888 | Caiman-99999999,99999991,99999992 | unknown for mongos
*/

const mobzone = [1023], //zone id of mob
	mobtemplate = [88888888] //template ids of mobs, this is only for blue boxes, more ids can be added (eg:mongos)
	custommsg= 'Bluebox' //change custom message here
	
module.exports = function warnme(dispatch) {
	
	let enabled=false,
		alerted=false;
	
	dispatch.hook('C_CHAT', 1, event => {
		if(/^<FONT>!warn on<\/FONT>$/i.test(event.message)) {
			enabled=true,
			message('Warnme enabled');
		};
		
		if(/^<FONT>!warn off<\/FONT>$/i.test(event.message)) {
			enabled=false,
			message('Warnme disabled');
		};
		
		if(/^<FONT>!warn alert<\/FONT>$/i.test(event.message)) {
			if(!alerted) {
				alerted=true,
				message('Warnme alerts enabled');
			}
			else
				alerted=false,
				message('Warnme alerts disabled');
		};
		
		if(event.message.includes('!warn'))
			return false;
	});
		
	dispatch.hook('S_SPAWN_NPC', 3, (event) => {
		if(enabled && (mobzone.includes(event.huntingZoneId) && mobtemplate.includes(event.templateId))) { 
			if(alerted) {
				notice('Found'+' '+custommsg),
				message('Found'+' '+custommsg);
			}
			else
				message('Found'+' '+custommsg);
		}
	}); 
		
	function message(msg) {
		dispatch.toClient('S_CHAT', 1, {
			channel: 24,
			authorID: 0,
			unk1: 0,
			gm: 0,
			unk2: 0,
			authorName: '',
			message: '(Proxy)' + msg
		})
	};
	
	function notice(msg) {
		dispatch.toClient('S_DUNGEON_EVENT_MESSAGE', 1, {
            unk1: 2,
            unk2: 0,
            unk3: 0,
            message: '(Proxy)' + msg
        });
    };
};
