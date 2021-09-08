import {Neutral_Object_1} from './neutral_object_1.js';
import {Enemy1} from './enemy_1.js';
////////////////////////////////////////////////

import assets_list from "./assets_list.json" assert { type: "json" };
import {preRenderList} from "./preRenderer.js";


async function moduleLoader(levelPath, globalModifires){

	var levelPathModule = await import(levelPath);

	const LEVEL_SETTINGS = new levelPathModule.LevelSettings(globalModifires);
	const LEVEL = new levelPathModule.Level;





	return [LEVEL_SETTINGS, LEVEL];
}


async function levelLoader(core){
		//////////////////options section//////////////
		let tile = Math.round(core.GAME_WIDTH / 21);
		let hmmm = true;
		//list of assets used for the level?
	
		///////////////////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////
	
	
		//let globalModifires = core.globalModifires;
		
	let globalModifires = null;
	let levelPath = './levels/' + core.level + '.js';


	const [LEVEL_SETTINGS, LEVEL] = await moduleLoader(levelPath, globalModifires);

	//console.log(LEVEL);
	//console.log(LEVEL_SETTINGS);



	let classArrayf = [];
	let classArrayh = [];
	let classArrayn = [];
	let classArrayb = [];

	let objectSprites = [];

	LEVEL.levelObjects.forEach(element => {
		let objectElement = assets_list.gameObjects.find(({name}) => name === element.name);

		objectSprites.push(objectElement);
	});
	

	//forOf supports await import(), but forEach() - no... Omoshiroi
	for (const element of objectSprites) {
		let osrc = element.name;
		let oname = element.n;
		
		let module = await import('./' + osrc);

			switch (element.type){
				case "hero":
					classArrayf.push(module[oname]);
					break;
	
				case "enemy":
					classArrayh.push(module[oname]);
					break;
	
				case "neutral":
					classArrayn.push(module[oname]);
					break;
	
				case "bck_object":
					classArrayb.push(module[oname]);
					break;
			}
	}

		//console.log(classArrayn);
		//console.log(classArrayh);



		const LOADED_STAGES = [
			//{
			//	hostileStage: [],
			//	neutralStage: [],
			//} 
		];

		LEVEL.stages.forEach(levelStage => {
			var newStage = {
				hostileStage: [],
				neutralStage: [],
			} 


			//hostile objects
			for (let i = 0; i < levelStage.hostileWave.set.length; i++) {
				let row = levelStage.hostileWave.set[i];

				for (let j = 0; j < row.length; j++) {

					let position = {
						x: tile * j,
						y: -tile * i,
					};

					
					LEVEL.levelObjects.forEach(lvlObj => {
						if(lvlObj.setID == row[j]) {

							classArrayh.forEach(element => {
								if(element.name == lvlObj.n){
									
									//console.log('yay');
									newStage.hostileStage.push(new element(core, position))
									
								} else {
	
									//console.log('nah');
								}


							});
		
						}
					});
				}
			
			}

			//neutral objects
			for (let i = 0; i < levelStage.neutralWave.set.length; i++) {
				let row = levelStage.neutralWave.set[i];


				for (let j = 0; j < row.length; j++) {

					let position = {
						x: tile * j,
						y: -tile * i,
					};


					LEVEL.levelObjects.forEach(lvlObj => {
						
						if(lvlObj.setID == row[j]) {
							
							classArrayn.forEach(element => {
								if(element.name == lvlObj.n){
									console.log('3');
									//console.log('yay');
									newStage.neutralStage.push(new element(core, position))
									
								} else {
									console.log('66');
									//console.log('nah');
								}


							});
		
						}
					});
				}
			
			}

			
			LOADED_STAGES.push(newStage);
			
		});

		console.log("loader:");
		console.log(LOADED_STAGES);
		core.inactiveObjects1 = LOADED_STAGES;





/*
arrays process:

		LEVEL object + assets_list
					||
					\/
			   objectSprites
					||
					\/
		 classArrayh + classArrayn
					||
					\/
				   stage
					||
					\/
				arrayStage
*/

	//});//end


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
			

}


//console.log(LOADED_STAGES);



	function levelEventHandler(core) {
		switch (core.gameClockRaw) {
			case 120:
				//core.hostileObjects.push(...core.inactiveObjects);
				//core.backgroundObjects.push(...core.inactiveBackgroundObjects);


				
				core.hostileObjects.push(...core.inactiveObjects1[0].hostileStage);
				core.backgroundObjects.push(...core.inactiveObjects1[0].neutralStage);


				console.log(core.inactiveObjects1[0].hostileStage);
				console.log(core.inactiveObjects1[0].neutralStage);

				//console.log(core.inactiveBackgroundObjects);

				break;

			case 40:
				//hmm
				break;
		
			default:
				break;
		}
		
	}
	
/*
	4 object types:
		friendly
		hostile
		neutral
		background

	level folder: 
			level settings - js or json file
				speed of background objects
				music and sounds to be loaded
				sprites to be loaded
				objects types to be loaded
				timings of events and stages or waves
				fail conditions (e.g. for escort missions)
				win conditions (e.g. after reaching certain point or killing boss)

				
				campaign modifires
			level stages/events - js file
				arrays for stages [0,1,0,0,0,1,0]
				events



//for other file/s
master settings for player
master modifires of player's starship

json save file hyhy



/////////////////////////////////////////////////////////////////////////////////
level folder 					levelbuilder						assets_list
(instructions)    ====>>>>		(processing)		<<<<======= 	(database)

									||
									||
									||
									\/
									\/
									\/
							level ready to play
							(core/renderer)
/////////////////////////////////////////////////////////////////////////////////

get settings

get object classes
prerender sprites for each obtained object class

create new objects and push them into inactive arrays
let event handler take care of timing


*/
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

export {levelLoader, levelEventHandler};