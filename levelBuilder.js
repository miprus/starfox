import assets_list from "./assets_list.json" assert { type: "json" };
import user_data from "./user/user_data.json" assert { type: "json" };
import audioAssets_list from "./audioAssets_list.json" assert { type: "json" };
import {createAudioElementSFX} from './utilities/audioHandler.js';

//import {preRenderList} from "./preRenderer.js";
import {Hero} from './hero.js';

async function moduleLoader(levelFilePath, globalModifires){
	var levelPack = await import(levelFilePath);

	const LEVEL_SETTINGS = new levelPack.LevelSettings(globalModifires);
	const LEVEL = new levelPack.Level;
	return [LEVEL_SETTINGS, LEVEL];
}

async function preLoadData(dataSet, assets, preLoadedSet){
	for(const element of dataSet){
		let objectData = assets.find(({name}) => name === element.name);
		
		let objectFilePath = './' + objectData.file_name;
		let objectName = objectData.name;
		
		let objectClass = await import(objectFilePath);

		if(objectClass[objectName].bulletType){
			let bulletData = assets.find(({name}) => name === objectClass[objectName].bulletType);
			
			let bulletFilePath = './' + bulletData.file_name;
			let bulletName = bulletData.name;

			let bulletClass = await import(bulletFilePath);

			preLoadedSet.hostile.push(bulletClass[bulletName]);

			
			
		} 
		
		switch (objectData.type){
			case "friendly":
				preLoadedSet.friendly.push(objectClass[objectName]);
				break;

			case "hostile":
				preLoadedSet.hostile.push(objectClass[objectName]);
				break;

			case "neutral":
				preLoadedSet.neutral.push(objectClass[objectName]);
				break;

			case "background":
				preLoadedSet.background.push(objectClass[objectName]);
				break;

			case "background_theme":
				preLoadedSet.backgroundThemes.push(objectClass[objectName]);
				break;
		}
	};
	//console.log(dataSet)
	//console.log(assets)
	//console.log(preLoadedSet)
}


