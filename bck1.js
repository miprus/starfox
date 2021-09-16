class Bck1{
	constructor(core, sprite){
		this.GAME_WIDTH = core.GAME_WIDTH;
		this.GAME_HEIGHT = core.GAME_HEIGHT;
		this.GAME_SCALE = core.GAME_SCALE;
		this.img = sprite;

		this.core = core;

		this.width = this.GAME_WIDTH;
		this.height = this.GAME_HEIGHT * 8;

		this.speed = {
			x: 0 * core.GAME_SCALE,
			y: 500 * core.GAME_SCALE,		
		}

		this.position = {
			x: 0,
			y: 0,
		}

		this.dead = false;
	}

	draw(ctx){
		ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
        ctx.drawImage(this.img, this.position.x, this.position.y - this.GAME_HEIGHT, this.width, this.height);
	}

	update(){
        if(this.position.y > this.GAME_HEIGHT){
            this.position.y = 0;
		} else {
            this.position.y += this.speed.y;
            //this.position.x += this.speed.x
        }
	}
}

export {Bck1};