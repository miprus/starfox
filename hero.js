class Hero{
	static bulletType = "HeroWeapon";
//thats the name of a object with type "bullet" from assets_list

	constructor(core, moduleSprites, bulletClass){
		this.GAME_WIDTH = core.GAME_WIDTH;
		this.GAME_HEIGHT = core.GAME_HEIGHT;
		this.GAME_SCALE = core.GAME_SCALE;

		this.sprite = {
			weapon: moduleSprites.weapon,
			wings: moduleSprites.wings,
			engine: moduleSprites.engine,
			hull: moduleSprites.hull,
			cockpit: moduleSprites.cockpit,

			//engineFlame: moduleSprites[0].img,
		}

		//expand moduleSprites{} by adding starfighter component's width and height
		this.core = core;

		this.fireRate = 12;
		this.fireRateCounter = this.fireRate;
		this.fire = false;

		this.maxSpeed = 10 * this.GAME_SCALE;

		this.speed = {
			x: 0,
			y: 0,		
		}

		//calculate total width & height and individual width & height for each module for better position render. You should make it look better later. Perhaps pre setting width and height of images/sprites while loading or prerendering
		this.width = this.sprite.wings.width / 4 * this.GAME_SCALE;
		this.height = this.sprite.hull.height / 4 + (this.sprite.cockpit.height * 0.2) / 4 + (this.sprite.engine.height * 0.2) / 4 * this.GAME_SCALE;

		/*
		this.sprite.weapon.width = this.sprite.weapon.width / 4 * this.GAME_SCALE;
		this.sprite.weapon.height = this.sprite.weapon.height / 4 * this.GAME_SCALE;

		this.sprite.wings.width = this.sprite.wings.width / 4 * this.GAME_SCALE;
		this.sprite.wings.height = this.sprite.wings.height / 4 * this.GAME_SCALE;

		this.sprite.engine.width = this.sprite.engine.width / 4 * this.GAME_SCALE;
		this.sprite.engine.height = this.sprite.engine.height / 4 * this.GAME_SCALE;

		this.sprite.hull.width = this.sprite.hull.width / 4 * this.GAME_SCALE;
		this.sprite.hull.height = this.sprite.hull.height / 4 * this.GAME_SCALE;

		this.sprite.cockpit.width = this.sprite.cockpit.width / 4 * this.GAME_SCALE;
		this.sprite.cockpit.height = this.sprite.cockpit.height / 4 * this.GAME_SCALE;
*/

		/*
			this.width = this.sprite.hull.width / 2 * this.GAME_SCALE;
			//64 * this.GAME_SCALE;
			this.height = this.sprite.hull.height / 2 * this.GAME_SCALE;
			//64 * this.GAME_SCALE;
		*/

		this.position = {
			x: this.GAME_WIDTH / 2 - this.width / 2,
			y: this.GAME_HEIGHT - this.height * 2,

			weaponX: this.GAME_WIDTH / 2 - this.sprite.weapon.width / 2,
			weaponY: this.GAME_HEIGHT - this.sprite.weapon.height * 2,

			wingsX: this.GAME_WIDTH / 2 - this.sprite.wings.width / 2,
			wingsY: this.GAME_HEIGHT - this.sprite.wings.height * 2,

			engineX: this.GAME_WIDTH / 2 - this.sprite.engine.width / 2,
			engineY: this.GAME_HEIGHT - this.sprite.engine.height * 2,

			hullX: this.GAME_WIDTH / 2 - this.sprite.hull.width / 2,
			hullY: this.GAME_HEIGHT - this.sprite.hull.height * 2,

			cockpitX: this.GAME_WIDTH / 2 - this.sprite.cockpit.width / 2,
			cockpitY: this.GAME_HEIGHT - this.sprite.cockpit.height * 2,
		}

		this.bulletClass = bulletClass;
		this.bulletSprite = moduleSprites.bullet,

		this.weapon = {
			//add weapon stats here
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
		//draw weapon module
		ctx.drawImage(this.sprite.weapon, this.position.x + this.width * 0.2, this.position.y, this.width * 0.6, this.height * 0.7);
		

		//draw wings module
		ctx.drawImage(this.sprite.wings, this.position.x, this.position.y, this.width, this.height * 0.8);
		


		//draw engine module
		ctx.drawImage(this.sprite.engine, this.position.x + this.width * 0.3, this.position.y + this.height * 0.6, this.width * 0.4, this.height * 0.4);
		


		//draw hull module
		ctx.drawImage(this.sprite.hull, this.position.x + this.width * 0.2, this.position.y, this.width * 0.6, this.height * 0.8);
		

		//draw cockpit module
		ctx.drawImage(this.sprite.cockpit, this.position.x + this.width * 0.3, this.position.y, this.width * 0.4, this.height * 0.4);
		
		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = "blue";
		ctx.rect(this.position.x, this.position.y, this.width, this.height);
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


			if(this.fire && this.fireRateCounter >= this.fireRate){

				//add functio for assigning weapon's shots?
				let shot = new this.bulletClass(this.core, this.bulletSprite);
				shot.position.x = this.position.x + this.width / 2 - shot.width / 2,
				shot.position.y = this.position.y,

				this.core.activeObjects.friendlyObjects.push(shot);
	
				this.fireRateCounter = 0;
			}else{
				this.fireRateCounter++;
			}
	}
}



export {Hero};