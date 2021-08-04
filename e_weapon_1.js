class EnemyWeapon{
	
	constructor(core){
		this.GAME_SCALE = core.GAME_SCALE;

		this.width = 10 * core.GAME_SCALE;
		this.height = 20 * core.GAME_SCALE;

		this.core = core;

		this.speed = {
			x: 0,
			y: 1.6 * core.GAME_SCALE,
		}

		this.position = {
			x: 0,
			y: 0,
		}

		this.fireRate = 50;
		this.fire = true;


		this.dead = false;
	}

	draw(ctx){
		ctx.fillStyle = '#f00'
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update(){
		if(this.position.y > this.core.GAME_HEIGHT){
			this.dead = true;
		} else {
			this.position.y += this.speed.y;
		}	
	}
}

export {EnemyWeapon};