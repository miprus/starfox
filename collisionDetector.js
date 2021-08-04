function collisionDetector(friendly, hostile){

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
			return true;

		} else {
			
			return false;
		}
	
}

export {collisionDetector};
