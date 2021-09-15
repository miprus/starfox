import {Hero} from './hero.js';
import {Controls} from './controls.js';
import {HeroWeapon} from './h_weapon_1.js';
import {Enemy1} from './enemy_1.js';
import {collisionDetector} from './collisionDetector.js';
import {EnemyWeapon} from './e_weapon_1.js';
//import {Neutral_Object_1} from './neutral_object_1.js';
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
		this.img2 = this.imgArray[1].img;

		//debug//
		//console.log(this.imgArray);
		//console.log(assets_list.gameObjects);
		//////////////////////


		
		this.hero = new Hero(this);
		
		this.heroWeapon = new HeroWeapon(this);
		this.enemyWeapon = new EnemyWeapon(this);

		this.fc = this.heroWeapon.fireRate;

		//objects arrays
		//active (those that will be drawn on the screen)
		this.activeObjects = {
			friendlyObjects: [this.hero],
			hostileObjects: [],
			neutralObjects: [],
			backgroundObjects: [],
		}

		//inactive (those that are loaded but not yet displayed)
		this.inactiveObjects = [];

		//one cycle (update) takes approx. 16.6ms. That means speed of 4 (y: 4) = 66.4ms


		await levelLoader(this);	
		//levelLoader seems to work only after 3 cycle of core.update(). It may be the source of future buggs. UPDATE: making core.start() async function seems to fix timing bug since it is possible now to force some functions to await for promises
		



		new Controls(this.hero, this.heroWeapon, this);
	}

	update(){
		if(this.GAME_STATE === GAME_STATE.PAUSE) return;


		this.gameClockRaw += 1;
		this.gameClock = Math.round(this.gameClockRaw/60)
		document.getElementById("clock_counter").innerHTML = this.gameClock; //game clock control (divided by 60 to convert timer to seconds so each showed interation takes 1 real second)



		
		if(this.heroWeapon.fire === true && this.fc >= this.heroWeapon.fireRate){
			let shot = new HeroWeapon(this);
			this.activeObjects.friendlyObjects.push(shot);

			this.fc = 0;
		}else{
			this.fc++;
		}


		levelEventHandler(this);
		

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

	draw(ctx){
		[...this.activeObjects.friendlyObjects, ...this.activeObjects.hostileObjects, ...this.activeObjects.backgroundObjects, ...this.activeObjects.neutralObjects].forEach(object => object.draw(ctx));
	}

}

export {Core};