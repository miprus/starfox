function collisionDetector(friendly, hostile, core){

	let friendlyTop = friendly.position.y;
	let friendlyBottom = friendly.position.y + friendly.height;
	let friendlyLeft = friendly.position.x;
	let friendlyRight = friendly.position.x + friendly.width;

	let hostileTop = hostile.position.y
	let hostileBottom = hostile.position.y + hostile.height;
	let hostileLeft = hostile.position.x;
	let hostileRight = hostile.position.x + hostile.width;
	

		if(
			friendlyTop < hostileBottom
			&&
			friendlyBottom > hostileTop
			&&
			friendlyLeft < hostileRight
			&&
			friendlyRight > hostileLeft
			
		){
			if(friendly.constructor.name == "Hero"){
				document.getElementById("hero_hp").innerHTML = 0;
				//core.GAME_STATE = 5;
				core.togglePause();
			}

			if(hostile.constructor.name != "EnemyWeapon"){
				document.getElementById("hero_score").innerHTML = Number(document.getElementById("hero_score").innerHTML) + 10;
			}

			return true;

		} else {
			
			return false;
		}
	
}

export {collisionDetector};
