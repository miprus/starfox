///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//Remember to take care of bullet type assigned to te weapon componenet!!!!!!!!!!!!!!!!
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

import assets_list from "./assets_list.json" assert { type: "json" };
//import user_data from "./user/user_data.json" assert { type: "json" };
const user_data = JSON.parse(localStorage.getItem('user_data'));

//activate button for saving modules' set
document.getElementById("moduleSetSave_btn").addEventListener("click", moduleSetSave);



//////////save modules' data from selected/mounted modules////////////
function moduleSetSave(){

	let local_user_data = JSON.parse(localStorage.getItem('user_data'));

	local_user_data.starfighterDetails.components.forEach(element => {	
		switch (element.type){
			case "weapon":

				let weaponModuleName = document.getElementById("tile_weapon").childNodes[0].alt;
				element.name = weaponModuleName;
				break;

			case "cockpit":

				let cockpitModuleName = document.getElementById("tile_cockpit").childNodes[0].alt;
				element.name = cockpitModuleName;
				break;

			case "hull":

				let hullModuleName = document.getElementById("tile_hull").childNodes[0].alt;
				element.name = hullModuleName;
				break;

			case "wings":

				let wingsModuleName = document.getElementById("tile_wings").childNodes[0].alt;
				element.name = wingsModuleName;
				break;

			case "engine":

				let engineModuleName = document.getElementById("tile_engine").childNodes[0].alt;
				element.name = engineModuleName;
				break;
    	}
	});

    //update user_data in local storage
	localStorage.setItem('user_data', JSON.stringify(local_user_data));
	//console.log(localStorage.getItem('user_data'));
}


////////////Populate Equipment Window with starfighter module parts/////////////
function displayEq(assets_list){
/*
//Eq tile DOM structure 
<div id="eq_tile_1" class="eq_tile col" ondrop="drop(event)" ondragover="allowDrop(event)">
    <img src="assets/xwing.png" alt="xwing" draggable="true" ondragstart="drag(event)" id="drag1">
</div>
*/
    
	let mountedModules = user_data.starfighterDetails.components;
	let eqModules = assets_list.heroObjects;

	eqModules = eqModules.filter(element => 
		element.name !== mountedModules[0].name  
		&& 
		element.name !== mountedModules[1].name 
		&& 
		element.name != mountedModules[2].name 
		&& 
		element.name != mountedModules[3].name 
		&& 
		element.name != mountedModules[4].name
	);

	let eqWindow = document.getElementById('eq');

    for (let i = 0; i < eqModules.length; i++) {
        let element = eqModules[i];
    
        let eqTile = document.createElement('div');
            eqTile.setAttribute("id", "eq_tile_" + i);
            eqTile.setAttribute("class", "eq_tile");
            eqTile.setAttribute("ondrop", "drop(event)");
            eqTile.setAttribute("ondragover", "allowDrop(event)");
    
        let eqImg = document.createElement('img');
            eqImg.setAttribute("src", element.src);
            eqImg.setAttribute("alt", element.name);
            eqImg.setAttribute("id", "drag" + i)
            eqImg.setAttribute("draggable", "true");
            eqImg.setAttribute("ondragstart", "drag(event)");
        
        eqTile.appendChild(eqImg);
        eqWindow.appendChild(eqTile);
    }
    
    ////add 5 empty slots for easier management... for now////
    for (let i = 0; i < 5; i++) {
        let eqTileEmpty = document.createElement('div');
            eqTileEmpty.setAttribute("id", "eq_tile_" + (eqModules.length + i));
            eqTileEmpty.setAttribute("class", "eq_tile");
            eqTileEmpty.setAttribute("ondrop", "drop(event)");
            eqTileEmpty.setAttribute("ondragover", "allowDrop(event)");
    
            eqWindow.appendChild(eqTileEmpty);
    }
}


