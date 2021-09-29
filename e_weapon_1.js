class EnemyWeapon{
	//rename clas name to 'bullet something'
	static bulletImgSrc = "assets/explosion.png";

	constructor(core, sprite){
		this.GAME_SCALE = core.GAME_SCALE;
		this.GAME_HEIGHT = core.GAME_HEIGHT;

		this.width = 20 * core.GAME_SCALE;
		this.height = 30 * core.GAME_SCALE;

		this.img = sprite;

		this.core = core;

		this.speed = {
			x: 0,
			y: 11 * core.GAME_SCALE,
		}

		this.position = {
			x: 0,
			y: 0,
		}

		this.dead = false;

		this.numCol = 8;
		this.numRow = 8;
		this.maxFrame = this.numCol * this.numRow;
		this.cFrame = 0;
	}


	draw(ctx){
		let col = this.cFrame % this.numCol;
		let row = Math.floor(this.cFrame / this.numCol);

		ctx.drawImage(this.img, col*512, row*512, 512, 512, this.position.x, this.position.y, this.width, this.height);
		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = "purple";
		ctx.rect(this.position.x, this.position.y, this.width, this.height);
		ctx.stroke();
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

export {EnemyWeapon};