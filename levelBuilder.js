import assets_list from "./assets_list.json" assert { type: "json" };
import {preRenderList} from "./preRenderer.js";

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
		gameObjects: [],
		objectSprites: [],
		friendly: [],
		hostile: [],
		neutral: [],
		background: []
	};

	const PRELOADED_THEMES = {
		themeGroup: [],
		backgroundThemes: [],
		backgroundImages: [],
	}


	//////////////////////////
	//for objects
	LEVEL.levelObjects.forEach(element => {
		let objectElement = assets_list.gameObjects.find(({name}) => name === element.name);

		PRELOADED_OBJECTS.gameObjects.push(objectElement);
	});

	//for background themes
	LEVEL.levelBackgrouds.forEach(element => {
		let backgroundElement = assets_list.gameBackgrounds.find(({name}) => name === element.name);

		//if statement prevents from pushing undefined variables into an array which would then produce errors
		if(backgroundElement){
			PRELOADED_THEMES.themeGroup.push(backgroundElement);
		}
	});
	///////////////////////////////

	//////////////////////////////
	/////////////////////////////
	for(const object of PRELOADED_OBJECTS.gameObjects){
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

	PRELOADED_OBJECTS.objectSprites = preRenderList(PRELOADED_OBJECTS.gameObjects);



	for(const theme of PRELOADED_THEMES.themeGroup){
		let theme_src = './' + theme.file_name;
		let themeName = theme.name;
		
		let themeClass = await import(theme_src);
		
			switch (theme.type){
				case "background_theme":
					PRELOADED_THEMES.backgroundThemes.push(themeClass[themeName]);
					break;
			}
	}

	PRELOADED_THEMES.backgroundImages = preRenderList(PRELOADED_THEMES.themeGroup);
	//////////////////////////////
	/////////////////////////////
	

	LEVEL.levelWaves.forEach(wave => {
		var newWave = {
			timing: wave.timing,
			//friendlyObjects: [],
			hostileObjects: [],
			neutralObjects: [],
			backgroundObjects: [],
		} 

		//hostile objects
		for(let i = 0; i < wave.hostileGroup.set.length; i++){
			let row = wave.hostileGroup.set[i];

			for (let j = 0; j < row.length; j++) {
				let position = {
					x: tile * j,
					y: -tile - tile * i,
				};

				LEVEL.levelObjects.forEach(object => {
					if(object.setID == row[j]){
						PRELOADED_OBJECTS.hostile.forEach(element => {
							if(element.name == object.name){		
								let sprite = PRELOADED_OBJECTS.objectSprites.find(({name}) => name === element.name);

								newWave.hostileObjects.push(new element(core, position, sprite.img))	
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
					y: -tile - tile * i,
				};

				LEVEL.levelObjects.forEach(object => {
					if(object.setID == row[j]) {
						PRELOADED_OBJECTS.neutral.forEach(element => {
							if(element.name == object.name){
								let sprite = PRELOADED_OBJECTS.objectSprites.find(({name}) => name === element.name);

								newWave.neutralObjects.push(new element(core, position, sprite.img))	
							}
						});
					}
				});
			}
		}

		
		//background objects
		for(let i = 0; i < wave.backgroundGroup.set.length; i++){
			let row = wave.backgroundGroup.set[i];

			for (let j = 0; j < row.length; j++) {
				let position = {
					x: tile * j,
					y: -tile - tile * i,
				};

				LEVEL.levelObjects.forEach(object => {
					if(object.setID == row[j]){
						PRELOADED_OBJECTS.background.forEach(element => {
							if(element.name == object.name){		
								let sprite = PRELOADED_OBJECTS.objectSprites.find(({name}) => name === element.name);
								
								newWave.backgroundObjects.push(new element(core, position, sprite.img))	
							}
						});
					}
				});
			}
		}
			
			LOADED_WAVES.push(newWave);
	});

		core.inactiveObjects = LOADED_WAVES;


		LEVEL.levelBackgrouds.forEach(background => {
			PRELOADED_THEMES.backgroundThemes.forEach(element => {
				if(element.name == background.name){		
					let bckImg = PRELOADED_THEMES.backgroundImages.find(({name}) => name === element.name);

					var newBackground = {
						timing: background.timing,
						backgroundThemes: [],
					}

					newBackground.backgroundThemes.push(new element(core, bckImg.img));
					core.inactiveThemes.push(newBackground);

				}
			});
		});
	}

function levelEventHandler(core){

	if(core.gameClockRaw == core.inactiveObjects[0].timing){
		core.activeObjects.hostileObjects.push(...core.inactiveObjects[0].hostileObjects);
		//core.activeObjects.friendlyObjects.push(...core.inactiveObjects[0].friendlyObjects);
		core.activeObjects.neutralObjects.push(...core.inactiveObjects[0].neutralObjects);
		core.activeObjects.backgroundObjects.push(...core.inactiveObjects[0].backgroundObjects);


		///think of this shift and push thingy if multiply background waves wont work 
		let loadedElement = core.inactiveObjects.shift();
		core.inactiveObjects.push(loadedElement);
	}

	if(core.gameClockRaw == core.inactiveThemes[0].timing){
		core.activeThemes.backgroundThemes.push(...core.inactiveThemes[0].backgroundThemes);
	}
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







