class Hero{
	
	constructor(core){
		this.GAME_WIDTH = core.GAME_WIDTH;
		this.GAME_HEIGHT = core.GAME_HEIGHT;
		this.GAME_SCALE = core.GAME_SCALE;
		this.img = core.img2;

		this.core = core;

		this.width = 64 * core.GAME_SCALE;
		this.height = 64 * core.GAME_SCALE;

		this.maxSpeed = 10 * core.GAME_SCALE;

		this.speed = {
			x: 0,
			y: 0,		
		}

		this.position = {
			x: core.GAME_WIDTH / 2 - this.width / 2,
			y: core.GAME_HEIGHT - this.height * 2,
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
		ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = "blue";
		ctx.rect(this.position.x, this.position.y, this.width, this.height);
		ctx.stroke();

		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = "blue";
		ctx.rect(this.position.x - this.width/2, this.position.y + this.height/2, this.width/2, this.height/2);
		ctx.stroke();

		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = "blue";
		ctx.rect(this.position.x + this.width, this.position.y + this.height/2, this.width/2, this.height/2);
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
	}
}



export {Hero};