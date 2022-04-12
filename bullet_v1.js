class BulletV1{
	
	static trackName = "Shot_01";

	constructor(core, sprite){
		this.GAME_SCALE = core.GAME_SCALE;
		this.img = sprite;

		this.width = 40 * core.GAME_SCALE;
		this.height = 60 * core.GAME_SCALE;

		this.core = core;

		this.speed = {
			x: 0,
			y: -11 * core.GAME_SCALE,
		}

		this.position = {
			x: 0,
			y: 0,
		}

		//this.explosionSFX = null;

		this.dead = false;
		
		//frame control for animation
		this.numCol = 6;
		this.numRow = 2;
		this.maxFrame = 6;
		this.cFrame = 0;

		this.animationRate = 8;
		this.animationRateCounter = 0;
		this.animationPhase = 1;
	}

	playExpSFX(){
		//this.explosionSFX.cloneNode(true).play();

	}

	draw(ctx){
		//change this update when you start doing custome sprite sheets
		let col = this.cFrame % this.numCol;
		let row = Math.floor(this.cFrame / this.numCol);


		ctx.drawImage(this.img, col*64, row*64, 64, 64, this.position.x, this.position.y, this.width, this.height);
		
		/*Debug
		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = "green";
		ctx.rect(this.position.x, this.position.y, this.width, this.height);
		ctx.stroke();
		*/
	}

	update(){
		if(this.animationPhase == 2){

			this.cFrame = 6;
			//console.log(this.cFrame % this.numCol)
			//console.log(Math.floor(this.cFrame / this.numCol))

			if(this.position.y < 0){
				this.dead = true;
			} else {
				this.position.y += this.speed.y;
			}

		} else {
			if(this.animationRateCounter >= this.animationRate){

				this.animationRateCounter = 0;
				this.animationPhase = 2;
	
			} else {
				if(this.cFrame <= 6){
					this.cFrame++;	
				}

				this.animationRateCounter++;

			}
		}

	}
}

export {BulletV1};