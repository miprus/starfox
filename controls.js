class Controls {

	constructor(core){
		document.addEventListener('keydown', event => {
			switch(event.keyCode){
				case 37: //left
					core.heroObjects.hero.moveLeft();
					break;

				case 39: //right
					core.heroObjects.hero.moveRight();
					break;

				case 38: //up
					core.heroObjects.hero.moveUp();
					break;

				case 40: //down
					core.heroObjects.hero.moveDown();
					break;

				case 32: //backspace
					core.heroObjects.hero.fire = true;

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
					if(core.heroObjects.hero.speed.x < 0){
						core.heroObjects.hero.speed.x = 0;
					}
					break;

				case 39: //right
					if(core.heroObjects.hero.speed.x > 0){
						core.heroObjects.hero.speed.x = 0;
					}
					break;

				case 38: //up
					if(core.heroObjects.hero.speed.y < 0){
						core.heroObjects.hero.speed.y = 0;
					}
					break;

				case 40: //down
					if(core.heroObjects.hero.speed.y > 0){
						core.heroObjects.hero.speed.y = 0;
					}
					break;

				case 32: //backspace
					core.heroObjects.hero.fire = false;
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
