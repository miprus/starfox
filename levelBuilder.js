import assets_list from "./assets_list.json" assert { type: "json" };
import user_data from "./user/user_data.json" assert { type: "json" };

import {preRenderList} from "./preRenderer.js";
import {Hero} from './hero.js';

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


/////////////////hero object///////////////

let starfighterDetails = user_data.starfighterDetails;

let componentsData = [];


starfighterDetails.components.forEach(element => {
	let heroComponent = assets_list.starfighterObjects.find(({name}) => name === element.name);
	componentsData.push(heroComponent);

});


let componentSprite = preRenderList(componentsData);
console.log(componentSprite);

var newWave = {
	timing: 1, 
	friendlyObjects: [],
	hostileObjects: [],
	neutralObjects: [],
	backgroundObjects: [],
}

let newHero = new Hero(core, componentSprite);

newWave.friendlyObjects.push(newHero);

core.inactiveObjects.push(newWave);
console.log(core.inactiveObjects);

core.hero = newHero;

/////////////////
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
			friendlyObjects: [],
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
		console.log(newWave);

		core.inactiveObjects.push(newWave);

		console.log(core.inactiveObjects);
	});


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







//console.log(componentsSprites);


	//////loading player//////

	/*
	+import hero object
	+import player config (type of starfighter, weaponns, skills, etc);
	+import assets list

	+match starfighter data from player config with data from assets list (just like with other objects you did earlier)

	+/-get hero's hull, wings, engine, weapons (classes)
	+prerender their sprites
	+/-create hero object


	+push into core.inactive frieendlies
	then
	invoke (push into core.active) in event handler

	(this way the cutscenes or other interruptors should be easier to made... I hope)
	*/

}

function levelEventHandler(core){
	//console.log(core.inactiveObjects);
	//console.log(core.activeObjects);
	if(core.gameClockRaw == core.inactiveObjects[0].timing){
		core.activeObjects.hostileObjects.push(...core.inactiveObjects[0].hostileObjects);
		core.activeObjects.friendlyObjects.push(...core.inactiveObjects[0].friendlyObjects);
		core.activeObjects.neutralObjects.push(...core.inactiveObjects[0].neutralObjects);
		core.activeObjects.backgroundObjects.push(...core.inactiveObjects[0].backgroundObjects);

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