//////////Populate hangarStarfighterModules with data based on user_data and assets_list//////////
function getModulesData(hangarStarfighterModules, user_data, assets_list){
    
    let starfighetComponentsData = user_data.starfighterDetails.components;

    //add counter for unique id name assigment
	var j = 1;

    starfighetComponentsData.forEach(element => {	
        let moduleType = Object.keys(hangarStarfighterModules).find(key => key === element.type);
        hangarStarfighterModules[moduleType].name = element.name;

        let elementImg = assets_list.heroObjects.find(({name}) => name === element.name)
    
        hangarStarfighterModules[moduleType].img = new Image();
        hangarStarfighterModules[moduleType].img.src = elementImg.src;
		
		let moduleImg = document.createElement('img');
            moduleImg.setAttribute("src", elementImg.src);
            moduleImg.setAttribute("alt", element.name);
            moduleImg.setAttribute("id", "dragModule" + j)
            moduleImg.setAttribute("draggable", "true");
            moduleImg.setAttribute("ondragstart", "drag(event)");

		switch (moduleType){
			case "weapon":

				document.getElementById("tile_weapon").appendChild(moduleImg);
				break;

			case "cockpit":

				document.getElementById("tile_cockpit").appendChild(moduleImg);
				break;

			case "hull":

				document.getElementById("tile_hull").appendChild(moduleImg);
				break;

			case "wings":

				document.getElementById("tile_wings").appendChild(moduleImg);
				break;

			case "engine":

				document.getElementById("tile_engine").appendChild(moduleImg);
				break;
    	}

		j++;
    });
}


/////////render all modules based from temporary user data object (hangarStarfighterModules)////////////////
function renderAllModules(hangarStarfighterModules){
	for(const [typeKey, starfighterModule] of Object.entries(hangarStarfighterModules)){

		if(starfighterModule.img){
			let modulePos = {
			x: 0,
			y: 0,
		}

		switch (starfighterModule.type){
			case "weapon":
				modulePos.x = hangarCanvas.width / 2 - starfighterModule.img.width / 2;
				modulePos.y = hangarCanvas.height / 2 - starfighterModule.img.height / 2 - hangarCanvas.height * 0.2;

				break;

			case "hull":
				modulePos.x = hangarCanvas.width / 2 - starfighterModule.img.width / 2;
				modulePos.y = hangarCanvas.height / 2 - starfighterModule.img.height / 2;

				break;

			case "wings":
				modulePos.x = hangarCanvas.width / 2 - starfighterModule.img.width / 2;
				modulePos.y = hangarCanvas.height / 2 - starfighterModule.img.height / 2;

				break;

				
			case "cockpit":
				modulePos.x = hangarCanvas.width / 2 - starfighterModule.img.width / 2;
				modulePos.y = hangarCanvas.height / 2 - starfighterModule.img.height / 2 - hangarCanvas.height * 0.2;

				break;

			case "engine":
				modulePos.x = hangarCanvas.width / 2 - starfighterModule.img.width / 2;
				modulePos.y = hangarCanvas.height / 2 - starfighterModule.img.height / 2 + hangarCanvas.height * 0.2;

				break;	
		}

		ctxH.drawImage(starfighterModule.img, modulePos.x, modulePos.y, starfighterModule.img.width, starfighterModule.img.height);

		////border for debug and aligment
		ctxH.beginPath();
		ctxH.lineWidth = "2";
		ctxH.strokeStyle = "blue";
		ctxH.rect(modulePos.x, modulePos.y, starfighterModule.img.width, starfighterModule.img.height);
		ctxH.stroke();
		}
	}
}


