import assets_list from "./assets_list.json" assert { type: "json" };
//import {preRenderList} from "./preRenderer.js";

async function moduleLoader(levelFilePath, globalModifires){
	var levelPack = await import(levelFilePath);

	const LEVEL_SETTINGS = new levelPack.LevelSettings(globalModifires);
	const LEVEL = new levelPack.Level;

	return [LEVEL_SETTINGS, LEVEL];
}

async function levelLoader(core){
	var tile = Math.round(core.GAME_WIDTH / 21);
	var levelFilePath = './levels/' + core.level + '.js';
	var globalModifires = core.globalModifires;

	const [LEVEL_SETTINGS, LEVEL] = await moduleLoader(levelFilePath, globalModifires);
	const LOADED_WAVES = [];

	const PRELOADED_OBJECTS = {
		objectGroup: [],
		friendly: [],
		hostile: [],
		neutral: [],
		background: []
	}


	LEVEL.levelObjects.forEach(element => {
		let objectElement = assets_list.gameObjects.find(({name}) => name === element.name);

		PRELOADED_OBJECTS.objectGroup.push(objectElement);
	});
	

	for (const object of PRELOADED_OBJECTS.objectGroup) {
		let object_src = './' + object.file_name;
		let objectName = object.name;
		
		let objectClass = await import(object_src);

			switch (object.type){
				case "friendly":
					PRELOADED_OBJECTS.friendly.push(objectClass[objectName]);
					break;
	
				case "hostile":
					PRELOADED_OBJECTS.hostile.push(objectClass[objectName]);
					break;
	
				case "neutral":
					PRELOADED_OBJECTS.neutral.push(objectClass[objectName]);
					break;
	
				case "background":
					PRELOADED_OBJECTS.background.push(objectClass[objectName]);
					break;
			}
	}


	LEVEL.levelWaves.forEach(wave => {
		var newWave = {
			timing: wave.timing,
			hostileGroup: [],
			neutralGroup: [],
		} 

		//hostile objects
		for(let i = 0; i < wave.hostileGroup.set.length; i++){
			let row = wave.hostileGroup.set[i];

			for (let j = 0; j < row.length; j++) {
				let position = {
					x: tile * j,
					y: -tile * i,
				};

				LEVEL.levelObjects.forEach(object => {
					if(object.setID == row[j]){
						PRELOADED_OBJECTS.hostile.forEach(element => {
							if(element.name == object.name){		
								newWave.hostileGroup.push(new element(core, position))	
							}
						});
					}
				});
			}
		}

		//neutral objects
		for (let i = 0; i < wave.neutralGroup.set.length; i++) {
			let row = wave.neutralGroup.set[i];

			for (let j = 0; j < row.length; j++) {

				let position = {
					x: tile * j,
					y: -tile * i,
				};

				LEVEL.levelObjects.forEach(object => {
					if(object.setID == row[j]) {
						PRELOADED_OBJECTS.neutral.forEach(element => {
							if(element.name == object.name){
								newWave.neutralGroup.push(new element(core, position))	
							}
						});
					}
				});
			}
		}

			LOADED_WAVES.push(newWave);
		});

		core.inactiveObjects1 = LOADED_WAVES;
	}

function levelEventHandler(core){
	if(core.gameClockRaw == core.inactiveObjects1[0].timing){
		core.hostileObjects.push(...core.inactiveObjects1[0].hostileGroup);
		core.backgroundObjects.push(...core.inactiveObjects1[0].neutralGroup);

		let loadedElement = core.inactiveObjects1.shift();
		core.inactiveObjects1.push(loadedElement);
	}
	


/*
	switch (core.gameClockRaw) {
		case 120:
			//core.hostileObjects.push(...core.inactiveObjects);
			//core.backgroundObjects.push(...core.inactiveBackgroundObjects);
			core.hostileObjects.push(...core.inactiveObjects1[0].hostileStage);
			core.backgroundObjects.push(...core.inactiveObjects1[0].neutralStage);

			console.log(core.inactiveObjects1[0].hostileStage);
			console.log(core.inactiveObjects1[0].neutralStage);
			//console.log(core.inactiveBackgroundObjects);
		break;
	}*/
}
	
export {levelLoader, levelEventHandler};
/*
	4 object types:
		friendly
		hostile
		neutral
		background

	level folder: 
			level settings - js or json file
				speed of background objects
				music and sounds to be loaded
				sprites to be loaded
				objects types to be loaded
				timings of events and stages or waves
				fail conditions (e.g. for escort missions)
				win conditions (e.g. after reaching certain point or killing boss)

				
				campaign modifires
			level stages/events - js file
				arrays for stages [0,1,0,0,0,1,0]
				events



//for other file/s
master settings for player
master modifires of player's starship

json save file hyhy


/////////////////////////////////////////////////////////////////////////////////
level folder 					levelbuilder						assets_list
(instructions)    ====>>>>		(processing)		<<<<======= 	(database)

									||
									||
									||
									\/
									\/
									\/
							level ready to play
							(core/renderer)
/////////////////////////////////////////////////////////////////////////////////

get settings

get object classes
prerender sprites for each obtained object class

create new objects and push them into inactive arrays
let event handler take care of timing


[cutscene]

[wave]
[wave]
[wave]
[inner peace]
[wave]
[inner peace]
[cutscene]
[boss]
*/

/*
		const wave4 = [
			[],
			[0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
			[0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0],
			[0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		]

				for (let i = 1; i < wave4.length; i++) {
					let row = wave4[i];
				
					for (let j = 0; j < row.length; j++) {
						if(row[j] === 1){
							let position = {
								x: tile * j,
								y: -tile * i,
							};
				
							core.inactiveObjects.push(new Enemy1(core, position));
							//core.inactiveNeutralObjects
							//core.inactiveBackgroundObjects
							//core.inactiveHostileObjects
							//core.inactiveFriendlyObjects
							//separate background, neutral and hostile objects' for loops from eachother
						}	
					}
				}




	const bckObj = [
		[],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0]
	]

			for (let i = 1; i < bckObj.length; i++) {
				let row = bckObj[i];
			
				for (let j = 0; j < row.length; j++) {
					if(row[j] === 1){
						let position = {
							x: tile * j,
							y: -tile * i,
						};
			
						core.inactiveBackgroundObjects.push(new Neutral_Object_1(core, position));

						//separate background, neutral and hostile objects' for loops from eachother
					}	
				}
			}
			
*/