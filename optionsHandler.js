import user_data from "./user/user_data.json" assert { type: "json" }; 

//debug
//localStorage.removeItem('user_data');
//////////////////

//check if user data has been saved locally, if not - create one, otherwise retrive it
const local_user_data = localStorage.getItem('user_data') 
    ? JSON.parse(localStorage.getItem('user_data')) 
    : (localStorage.setItem('user_data', JSON.stringify(user_data)), JSON.parse(localStorage.getItem('user_data')));

    //debug
    //console.log(local_user_data);
    //////////////////

//populate Option window
function displayOptions(local_user_data){
    for(const [actionName, keyCode] of Object.entries(local_user_data.keyBindings)){

        //<label for="opt1">Option 1:</label>
        //<input type="text" id="opt1" name="opt1">

        let bindingOptLabel = document.createElement('label');
            bindingOptLabel.setAttribute("for", actionName);
            bindingOptLabel.innerHTML = actionName;

        let bindingOptInput = document.createElement('input');
            bindingOptInput.setAttribute("type", "text");
            bindingOptInput.setAttribute("id", actionName);
            bindingOptInput.setAttribute("name", keyCode);
            bindingOptInput.setAttribute("value", keyCode);
            bindingOptInput.setAttribute("onfocus", "keyBindStart(this)");
            bindingOptInput.setAttribute("onblur", "keyBindEnd(this)");

            document.getElementById("options_section").appendChild(bindingOptLabel);
            document.getElementById("options_section").appendChild(bindingOptInput);
    }
}



displayOptions(local_user_data);


///////////////key binding option handler//////////////////
window.keyBindStart = function(keyBindInput){
    keyBindInput.value = "Press key";
    //add change style of value text

    keyBindInput.addEventListener('keyup', event => {
        keyBindInput.value = event.code;
        local_user_data.keyBindings[keyBindInput.id] = event.code;
    });
}


window.keyBindEnd = function(keyBindInput){
    if(keyBindInput.value == ""){
        keyBindInput.value =  local_user_data.keyBindings[keyBindInput.id];
    }
}


window.saveOptions = function(){
    local_user_data.keyBindings.move_up = document.getElementById("move_up").value;
    local_user_data.keyBindings.move_down = document.getElementById("move_down").value;
    local_user_data.keyBindings.move_left = document.getElementById("move_left").value;
    local_user_data.keyBindings.move_right = document.getElementById("move_right").value;
    local_user_data.keyBindings.shoot = document.getElementById("shoot").value;
    local_user_data.keyBindings.pause = document.getElementById("pause").value;

    //update local storage
    localStorage.setItem('user_data', JSON.stringify(local_user_data));
}

//document.getElementById("option_btn").addEventListener("click", window.showOptionsMenu);

window.showOptionsMenu = function(){
    document.getElementById("menu_window").style.display = "none";
    document.getElementById("options_window").style.display = "initial";
}

window.showMainMenu = function(){
    document.getElementById("options_window").style.display = "none";
    document.getElementById("menu_window").style.display = "initial";
}