//////////////update and render mounted module/////////////////
function updateModule(moduleType, moduleImgSrc, moduleName){
    hangarStarfighterModules[moduleType].name = moduleName

	ctxH.clearRect(0, 0, hangarCanvas.width, hangarCanvas.height);

	ctxH.beginPath();
	ctxH.rect(0, 0, hangarCanvas.width, hangarCanvas.height);
	ctxH.fillStyle = "white";
	ctxH.fill();
	
	if(moduleImgSrc == null){
		hangarStarfighterModules[moduleType].img = null;

		renderAllModules(hangarStarfighterModules);
	} else {
		hangarStarfighterModules[moduleType].img = new Image();
		hangarStarfighterModules[moduleType].img.src = moduleImgSrc;

		hangarStarfighterModules[moduleType].img.onload = function(){
			renderAllModules(hangarStarfighterModules);
		}
	}
//you can assign modules' names from hangarStarfighterModules object to user_data. Even if field is empty, it has the name of recent module so it's a good start for serious error prevention and general saving of data in 'memory' xD
}


////////Get canvas and prepare object for storing temp user data//////////
let hangarCanvas = document.getElementById('starfighter');
let ctxH = hangarCanvas.getContext('2d');

//canvas dimensions are based on CSS viewport
hangarCanvas.width = window.innerWidth * 0.26;
hangarCanvas.height = window.innerHeight * 0.4;

//canvas background first
//white background for better visibility
ctxH.beginPath();
ctxH.rect(0, 0, hangarCanvas.width, hangarCanvas.height);
ctxH.fillStyle = "white";
ctxH.fill();

//order of this object's attributes determines the order of displaying starfighter's modules. Use this for setting specific 'z-index' of a module
const hangarStarfighterModules = {
    weapon: {
        type: "weapon",
        name: "Weapon_1",
        img: null,
    },
	wings: {
        type: "wings",
        name: "Wings_2",
        img: null,
    },
	engine: {
        type: "engine",
        name: "Engine_2",
        img: null,
    },
    hull: {
        type: "hull",
        name: "Hull_1",
        img: null,
    },
	cockpit: {
        type: "cockpit",
        name: "Cockpit_1",
        img: null,
    },
}
///////////////////////////////////////////////////////////////////////////

//////////Get user data and display available modules on page load///////////
displayEq(assets_list);
getModulesData(hangarStarfighterModules, user_data, assets_list);

for(const [typeKey, starfighterModule] of Object.entries(hangarStarfighterModules)){
    let modulePos = {
        x: 0,
        y: 0,
    }
	
    starfighterModule.img.onload = function(){
		switch (starfighterModule.type){
			case "weapon":

				modulePos.x = hangarCanvas.width / 2 - starfighterModule.img.width / 2;
				modulePos.y = hangarCanvas.height / 2 - starfighterModule.img.height / 2 - hangarCanvas.height * 0.2;
				break;
		
			case "hull":

				modulePos.x = hangarCanvas.width / 2 - starfighterModule.img.width / 2;
				modulePos.y = hangarCanvas.height / 2 - starfighterModule.img.height / 2;
				break;

			case "wings":

				modulePos.x = hangarCanvas.width / 2 - starfighterModule.img.width / 2;
				modulePos.y = hangarCanvas.height / 2 - starfighterModule.img.height / 2;
				break;

			case "cockpit":

				modulePos.x = hangarCanvas.width / 2 - starfighterModule.img.width / 2;
				modulePos.y = hangarCanvas.height / 2 - starfighterModule.img.height / 2 - hangarCanvas.height * 0.2;
				break;

			case "engine":

				modulePos.x = hangarCanvas.width / 2 - starfighterModule.img.width / 2;
				modulePos.y = hangarCanvas.height / 2 - starfighterModule.img.height / 2 + hangarCanvas.height * 0.2;
				break;
		}

        ctxH.drawImage(starfighterModule.img, modulePos.x, modulePos.y, starfighterModule.img.width, starfighterModule.img.height);
		
		////border for debug and aligment
		ctxH.beginPath();
		ctxH.lineWidth = "2";
		ctxH.strokeStyle = "blue";
		ctxH.rect(modulePos.x, modulePos.y, starfighterModule.img.width, starfighterModule.img.height);
		ctxH.stroke();
    }
}
///////////////////////////////////////////////////////////

//////////////Drag and Drop handlers///////////////////////
window.allowDrop = function(e){
    if(e.target.nodeName == "IMG"){
        return	
    } else {
        e.preventDefault();
    }
}