function preLoadWave(waveTypeSet, dataSet, objectTypeSet, imgSet, newWaveGroupType, tile, core){
//wavetypeset change to waveMap???
//dataSet change to waveObjectData/Set???

	
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

							var explosionAudioSFX;

							if(element.trackName){
								audioAssets_list.game_sfx.forEach(gameSFX => {
									if(gameSFX.trackName == element.trackName){
										explosionAudioSFX = createAudioElementSFX(gameSFX.src, element.trackName);
									}
								});
							}

						
							if(element.bulletType){
								let bulletSprite = imgSet.find(({name}) => name === element.bulletType);
								let bulletClass = objectTypeSet.find(({name}) => name === element.bulletType);

								let newObject = new element(core, position, sprite.img, bulletClass, bulletSprite.img);

								newObject.explosionSFX = explosionAudioSFX;

								newWaveGroupType.push(newObject);	
							} else {
								let newObject = new element(core, position, sprite.img);
								newObject.explosionSFX = explosionAudioSFX;
																
								newWaveGroupType.push(newObject);	
							}
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

	//calculate statistics for her object
	let local_user_data = JSON.parse(localStorage.getItem('user_data'));
	let starfighterDetails = local_user_data.starfighterDetails;
	let componentsData = [];
	
	var totalHp = 0, totalMaxSpeed = 0;

	///change components to modules?
	//array.prototype.forEach() doesen't work with async processes like await import(); that's why "manual" for each loop has to be created 
	for(let i = 0; i < starfighterDetails.components.length; i++) {
		const element = starfighterDetails.components[i];

		let heroSprites = core.heroObjectsImgData.find(({name}) => name === element.name);
		componentsData.push(heroSprites);

		if(element.type == "weapon"){
			let heroBulletSprite = core.gameObjectsImgData.find(({name}) => name === element.bullet_name);
			componentsData.push(heroBulletSprite);
			
			let heroWeaponBullet = assets_list.gameObjects.find(({name}) => name === element.bullet_name);

			let heroBulletFilePath = './' + heroWeaponBullet.file_name;
			let objectClass = await import(heroBulletFilePath);

			var bulletClass = objectClass[heroWeaponBullet.name];
		}


		var moduleDataPath = './modules/' + element.name + '.json';
		var moduleData = await import(moduleDataPath, {assert: {type: 'json'}});
		moduleData = moduleData["default"];
		

		totalHp = totalHp + moduleData.statistics.hp;
		totalMaxSpeed = totalMaxSpeed + moduleData.statistics.maxSpeed;
	}

	//move it somewhere else 
	document.getElementById("hero_hp").innerHTML = totalHp;

	let starfighterStats = {
		hp: totalHp,
		maxSpeed: totalMaxSpeed,
	}

	let moduleSprites = componentsData;

	//rename it to modulesImages or image set or whatever like this
	let starfighterModules = {
		hull: 0,
		cockpit: 0,
		engine: 0,
		engineFlame: 0,
		wings: 0,
		weapon: 0,
		bullet: 0,
	}

	//console.log(starfighterModules);
	//2: {type: 'engine', name: 'Engine1', img: canvas}
	moduleSprites.forEach(element => {
		let moduleTarget = Object.keys(starfighterModules).find(key => key === element.type);
		starfighterModules[moduleTarget] = element.img;
		
	});

	var explosionAudioSFX, shotAudioSFX;

	//assign explosion SFX to Hero class
	if(Hero.trackName){
		audioAssets_list.game_sfx.forEach(gameSFX => {
			if(gameSFX.trackName == Hero.trackName){
				explosionAudioSFX = createAudioElementSFX(gameSFX.src, gameSFX.trackName);
			}
		});
	}

	//add shot sound effect as well
	if(bulletClass.trackName){
		audioAssets_list.game_sfx.forEach(gameSFX => {
			if(gameSFX.trackName == bulletClass.trackName){
				shotAudioSFX = createAudioElementSFX(gameSFX.src, bulletClass.trackName);
			}
		});
	}

	let newHero = new Hero(core, starfighterModules, bulletClass, starfighterStats);

	newHero.shotSFX = shotAudioSFX;
	newHero.explosionSFX = explosionAudioSFX

	core.activeObjects.friendlyObjects.push(newHero);

	core.heroObjects.hero = newHero;

	//debug
	//let result = moduleSprites.find(({type}) => type === 'hull');
	//console.log(result);
	//////////////////////////////////////////////


	await preLoadData(LEVEL.levelObjects, assets_list.gameObjects, PRELOADED_OBJECTS);
	await preLoadData(LEVEL.levelBackgrouds, assets_list.gameBackgrounds, PRELOADED_THEMES);

	//await importObjects(PRELOADED_OBJECTS, PRELOADED_OBJECTS.gameObjects);
	//await importObjects(PRELOADED_THEMES, PRELOADED_THEMES.themeGroup);

	//PRELOADED_OBJECTS.objectSprites = preRenderList(PRELOADED_OBJECTS.gameObjects);
	//PRELOADED_THEMES.backgroundImages = preRenderList(PRELOADED_THEMES.themeGroup);



	LEVEL.levelWaves.forEach(wave => {
		var newWave = {
			timing: wave.timing,
			friendlyObjects: [],
			hostileObjects: [],
			neutralObjects: [],
			backgroundObjects: [],
		} 

		preLoadWave(wave.hostileGroup, LEVEL.levelObjects, PRELOADED_OBJECTS.hostile, core.gameObjectsImgData, newWave.hostileObjects, tile, core);
		preLoadWave(wave.neutralGroup, LEVEL.levelObjects, PRELOADED_OBJECTS.neutral, core.gameObjectsImgData, newWave.neutralObjects, tile, core);
		preLoadWave(wave.backgroundGroup, LEVEL.levelObjects, PRELOADED_OBJECTS.background, core.gameObjectsImgData, newWave.backgroundObjects, tile, core);
		//preLoadWave(wave.FriendlyGroup, EVEL.levelObjects, PRELOADED_OBJECTS.friendly, core.gameObjectsImgData, newWave.friendlyObjects, tile);

		core.inactiveObjects.push(newWave);
	});


	LEVEL.levelBackgrouds.forEach(background => {
		PRELOADED_THEMES.backgroundThemes.forEach(element => {
			if(element.name == background.name){	
				let bckImg = core.gameBackgroundsImgData.find(({name}) => name === element.name);

				var newBackground = {
					timing: background.timing,
					backgroundThemes: [],
				}

				newBackground.backgroundThemes.push(new element(core, bckImg.img));
				core.inactiveThemes.push(newBackground);
			}
		});
	});

//assign event timing to core for easier access from levelEventHandler function. events such as end of cutscene, start of boss fight or end of level
	core.levelEventTimings = LEVEL.eventTimings;
}


function levelEventHandler(core){
	var eventCounter = 0;

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

	if(core.gameClockRaw == core.levelEventTimings[eventCounter]){
		console.log('end of the level');
		core.togglePause();
		console.log(eventCounter)
		eventCounter++;
	}
}
	
export {levelLoader, levelEventHandler};