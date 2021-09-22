import {HeroWeapon} from './h_weapon_1.js';

class Hero{	
	constructor(core, sprites){
		this.GAME_WIDTH = core.GAME_WIDTH;
		this.GAME_HEIGHT = core.GAME_HEIGHT;
		this.GAME_SCALE = core.GAME_SCALE;

		this.sprite = {
			hull: sprites[0].img,
			cockpit: sprites[1].img,
			engine: sprites[2].img,
			wingLeft: sprites[3].img,
			wingRight: sprites[4].img,
			
			//weapon: sprites[0].img,
		}

		//expand sprites{} by adding starfighter component's width and height


		this.core = core;

		this.fireRate = 10;
		this.fc = this.fireRate;
		this.fire = false;


		this.width = 64 * this.GAME_SCALE;
		this.height = 64 * this.GAME_SCALE;

		this.maxSpeed = 10 * this.GAME_SCALE;

		this.speed = {
			x: 0,
			y: 0,		
		}

		this.position = {
			x: this.GAME_WIDTH / 2 - this.width / 2,
			y: this.GAME_HEIGHT - this.height * 2,
		}

		this.dead = false;
	}

	moveRight(){
		this.speed.x = this.maxSpeed;
	}

	moveLeft(){
		this.speed.x = -this.maxSpeed;
	}

	moveUp(){
		this.speed.y = -this.maxSpeed;
	}

	moveDown(){
		this.speed.y = this.maxSpeed;
	}

	draw(ctx){
		ctx.drawImage(this.sprite.hull, this.position.x, this.position.y, this.width, this.height);
		
		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = "blue";
		ctx.rect(this.position.x, this.position.y, this.width, this.height);
		ctx.stroke();

		//ctx.drawImage(this.sprite.wingLeft, this.position.x, this.position.y, this.width, this.height);

		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = "blue";
		ctx.rect(this.position.x - this.width/2, this.position.y + this.height/2, this.width/2, this.height/2);
		ctx.stroke();

		//ctx.drawImage(this.sprite.wingRight, this.position.x, this.position.y, this.width, this.height);

		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = "blue";
		ctx.rect(this.position.x + this.width, this.position.y + this.height/2, this.width/2, this.height/2);
		ctx.stroke();
		
	}


	update(){

		this.position.x += this.speed.x;
		this.position.y += this.speed.y;

		
		//move movement check to controls.js????
			if(this.position.x < 0){
				this.position.x = 0;
			} 

			if(this.position.x + this.width > this.GAME_WIDTH){
				this.position.x = this.GAME_WIDTH - this.width;
			} 

			if(this.position.y < 0){
				this.position.y = 0;
			} 

			if(this.position.y + this.height > this.GAME_HEIGHT){
				this.position.y = this.GAME_HEIGHT - this.height;
			} 


			if(this.fire === true && this.fc >= this.fireRate){
				let shot = new HeroWeapon(this.core);
				shot.position.x = this.position.x + this.width / 2 - shot.width / 2,
				shot.position.y = this.position.y,

				this.core.activeObjects.friendlyObjects.push(shot);
	
				this.fc = 0;
			}else{
				this.fc++;
			}
	}
}



export {Hero};