import {Neutral_Object_1} from './neutral_object_1.js';
import {Enemy1} from './enemy_1.js';

function levelLoader(core) {
	
	//////////////////options section//////////////
	let tile = Math.round(core.GAME_WIDTH / 21);
	let hmmm = true;
//list of assets used for the level?

	/////////////inactiveObjects array is ONLY for TESTING purposes//////////


		const wave4 = [
			[],
			[0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
			[0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0],
			[0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		]

				for (let i = 1; i < wave4.length; i++) {
					let row = wave4[i];
				
					for (let j = 0; j < row.length; j++) {
						if(row[j] === 1){
							let position = {
								x: tile * j,
								y: -tile * i,
							};
				
							core.inactiveObjects.push(new Enemy1(core, position));
							//core.inactiveNeutralObjects
							//core.inactiveBackgroundObjects
							//core.inactiveHostileObjects
							//core.inactiveFriendlyObjects
							//separate background, neutral and hostile objects' for loops from eachother
						}	
					}
				}




	const bckObj = [
		[],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0]
	]

			for (let i = 1; i < bckObj.length; i++) {
				let row = bckObj[i];
			
				for (let j = 0; j < row.length; j++) {
					if(row[j] === 1){
						let position = {
							x: tile * j,
							y: -tile * i,
						};
			
						core.inactiveBackgroundObjects.push(new Neutral_Object_1(core, position));

						//separate background, neutral and hostile objects' for loops from eachother
					}	
				}
			}

/*
	switch (background) {
		case value:
			
			break;
	
		default:
			break;
	}
*/

}

	

	function levelEventHandler(core) {

		switch (core.gameClockRaw) {
			case 120:
				core.hostileObjects.push(...core.inactiveObjects);
				core.backgroundObjects.push(...core.inactiveBackgroundObjects);
				console.log(core.inactiveBackgroundObjects);

				break;

			case 40:
				//hmm
				break;
		
			default:
				break;
		}
		
	}
/*
function level1(core, Enemy1){


objects types (backgroud image, background objects, neutral objects, hostile objects)
level settings (duration, timings)
.
.
.


load object (pre render)...

function() => run background image and background objects
if game timer == something{
	switch:
		time 1
		add map of objects:

			neutral:
				[0,1,0]
				[1,0,1]
				[0,1,0]

				for (column){
					for(row)
				}

			hostile:
				[0,2,0]
				[3,0,3]
				[0,2,0]

		to main objects arrays



		time 2



		time 3


		etc.


}




[cutscene]

[wave]
[wave]
[wave]
[inner peace]
[wave]
[inner peace]
[cutscene]
[boss]




*/



/*
	const wave1 = [
		[0, 1000],
		[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
		[1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1]

	]

	const wave2 = [
		[0],
		[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]
	]

	const wave3 = [
		[0, 250, 600],
		[0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
		[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]
	]

	const wave4 = [
		[0, 1000, 2000, 3600, 4600, 5600,],
		[0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0]
	]

	const wave5 = [
		[0, 350, 1000, 1350,],
		[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0],
		[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
		[1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1]
	]
	
	const wave6 = [
		[0, 450, 900, 2000, 2350, 2700, 3300,],
		[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
		[0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0],
		[0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0],
		[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0]

	]
	
	setTimeout(() => {
	for (let i = 1; i < wave1.length; i++) {
		let row = wave1[i];
	
		for (let j = 0; j < row.length; j++) {
			if(row[j] === 1){
				let position = {
					x: tile * j,
					y: -tile ,
				};
	
			setTimeout(() => {
				core.hostileObjects.push(new Enemy1(core, position));
			}, wave1[0][(i - 1)]);
				
	
			}	
		}
	}
	}, 1000);




	setTimeout(() => {
		for (let i = 1; i < wave2.length; i++) {
			let row = wave2[i];
		
			for (let j = 0; j < row.length; j++) {
				if(row[j] === 1){
					let position = {
						x: tile * j,
						y: -tile,
					};
		
				setTimeout(() => {
					core.hostileObjects.push(new Enemy1(core, position));
				}, wave2[0][(i - 1)]);
					
		
				}	
			}
		}
		}, 4000);




	setTimeout(() => {
		for (let i = 1; i < wave3.length; i++) {
			let row = wave3[i];
		
			for (let j = 0; j < row.length; j++) {
				if(row[j] === 1){
					let position = {
						x: tile * j,
						y: -tile,
					};
		
				setTimeout(() => {
					core.hostileObjects.push(new Enemy1(core, position));
				}, wave3[0][(i - 1)]);
					
		
				}	
			}
		}
		}, 8000);




	setTimeout(() => {
		for (let i = 1; i < wave4.length; i++) {
			let row = wave4[i];
		
			for (let j = 0; j < row.length; j++) {
				if(row[j] === 1){
					let position = {
						x: tile * j,
						y: -tile,
					};
		
				setTimeout(() => {
					core.hostileObjects.push(new Enemy1(core, position));
				}, wave4[0][(i - 1)]);
					
		
				}	
			}
		}
		}, 16000);




	setTimeout(() => {
		for (let i = 1; i < wave5.length; i++) {
			let row = wave5[i];
		
			for (let j = 0; j < row.length; j++) {
				if(row[j] === 1){
					let position = {
						x: tile * j,
						y: -tile,
					};
		
				setTimeout(() => {
					core.hostileObjects.push(new Enemy1(core, position));
				}, wave5[0][(i - 1)]);
					
		
				}	
			}
		}
		}, 24000);

	setTimeout(() => {
		for (let i = 1; i < wave6.length; i++) {
			let row = wave6[i];
		
			for (let j = 0; j < row.length; j++) {
				if(row[j] === 1){
					let position = {
						x: tile * j,
						y: -tile,
					};
		
				setTimeout(() => {
					core.hostileObjects.push(new Enemy1(core, position));
				}, wave6[0][(i - 1)]);
					
		
				}	
			}
		}
		}, 32000);



}
*/
export {levelLoader, levelEventHandler};