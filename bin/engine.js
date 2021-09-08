//starships variables - player, enemies, etc.
var player, laser;
var lasers = [];
var spawnEnemies = [];

var game_window = document.getElementById('game_window');
var score = 0;

var enemyW;
//import { enemyW } from './modules/mtest.js';



//game launcher

document.addEventListener('DOMContentLoaded', gameStart); //must be before gameStart function to prevent type error

function gameStart(){ 
    player = new component(280, 700, 80, 60, "green");

    gameScreen.start();
    }

//generate game screen
var gameScreen = {
    canvas: document.createElement("canvas"),

    start: function(){
        this.canvas.width = 600;
        this.canvas.height = window.innerHeight - 12;
        this.context = this.canvas.getContext("2d");
        game_window.insertBefore(this.canvas, game_window.childNodes[0]);

        this.frameNo = 0;
        this.interval = setInterval(updateGameScreen, 17); //60FPS
        
        window.addEventListener("keydown", function(e){
            gameScreen.keys = (gameScreen.keys || []);
            gameScreen.keys[e.keyCode] = (e.type == "keydown");
        })
        
        window.addEventListener("keyup", function(e){
            gameScreen.keys[e.keyCode] = (e.type == "keydown");
        })
    },

    clear: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    stop: function(){
        clearInterval(this.interval);
    },

    hit: function(){
        //console.log('hit!');
        score += 1;
        document.getElementById('score').innerHTML = "Score: " + score;
    }
}

//draw context on canvas
function component(x, y, width, height, color){

	this.x = x;
	this.y = y;
    this.width = width;
	this.height = height;
	
    this.speedX = 0;
    this.speedY = 0;

    this.update = function(){
        ctx = gameScreen.context;
		ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height); 
        }

    this.playerMovement = function(){
        this.x += this.speedX;
        this.y += this.speedY;
    }


    //add different type of movement for objects and enemies
    this.movement01 = function(){
        //this.x += 1;
        this.y += 4;
    }

    this.crashDetect = function(otherobj){
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;

        if(
			(mybottom < othertop) ||
			(mytop > otherbottom) ||
			(myright < otherleft) ||
			(myleft > otherright)
		){
        	crash = false;
        }
		
		return crash;
      }
}

//draw objects
function updateGameScreen(){
    for(i = 0; i < spawnEnemies.length; i += 1){
        if(player.crashDetect(spawnEnemies[i])){
            ctx.fillStyle = "rgba(0,0,0,0.6)";
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            ctx.font = "42px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("You have failed the empire!", (ctx.canvas.width / 6) - 50,(ctx.canvas.height / 2) - 100); 

			gameScreen.stop();
			
            return;
        } 
    }

    gameScreen.clear();
    gameScreen.frameNo += 1;

    player.speedX = 0;
    player.speedY = 0;
        if(gameScreen.keys && gameScreen.keys[37]){player.speedX = -7;}
        if(gameScreen.keys && gameScreen.keys[38]){player.speedY = -5;}
        if(gameScreen.keys && gameScreen.keys[39]){player.speedX = 7;}
		if(gameScreen.keys && gameScreen.keys[40]){player.speedY = 5;}
		
    player.playerMovement();
    player.update();

///////////////////lasers////////////////
    if (gameScreen.keys && gameScreen.keys[32]) {
        var inter = everyinterval(8);
    }
    
    if(inter){
        laser = new component(player.x + 36, player.y, 6, 24, "green")
        lasers.push(laser);
    }

    for (let i = 0; i < lasers.length; i += 1) {
        lasers[i].y += -8;
        lasers[i].update();
    }
/////////////////////////////////////////
///////////enemies//////////////////////
if(gameScreen.frameNo == 1 || everyinterval(20)){
    minWidth = 560;

    xRNG = Math.floor(Math.random() * 560) + 1;
    
    //posX_RNG2 = Math.floor(Math.random() * 200) + 1;
    //posX_RNG3 = Math.floor(Math.random() * 60) + 1;

    enemyW = new component(xRNG, -40, 60, 80, "red"); 
    //enemyM = new component(posX_RNG2, 0, 40, 40, "yellow");
    //enemyS = new component(posX_RNG3, 0, 40, 40, "pink");

    //oldRNG = xRNG
    spawnEnemies.push(enemyW); //enemyM, enemyS);
  }

  for (let i = 0; i < spawnEnemies.length; i += 1) {
    spawnEnemies[i].movement01();
    spawnEnemies[i].update();

    

    for (let j = 0; j < lasers.length; j += 1) {

        if (lasers[j].crashDetect(spawnEnemies[i])) {
            gameScreen.hit();
            lasers.splice(j, 1);

            spawnEnemies.splice(i, 1);
            break;

        }
    }
  }
}

function everyinterval(n) {
    if ((gameScreen.frameNo / n) % 1 == 0) {return true;}
    return false;
}


//add health
//add movement restriction for player

//add images
//add sounds effects
//add music
//add main menu
//add end screen
//add shadows


/*
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute("muted", "")
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.playLoop = function(){
        this.sound.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}
*/