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

	start(){

		//load game assets

/*
	let xmlhttp = new XMLHttpRequest();
	
	xmlhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		//get json file from the url passed to xmlhttp.open() function below
		var myArr = JSON.parse(this.responseText);
		this.imgArray = preRenderList(myArr);
		
	  }
	};

	xmlhttp.open("GET", './assets_list.JSON' , true);
	xmlhttp.send();
*/

		this.imgArray = preRenderList(assets_list);
		this.img = this.imgArray[0].img;
		this.img2 = this.imgArray[1].img;
		this.bimg = this.imgArray[2].img;
		this.img3 = this.imgArray[3].img;

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
		this.friendlyObjects = [this.hero];
		this.hostileObjects = [];
		this.neutralObjects = [];
		this.backgroundObjects = [];

		//inactive (those that are loaded but not yet displayed)
		this.inactiveFriendlyObjects = []
		this.inactiveHostileObjects = [];
		this.inactiveNeutralObjects = [];
		
		this.inactiveBackgroundObjects = [];

		this.inactiveObjects = []; //testing

		this.inactiveObjects1 = []; //testing
		//one cycle (update) takes approx. 16.6ms. That means speed of 4 (y: 4) = 66.4ms


		levelLoader(this);	
		//levelLoader seems to work only after 3 cycle of core.update(). It may be the source of future buggs
		



		new Controls(this.hero, this.heroWeapon, this);
	}

	update(){
		if(this.GAME_STATE === GAME_STATE.PAUSE) return;


		this.gameClockRaw += 1;
		this.gameClock = Math.round(this.gameClockRaw/60)
		document.getElementById("clock_counter").innerHTML = this.gameClock; //game clock control (divided by 60 to convert timer to seconds so each showed interation takes 1 real second)



		
		if(this.heroWeapon.fire === true && this.fc >= this.heroWeapon.fireRate){
			let shot = new HeroWeapon(this);
			this.friendlyObjects.push(shot);

			this.fc = 0;
		}else{
			this.fc++;
		}



		//console.log(this.friendlyObjects);
		//console.log(this.backgroundObjects);
		//console.log(this.gameClockRaw);

		levelEventHandler(this);
		


		[...this.friendlyObjects, ...this.hostileObjects, ...this.backgroundObjects].forEach(object => object.update());

	for(let i = 0; i < this.friendlyObjects.length; i++){
		for (let j = 0; j < this.hostileObjects.length; j++){

			if(collisionDetector(this.friendlyObjects[i], this.hostileObjects[j])){
					this.friendlyObjects[i].dead = true;
					this.hostileObjects[j].dead = true;
			}
		}
	}

			this.friendlyObjects = this.friendlyObjects.filter(object => !object.dead);
			this.hostileObjects = this.hostileObjects.filter(object => !object.dead);

			this.backgroundObjects = this.backgroundObjects.filter(object => !object.dead);

	}

	draw(ctx){
		[...this.friendlyObjects, ...this.hostileObjects, ...this.backgroundObjects].forEach(object => object.draw(ctx));
	}

}

export {Core};