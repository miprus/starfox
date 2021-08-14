import {Core} from './core.js';
import {preRenderList} from "./preRenderer.js";
//import {  } from "./assets_list.json";

let jsonData = `{
    "gameObjects" : [
        {
            "id" : "1",
            "type" : "weapon",
            "name" : "himg",
            "src" : "assets/explosion.png",
            "width" : "4096",
            "height" : "4096"  
        },
        {      
            "id" : "2",
            "type" : "hero",
            "name" : "himg2",
            "src" : "assets/fighter1.svg",
            "width" : "64",
            "height" : "64"  
        },
        {
            "id" : "3",
            "type" : "bck_object",
            "name" : "bimg",
            "src" : "assets/sprite_test.png",
            "width" : "80",
            "height" : "16"    
        }
    ]
}`;

let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

//scale is needed to make objects responsive
let scale = (GAME_WIDTH / 1920) + Number.EPSILON;
const GAME_SCALE = Math.round(scale * 100) / 100;

//load game assets
let assets_list = JSON.parse(jsonData);
let imgArray = preRenderList(assets_list);

//debug//
console.log(imgArray);
//////////////////////

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