window.drag = function(e){
    e.dataTransfer.setData("text", e.target.id);
}

window.drop = function(e){
    e.preventDefault();
	
    var data = e.dataTransfer.getData("text");
	var srcElementId = document.getElementById(data).parentElement.id

	let moduleName, moduleImgSrc;

	e.target.appendChild(document.getElementById(data));

    //check for empty module slots and assigne 'empty' image
    switch (srcElementId){
        case "tile_weapon":

			if(document.getElementById(srcElementId).childNodes.length == 0){
				moduleName = document.getElementById(data).alt;
				moduleImgSrc = null;

				updateModule('weapon', moduleImgSrc, moduleName);	
			}
            break;

        case "tile_cockpit":

            if(document.getElementById(srcElementId).childNodes.length == 0){
                moduleName = document.getElementById(data).alt;
                moduleImgSrc = null;

                updateModule('cockpit', moduleImgSrc, moduleName);
            }
            break;

        case "tile_hull":

            if(document.getElementById(srcElementId).childNodes.length == 0){
                moduleName = document.getElementById(data).alt;
                moduleImgSrc = null;

                updateModule('hull', moduleImgSrc, moduleName);
            }
            break;

        case "tile_wings":

			
            if(document.getElementById(srcElementId).childNodes.length == 0){
                moduleName = document.getElementById(data).alt;
                moduleImgSrc = null;

                updateModule('wings', moduleImgSrc, moduleName);
            }
            break;

        case "tile_engine":
            if(document.getElementById(srcElementId).childNodes.length == 0){
                moduleName = document.getElementById(data).alt;
                moduleImgSrc = null;

                updateModule('engine', moduleImgSrc, moduleName);
            }
            break;
    }

    //check for new module and display it
    switch (e.target.id){
        case "tile_weapon":

			moduleName = document.getElementById(data).alt;
            moduleImgSrc = document.getElementById(data).src;

            updateModule('weapon', moduleImgSrc, moduleName);
            break;

        case "tile_cockpit":

			moduleName = document.getElementById(data).alt;
            moduleImgSrc = document.getElementById(data).src;

            updateModule('cockpit', moduleImgSrc, moduleName);
            break;

        case "tile_hull":

			moduleName = document.getElementById(data).alt;
            moduleImgSrc = document.getElementById(data).src;

            updateModule('hull', moduleImgSrc, moduleName);
            break;

        case "tile_wings":

			moduleName = document.getElementById(data).alt;
            moduleImgSrc = document.getElementById(data).src;

            updateModule('wings', moduleImgSrc, moduleName);
            break;

        case "tile_engine":

			moduleName = document.getElementById(data).alt;
            moduleImgSrc = document.getElementById(data).src;

            updateModule('engine', moduleImgSrc, moduleName);
            break;
    }	
}

window.redirectToMissionScreen = function(){
	if(
		document.getElementById("tile_weapon").childNodes.length == 0 ||
		document.getElementById("tile_cockpit").childNodes.length == 0 ||
		document.getElementById("tile_hull").childNodes.length == 0 ||
		document.getElementById("tile_wings").childNodes.length == 0 ||
		document.getElementById("tile_engine").childNodes.length == 0
	){
		alert("Your starship is missing some modules!");
	} else {
		window.location.href = "missions_screen.html";
		//window.location.replace();

		/*
		w3schools

		Note: The difference between href and replace, is that replace() removes the URL of the current document from the document history, meaning that it is not possible to use the "back" button to navigate back to the original document.
		
		*/

		//change all links to location.replace() as safety measures
	}
}


//menu window pop up on esc key
document.addEventListener('keydown', event => {
	switch(event.code){
		case "Escape": //esc

			let menuBox = document.getElementById("menu_window");

			if(menuBox.style.visibility == "visible"){
				menuBox.style.visibility = "hidden";

			} else {
				menuBox.style.visibility = "visible";

            }
			break;
			}
		});