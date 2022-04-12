class Hero{
	//thats the name of a object with type "bullet" from assets_list
	static bulletType = "BulletV1";
	static trackName = "Explosion_01";

	constructor(core, moduleSprites, bulletClass, starfighterStats){
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

		this.core = core;

		this.fireRate = 12;
		this.fireRateCounter = this.fireRate;
		this.audioRateCounter = this.fireRate;
		this.fire = false;

		/////////////////////stats/////////////////////
		this.hp = starfighterStats.hp;

		this.maxSpeed = (10 + starfighterStats.maxSpeed) * this.GAME_SCALE;

		//////////////////////////////////////////////

		this.speed = {
			x: 0,
			y: 0,		
		}

		this.width = this.sprite.hull.width / 3 * this.GAME_SCALE;
		this.height = this.sprite.hull.height / 3 * this.GAME_SCALE;


		this.position = {
			x: this.GAME_WIDTH / 2 - this.width / 2,
			y: this.GAME_HEIGHT - this.height * 2,
		}

		this.bulletClass = bulletClass;
		this.bulletSprite = moduleSprites.bullet,

		this.weapon = {
			//add weapon stats here
		}

		///////////////////////////audio and sfx section////////////////////////////
		this.shotSFX = null;
		this.explosionSFX = null;
		///////////////////////////////////////////////////////////////////////////
		this.dead = false;
	}

	playShotAudio(){
		if(this.fire && this.audioRateCounter >= this.fireRate){
			this.shotSFX.cloneNode(true).play();
	
			this.audioRateCounter = 0;

			//debug
			//console.log(this.shotSFX);
		}
	}

	playExpSFX(){
		this.explosionSFX.cloneNode(true).play();

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
		ctx.drawImage(this.sprite.weapon, this.position.x, this.position.y, this.width, this.height);
		

		//draw wings module
		ctx.drawImage(this.sprite.wings, this.position.x, this.position.y, this.width, this.height);


		//draw engine module
		ctx.drawImage(this.sprite.engine, this.position.x, this.position.y, this.width, this.height);
		


		//draw hull module
		ctx.drawImage(this.sprite.hull, this.position.x, this.position.y, this.width, this.height);
		

		//draw cockpit module
		ctx.drawImage(this.sprite.cockpit, this.position.x, this.position.y, this.width, this.height);
		

		/* Debug
		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = "blue";
		ctx.rect(this.position.x, this.position.y, this.width, this.height);
		ctx.stroke();
		*/
	}

	update(){
		this.position.x += this.speed.x;
		this.position.y += this.speed.y;

		this.audioRateCounter++;
		
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
				shot.position.x = this.position.x + this.width / 2 - shot.width / 2;
				shot.position.y = this.position.y - this.height / 2;

				this.core.activeObjects.friendlyObjects.push(shot);
	
				this.fireRateCounter = 0;
			}else{
				this.fireRateCounter++;
			}
	}
}



export {Hero};