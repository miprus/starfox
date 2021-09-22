class Controls {

	constructor(core){
		document.addEventListener('keydown', event => {
			switch(event.keyCode){
				case 37: //left
					core.hero.moveLeft();
					break;

				case 39: //right
					core.hero.moveRight();
					break;

				case 38: //up
					core.hero.moveUp();
					break;

				case 40: //down
					core.hero.moveDown();
					break;

				case 32: //backspace
					core.hero.fire = true;

					break;

				case 18: //alt

					break;

				case 27: //esc
					core.togglePause();
					break;
			}
		});

		document.addEventListener('keyup', event => {
			switch(event.keyCode){
				case 37: //left
					if(core.hero.speed.x < 0){
						core.hero.speed.x = 0;
					}
					break;

				case 39: //right
					if(core.hero.speed.x > 0){
						core.hero.speed.x = 0;
					}
					break;

				case 38: //up
					if(core.hero.speed.y < 0){
						core.hero.speed.y = 0;
					}
					break;

				case 40: //down
					if(core.hero.speed.y > 0){
						core.hero.speed.y = 0;
					}
					break;

				case 32: //backspace
					core.hero.fire = false;
					break;

				case 18: //alt

					break;

				case 27: //esc

					break;
			}
		});
	}
}

export {Controls};
