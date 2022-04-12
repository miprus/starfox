class EnemyWeapon1{
	//rename clas name to 'bullet something'
	//review reading of image path
	static bulletImgSrc = "./Data/Art/shot_spritesheet_2.png";

	constructor(core, sprite){
		this.GAME_SCALE = core.GAME_SCALE;
		this.GAME_HEIGHT = core.GAME_HEIGHT;

		this.width = 20 * core.GAME_SCALE;
		this.height = 30 * core.GAME_SCALE;

		this.img = sprite;

		//no need for core
		this.core = core;

		this.speed = {
			x: 0,
			y: 11 * core.GAME_SCALE,
		}

		this.position = {
			x: 0,
			y: 0,
		}

		//this.explosionSFX = null;

		this.dead = false;

		//frame control for animation
		this.numCol = 5;
		this.numRow = 3;
		this.maxFrame = this.numCol * this.numRow;
		this.cFrame = 0;
	}

	playExpSFX(){
		//this.explosionSFX.cloneNode(true).play();

	}

	draw(ctx){
		//variables for sprite animation
		let col = this.cFrame % this.numCol;
		let row = Math.floor(this.cFrame / this.numCol);

		ctx.drawImage(this.img, 1*32, 1*32, 32, 32, this.position.x, this.position.y, this.width, this.height);

		/* Debug 
		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = "purple";
		ctx.rect(this.position.x, this.position.y, this.width, this.height);
		ctx.stroke();
		*/ 
	}

	update(){
		if(this.position.y > this.GAME_HEIGHT){
			this.dead = true;
		} else {
			this.position.y += this.speed.y;
		}	

		if(this.cFrame > this.maxFrame){
			this.cFrame = 0;
		} else {
			setTimeout(() => {
				this.cFrame++;
			}, 16.67);
		}	
	}
}

export {EnemyWeapon1};