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

	function renderer(ts){

		let dt = ts - lt;
		lt = ts;
		
		let fps = (1 / dt) * 1000;
		
		document.getElementById("fps_counter").innerHTML = fps.toFixed(2); //framerate control

		//debug - low fps log//
		if(fps < 59){
			console.log(fps);
		}
		///////////////////////

		ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

		core.update();
		core.draw(ctx);
		
		requestAnimationFrame(renderer);
	}

	requestAnimationFrame(renderer);






