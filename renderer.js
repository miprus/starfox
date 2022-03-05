import {Core} from './core.js';

let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

//scale is needed to make objects responsive
let scale = (GAME_WIDTH / 1920) + Number.EPSILON;
const GAME_SCALE = Math.round(scale * 100) / 100;

let core = new Core(GAME_WIDTH, GAME_HEIGHT, GAME_SCALE);
await core.start();

let lt = 0;
//fps//
let fpsLog = [];


console.log(localStorage.getItem('user_data'));
////////////////////////////////////
/*
To be developed


*/
document.getElementById("resume_btn").addEventListener("click", resumeButton);

function resumeButton() {
	core.togglePause();
}
/////////////////////////////////////////

function renderer(ts){
	let dt = ts - lt;
	lt = ts;
	
	//fps/////////////////////////////////////////////
	let fps = (1 / dt) * 1000;
	fpsLog.push(fps);
		
	//debug - low fps log//
	if(fps < 50){
		console.log(fps);
		//try to calculate average of fps to actualy see any difference on the screen
	}

	if(fpsLog.length >= 8){ //8 cuz of 16.66ms/2 (update rate)
		let fpsTotal = fpsLog.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

		let fpsAverage = Math.round(fpsTotal/fpsLog.length);
		document.getElementById("fps_counter").innerHTML = fpsAverage; //framerate control
		fpsLog = [];
	}
	////////////////////////////////////////////////

	ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

	core.update();
	core.draw(ctx);
		
	requestAnimationFrame(renderer);
}

requestAnimationFrame(renderer);






