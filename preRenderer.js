function preRenderObject(imgSrc, imgWidth, imgHeight){
    //...R suffix is used to indicate variable used for pre-rendering operations
    //create offscreen canvas
	let canvasR = document.createElement("canvas");
	let ctxR = canvasR.getContext("2d");

    //load image based on provided source (file path) 
	let imgR = new Image();
	imgR.src = imgSrc;

    //set offscreen canvas size to match given image's height and width
	canvasR.width = imgWidth;
	canvasR.height = imgHeight;

	//ctxR.save();

    //draw given image using provided source (file path) and dimensions. The draw function will only be called after an image is loaded to prevent any errors in case of heavier sprites 
	imgR.onload = function(){
		ctxR.drawImage(imgR, 0, 0, imgWidth, imgHeight);
	}

	//ctxR.restore();

	return canvasR;
}

function preRenderList(objectData){
    //create an array that will be returned by function, containing individual object's name and image (sprite);
    let objectList = [];

    //loop through each provided object and extract necessary properties for pre-rendering operation. Then push each object into created earlier array.
	objectData.forEach(object => {
		let newObjectImg = preRenderObject(object.src, object.width, object.height);
		objectList.push({name : object.name, img : newObjectImg});
	});

    return objectList;
}

export {preRenderList};