import {Core} from './core.js';

function preRender(imgSrc, imgWidth, imgHeight){
	let imgR = document.createElement("canvas");
	let ctxR = imgR.getContext("2d");

	let img = new Image();
	img.src = imgSrc;

	imgR.width = imgWidth;
	imgR.height = imgHeight;
	ctxR.save();

	img.onload = function(){
		ctxR.drawImage(img, 0, 0, imgWidth, imgHeight);
		ctxR.beginPath();
		ctxR.lineWidth = "2";
		ctxR.strokeStyle = "blue";
		ctxR.rect(0, 0, imgWidth, imgHeight);
		ctxR.stroke();
	}

	ctxR.restore();

	return imgR;
}


let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');

/////////preload assets///////
//let himg = new Image();
//himg.src = 'assets/explosion.png';

let himg2 = new Image();
himg2.src = 'assets/fighter1.svg';

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

//scale is needed to make objects responsive
let scale = (GAME_WIDTH / 1920) + Number.EPSILON;
const GAME_SCALE = Math.round(scale * 100) / 100;

//add another function or object to level file and import just this part, eg.: level options.
// those options will be used by pre-renderer to pre render images and stuff
let himgsrc = 'assets/explosion.png';
let himg = preRender(himgsrc, 4096, 4096);

let bimgsrc = 'assets/sprite_test.png';
let bimg = preRender(bimgsrc, 80, 16);

let imgArray = [himg, himg2, bimg];

let core = new Core(GAME_WIDTH, GAME_HEIGHT, GAME_SCALE, imgArray);
core.start();

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






