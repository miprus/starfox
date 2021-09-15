class Neutral_Object_1{
	constructor(core, position, sprite){
		this.GAME_WIDTH = core.GAME_WIDTH;
		this.GAME_HEIGHT = core.GAME_HEIGHT;
		this.GAME_SCALE = core.GAME_SCALE;
        //this.spriteSheet = false;
        this.img = sprite;

		this.core = core;

		this.width = 64 * core.GAME_SCALE;
		this.height = 64 * core.GAME_SCALE;

		this.speed = {
			x: 6 * core.GAME_SCALE,
			y: 6 * core.GAME_SCALE,		
		}

		this.position = position;
		/*
		this.position = {
			x: 
			y:
		}
		
		*/

		this.dead = false;

		this.numCol = 1;
		this.numRow = 1;
		this.maxFrame = this.numCol * this.numRow;
		this.cFrame = 0;

		/*
		function(this){
			wypluj variables: col, row i inne do draw and update function?
		}
		*/
	}

	draw(ctx){
        //change this update when you start doing custome sprite sheets
		let col = this.cFrame % this.numCol;
		let row = Math.floor(this.cFrame / this.numCol);


		ctx.drawImage(this.img, col*16, row*16, 16, 16, this.position.x, this.position.y, this.width, this.height);
		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = "yellow";
		ctx.rect(this.position.x, this.position.y, this.width, this.height);
		ctx.stroke();
	}

	update(){
        if(this.position.y > this.core.GAME_HEIGHT){
			this.dead = true;
		} else {
			this.position.y += this.speed.y;
		}	


	}

}

export {Neutral_Object_1};