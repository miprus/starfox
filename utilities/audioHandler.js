import audioAssets_list from "../audioAssets_list.json" assert { type: "json" };

//Function for background music on different screens (e.g.: missions, hangar, etc.)
function createAudioElementBck(src, trackName, loop){
    let audioBck = new Audio(src);
    
    audioBck.preload = "auto";
    audioBck.setAttribute("data-trackName", trackName);

    if(loop === true){
        audioBck.loop = true;
    }

    audioBck.addEventListener("canplaythrough", event => {
        audioBck.play();
    });

    return audioBck;
}


//Function for creating sound effects
function createAudioElementSFX(src, trackName){
    let audioSFX = new Audio(src);

    audioSFX.preload = "auto";
    audioSFX.setAttribute("data-trackName", trackName);

    return audioSFX;
}


//Function for playing sound effects. It has no trigger, therefor it has to be part of other functions/operations
/*
function playSFX(SFXelement){
    console.log(SFXelement);
    SFXelement.cloneNode(true).play();
}
*/


function setAudioUI(){
    var UI_SFX = {};

    audioAssets_list.ui_sfx.forEach(element => {

        switch (element.type){
            case "hover":
                UI_SFX.hoverSFX = {
                    trackName: element.trackName,
                    audio: createAudioElementSFX(element.src, element.trackName),
                }

                break;

            case "click":
                UI_SFX.clickSFX = {
                    trackName: element.trackName,
                    audio: createAudioElementSFX(element.src, element.trackName),
                }
                break;

            case "success":
               
                break;

            case "fail":
               
                break;

        }
    });

    return UI_SFX;
}

function assignSFXevents(UI_SFX){
    document.querySelectorAll('[data-sfxhover="version1"]').forEach(element =>{
        element.addEventListener("mouseenter", function(){
            if(element.getAttribute("data-status") != "active" || element.getAttribute("data-status") === null){
                UI_SFX.hoverSFX.audio.cloneNode(true).play();
            }
        });
    });

    document.querySelectorAll('[data-sfxclick="version1"]').forEach(element =>{
        element.addEventListener("click", function(){
            UI_SFX.clickSFX.audio.cloneNode(true).play();

        });
    });
}

export {createAudioElementBck, createAudioElementSFX, assignSFXevents, setAudioUI};
