class Controls {

	constructor(hero, heroWeapon, core){
		document.addEventListener('keydown', event => {
			switch(event.keyCode){
				case 37: //left
					hero.moveLeft();
					break;

				case 39: //right
					hero.moveRight();
					break;

				case 38: //up
					hero.moveUp();
					break;

				case 40: //down
					hero.moveDown();
					break;

				case 32: //backspace
					heroWeapon.fire = true;
					//change fire control from heroweapon (or weapons in general) to hero and enemies
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
					if(hero.speed.x < 0){
						hero.speed.x = 0;
					}
					break;

				case 39: //right
					if(hero.speed.x > 0){
						hero.speed.x = 0;
					}
					break;

				case 38: //up
					if(hero.speed.y < 0){
						hero.speed.y = 0;
					}
					break;

				case 40: //down
					if(hero.speed.y > 0){
						hero.speed.y = 0;
					}
					break;

				case 32: //backspace
					heroWeapon.fire = false;
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
