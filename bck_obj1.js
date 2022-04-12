class Rock1{
	constructor(core, position, sprite){
		this.GAME_WIDTH = core.GAME_WIDTH;
		this.GAME_HEIGHT = core.GAME_HEIGHT;
		this.GAME_SCALE = core.GAME_SCALE;
		this.img = sprite;

		this.core = core;

		this.width = 64 * core.GAME_SCALE;
		this.height = 64 * core.GAME_SCALE;

		this.speed = {
			x: 4 * core.GAME_SCALE,
			y: 4 * core.GAME_SCALE,		
		}

		this.position = {
			x: position.x,
			y: position.y,
		}

		this.dead = false;
	}

	draw(ctx){
		ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);

		/* Debug
		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = "grey";
		ctx.rect(this.position.x, this.position.y, this.width, this.height);
		ctx.stroke();
		*/
	}

	update(){
		if(this.position.y > this.core.GAME_HEIGHT){
			this.dead = true;
		} else {
			this.position.y += this.speed.y;
		}	
	}
}

export {Rock1};