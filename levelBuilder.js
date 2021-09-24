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

function preLoadData(dataSet, assets, objetctSet) {
	dataSet.forEach(element => {
	let objectElement = assets.find(({name}) => name === element.name);

	objetctSet.push(objectElement);
	});
}

async function importObjects(preLoadedSet, preLoadedSetType){
	for(const element of preLoadedSetType){
		let element_src = './' + element.file_name;
		let elementName = element.name;
		
		let elementClass = await import(element_src);

		switch (element.type){
			case "friendly":
				preLoadedSet.friendly.push(elementClass[elementName]);
				break;

			case "hostile":
				preLoadedSet.hostile.push(elementClass[elementName]);
				break;

			case "neutral":
				preLoadedSet.neutral.push(elementClass[elementName]);
				break;

			case "background":
				preLoadedSet.background.push(elementClass[elementName]);
				break;

			case "background_theme":
				preLoadedSet.backgroundThemes.push(elementClass[elementName]);
				break;
		}

	}
}

function preLoadWave(waveTypeSet, dataSet, objectTypeSet, imgSet, newWaveGroupType, tile, core){
	for(let i = 0; i < waveTypeSet.set.length; i++){
		let row = waveTypeSet.set[i];

		for (let j = 0; j < row.length; j++) {
			let position = {
				x: tile * j,
				y: -tile - tile * i,
			};

			dataSet.forEach(object => {
				if(object.setID == row[j]){
					objectTypeSet.forEach(element => {
						if(element.name == object.name){		
							let sprite = imgSet.find(({name}) => name === element.name);

							newWaveGroupType.push(new element(core, position, sprite.img))	
						}
					});
				}
			});
		}

	}
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
	let newHero = new Hero(core, componentSprite);

	core.activeObjects.friendlyObjects.push(newHero);
	//console.log(core.inactiveObjects);

	core.heroObjects.hero = newHero;

	//////////////////////////////////////////////


	preLoadData(LEVEL.levelObjects, assets_list.gameObjects, PRELOADED_OBJECTS.gameObjects);
	preLoadData(LEVEL.levelBackgrouds, assets_list.gameBackgrounds, PRELOADED_THEMES.themeGroup);

	await importObjects(PRELOADED_OBJECTS, PRELOADED_OBJECTS.gameObjects);
	await importObjects(PRELOADED_THEMES, PRELOADED_THEMES.themeGroup);

	PRELOADED_OBJECTS.objectSprites = preRenderList(PRELOADED_OBJECTS.gameObjects);
	PRELOADED_THEMES.backgroundImages = preRenderList(PRELOADED_THEMES.themeGroup);


	LEVEL.levelWaves.forEach(wave => {
		var newWave = {
			timing: wave.timing,
			friendlyObjects: [],
			hostileObjects: [],
			neutralObjects: [],
			backgroundObjects: [],
		} 

		preLoadWave(wave.hostileGroup, LEVEL.levelObjects, PRELOADED_OBJECTS.hostile, PRELOADED_OBJECTS.objectSprites, newWave.hostileObjects, tile, core);
		preLoadWave(wave.neutralGroup, LEVEL.levelObjects, PRELOADED_OBJECTS.neutral, PRELOADED_OBJECTS.objectSprites, newWave.neutralObjects, tile, core);
		preLoadWave(wave.backgroundGroup, LEVEL.levelObjects, PRELOADED_OBJECTS.background, PRELOADED_OBJECTS.objectSprites, newWave.backgroundObjects, tile, core);
		//preLoadWave(wave.FriendlyGroup, EVEL.levelObjects, PRELOADED_OBJECTS.friendly, PRELOADED_OBJECTS.objectSprites, newWave.friendlyObjects, tile);

		core.inactiveObjects.push(newWave);
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
}

function levelEventHandler(core){
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