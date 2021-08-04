import {EnemyWeapon} from './e_weapon_1.js';

class Enemy1{
	constructor(core, position){
		this.GAME_WIDTH = core.GAME_WIDTH;
		this.GAME_HEIGHT = core.GAME_HEIGHT;
		this.GAME_SCALE = core.GAME_SCALE;

		this.core = core;
		this.ec = core.enemyWeapon.fireRate;

		this.width = 64 * core.GAME_SCALE;
		this.height = 64 * core.GAME_SCALE;

		this.speed = {
			x: 4 * core.GAME_SCALE,
			y: 2 * core.GAME_SCALE,		
		}

		this.position = position;

		this.dead = false;
	}

	draw(ctx){
		ctx.fillStyle = '#0ff'
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update(){
		if(this.position.y != this.GAME_HEIGHT - this.height){
			this.position.y += this.speed.y;
		} else {
			this.dead = true;
		}
/*
		if(this.position.y < 50){
			this.position.y += this.speed.y;
		} else {
			this.position.x += this.speed.x;

			if(this.position.x + this.width > this.GAME_WIDTH || this.position.x < 0){
				this.speed.x = -this.speed.x;
			}
		}
*/

		if(this.ec >= this.core.enemyWeapon.fireRate && this.core.enemyWeapon.fire){
			let enemyShot =  new EnemyWeapon(this.core);
			enemyShot.position.x = this.position.x + this.width / 2 - 5;
			enemyShot.position.y = this.position.y + this.height;
			enemyShot.speed.y = 4 * this.GAME_SCALE;
			this.core.hostileObjects.push(enemyShot);

			this.ec = 0;
		}else{
			this.ec++;
		}
		
	}
}

export {Enemy1};