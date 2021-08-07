import {Hero} from './hero.js';
import {Controls} from './controls.js';
import {HeroWeapon} from './h_weapon_1.js';
import {Enemy1} from './enemy_1.js';
import {collisionDetector} from './collisionDetector.js';
import {EnemyWeapon} from './e_weapon_1.js';
import {level1} from './levels.js';

const GAME_STATE = {
	PAUSE: 0,
	RUN: 1,
	CUTSCENE: 2,
	LOADING: 3,
	MENU: 4,
}



class Core{
	constructor(GAME_WIDTH, GAME_HEIGHT, GAME_SCALE, himg, himg2){
		this.GAME_WIDTH = GAME_WIDTH;
		this.GAME_HEIGHT = GAME_HEIGHT;	
		this.GAME_SCALE = GAME_SCALE;
		this.GAME_STATE = GAME_STATE.RUN;

		this.img = himg;
		this.img2 = himg2;

		this.ct = 0;
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
		this.hero = new Hero(this);
		
		this.heroWeapon = new HeroWeapon(this);
		this.enemyWeapon = new EnemyWeapon(this);

		this.fc = this.heroWeapon.fireRate;

		this.friendlyObjects = [this.hero];
		this.hostileObjects = [];

		//one cycle (update) takes approx. 16.6ms. That means speed of 4 (y: 4) = 66.4ms
		//level1(this, Enemy1);	

		new Controls(this.hero, this.heroWeapon, this);
	}

	update(){
		if(this.GAME_STATE === GAME_STATE.PAUSE) return;


		this.ct += 1;
		document.getElementById("clock_counter").innerHTML = this.ct; //game clock control
		

		if(this.heroWeapon.fire === true && this.fc >= this.heroWeapon.fireRate){
			let shot = new HeroWeapon(this);
			this.friendlyObjects.push(shot);

			this.fc = 0;
		}else{
			this.fc++;
		}

		level1(this, Enemy1);	
		//console.log(this.friendlyObjects);
		console.log(this.hostileObjects);
		


		[...this.friendlyObjects, ...this.hostileObjects].forEach(object => object.update());

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

	}

	draw(ctx){
		[...this.friendlyObjects, ...this.hostileObjects].forEach(object => object.draw(ctx));
	}

}

export {Core};