class Controls {

	constructor(core, keyBindingsData){
		document.addEventListener('keydown', event => {
			switch(event.code){
				case keyBindingsData.move_left : //left
					core.heroObjects.hero.moveLeft();
					break;

				case keyBindingsData.move_right: //right
					core.heroObjects.hero.moveRight();
					break;

				case keyBindingsData.move_up: //up
					core.heroObjects.hero.moveUp();
					break;

				case keyBindingsData.move_down: //down
					core.heroObjects.hero.moveDown();
					break;

				case keyBindingsData.shoot: //Space
					core.heroObjects.hero.fire = true;
					core.heroObjects.hero.playShotAudio();

					break;

				case "Alt": //alt

					break;

				case keyBindingsData.pause: //esc
					core.togglePause();
					break;
			}
		});

		document.addEventListener('keyup', event => {
			switch(event.code){
				case keyBindingsData.move_left: //left
					if(core.heroObjects.hero.speed.x < 0){
						core.heroObjects.hero.speed.x = 0;
					}
					break;

				case keyBindingsData.move_right: //right
					if(core.heroObjects.hero.speed.x > 0){
						core.heroObjects.hero.speed.x = 0;
					}
					break;

				case keyBindingsData.move_up: //up
					if(core.heroObjects.hero.speed.y < 0){
						core.heroObjects.hero.speed.y = 0;
					}
					break;

				case keyBindingsData.move_down: //down
					if(core.heroObjects.hero.speed.y > 0){
						core.heroObjects.hero.speed.y = 0;
					}
					break;

				case keyBindingsData.shoot: //space
					core.heroObjects.hero.fire = false;
					break;

				case "Alt": //alt

					break;

				case keyBindingsData.pause: //esc

					break;
			}
		});
	}
}

export {Controls};
