class Enemy1{
	static bulletType = "EnemyWeapon";

	constructor(core, position, sprite, bulletClass, bulletSprite){
		this.GAME_WIDTH = core.GAME_WIDTH;
		this.GAME_HEIGHT = core.GAME_HEIGHT;
		this.GAME_SCALE = core.GAME_SCALE;

		this.img = sprite;

		this.core = core;

		this.fireRate = 50;
		this.fireRateCounter = this.fireRate;
		this.fire = true;

		this.width = 64 * core.GAME_SCALE;
		this.height = 64 * core.GAME_SCALE;

		this.speed = {
			x: 10 * core.GAME_SCALE,
			y: 10 * core.GAME_SCALE,		
		}

		this.position = {
			x: position.x,
			y: position.y,
		}

		this.bulletClass = bulletClass;
		this.bulletSprite = bulletSprite;
		this.weapon = {

			//add weapon stats here
		}


		this.dead = false;
	}

	draw(ctx){
		ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);

		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = "red";
		ctx.rect(this.position.x, this.position.y, this.width, this.height);
		ctx.stroke();
	}

	update(){
		if(this.position.y > this.core.GAME_HEIGHT){
			this.dead = true;
		} else {
			this.position.y += this.speed.y;
		}	


		if(this.fireRateCounter >= this.fireRate && this.fire){
			let enemyShot =  new this.bulletClass(this.core, this.bulletSprite);
			enemyShot.position.x = this.position.x + this.width / 2 - 5;
			enemyShot.position.y = this.position.y + this.height;
			//enemyShot.speed.y = 11 * this.GAME_SCALE;
			this.core.activeObjects.hostileObjects.push(enemyShot);

			this.fireRateCounter = 0;
		}else{
			this.fireRateCounter++;
		}
		
	}
}


export {Enemy1};