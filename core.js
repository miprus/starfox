import {Controls} from './controls.js';
import {collisionDetector} from './collisionDetector.js';
import {levelLoader, levelEventHandler} from './levelBuilder.js';
import {preRenderList} from "./preRenderer.js";
import assets_list from "./assets_list.json" assert { type: "json" };
//new json module syntax is apperently not supported by visual studio code :(


const GAME_STATE = {
	PAUSE: 0,
	RUN: 1,
	CUTSCENE: 2,
	LOADING: 3,
	MENU: 4,
}


class Core{
	constructor(GAME_WIDTH, GAME_HEIGHT, GAME_SCALE){
		this.GAME_WIDTH = GAME_WIDTH;
		this.GAME_HEIGHT = GAME_HEIGHT;	
		this.GAME_SCALE = GAME_SCALE;
		this.GAME_STATE = GAME_STATE.RUN;

		this.gameClockRaw = 0;
		this.gameClock = 0;

		this.level = 'level_1';
	}


	togglePause(){
		if(this.GAME_STATE == GAME_STATE.PAUSE){
			this.GAME_STATE = GAME_STATE.RUN;
			document.getElementById("menu_box").style.visibility = "hidden";
			console.log("resume"); //debug

		} else {
			this.GAME_STATE = GAME_STATE.PAUSE;
			document.getElementById("menu_box").style.visibility = "visible";
			console.log("paused");//debug
		}
	}

	async start(){
		this.globalModifires = [];
		
		this.imgArray = preRenderList(assets_list.gameObjects);
		this.img = this.imgArray[0].img;

		this.gameObjectsImgData = preRenderList(assets_list.gameObjects);
		this.gameBackgroundsImgData = preRenderList(assets_list.gameBackgrounds);




		//debug//
		//console.log(this.imgArray);
		//console.log(assets_list.gameObjects);
		//console.log(this.gameObjectsImgData);
		//console.log(this.gameBulletsImgData);
		//console.log(this.gameBackgroundsImgData);
		//////////////////////


		//objects arrays
		//active (those that will be drawn on the screen)
		this.activeObjects = {
			friendlyObjects: [],
			hostileObjects: [],
			neutralObjects: [],
			backgroundObjects: [],
		}

		this.heroObjects = {
			hero: null,
		}

		this.activeThemes = {
			backgroundThemes: [],
		}


		//inactive (those that are loaded but not yet displayed)
		this.inactiveObjects = [];
		this.inactiveThemes = [];

		//one cycle (update) takes approx. 16.6ms. That means speed of 4 (y: 4) = 66.4ms


		await levelLoader(this);	
		//levelLoader seems to work only after 3 cycle of core.update(). It may be the source of future buggs. UPDATE: making core.start() async function seems to fix timing bug since it is possible now to force some functions to await for promises
		
		this.controls = new Controls(this);
	}

	update(){
		if(this.GAME_STATE === GAME_STATE.PAUSE) return;


		this.gameClockRaw += 1;
		this.gameClock = Math.round(this.gameClockRaw/60)
		document.getElementById("clock_counter").innerHTML = this.gameClock; //game clock control (divided by 60 to convert timer to seconds so each showed interation takes 1 real second)



		levelEventHandler(this);
		
		[...this.activeThemes.backgroundThemes].forEach(bckTheme => bckTheme.update());

		[...this.activeObjects.friendlyObjects, ...this.activeObjects.hostileObjects, ...this.activeObjects.backgroundObjects, ...this.activeObjects.neutralObjects].forEach(object => object.update());





		for(let i = 0; i < this.activeObjects.friendlyObjects.length; i++){
			for (let j = 0; j < this.activeObjects.hostileObjects.length; j++){

				if(collisionDetector(this.activeObjects.friendlyObjects[i], this.activeObjects.hostileObjects[j])){
					this.activeObjects.friendlyObjects[i].dead = true;
					this.activeObjects.hostileObjects[j].dead = true;
				}
			}
		}

			this.activeObjects.friendlyObjects = this.activeObjects.friendlyObjects.filter(object => !object.dead);
			this.activeObjects.hostileObjects = this.activeObjects.hostileObjects.filter(object => !object.dead);

			this.activeObjects.neutralObjects = this.activeObjects.neutralObjects.filter(object => !object.dead);
			this.activeObjects.backgroundObjects = this.activeObjects.backgroundObjects.filter(object => !object.dead);

	}

	//order of drawing objects is importatnt as it determines the "z-index" of those objects 

	draw(ctx){
		[...this.activeThemes.backgroundThemes].forEach(bckTheme => bckTheme.draw(ctx));

		[...this.activeObjects.backgroundObjects, ...this.activeObjects.neutralObjects, ...this.activeObjects.friendlyObjects, ...this.activeObjects.hostileObjects,].forEach(object => object.draw(ctx));
	}

}

export {Core};