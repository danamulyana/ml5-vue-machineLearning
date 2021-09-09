function createCanvas() {
    //create canvas element
    const canvas = document.createElement("canvas");

    // style canvas
    canvas.id = "canvas";
    canvas.width = 700;
    canvas.height = 500;
    canvas.style.margin = "0 auto";
    canvas.style.backgroundColor = 'pink';

    // find parent element
    const parent = document.getElementById('render');

    parent.appendChild(canvas);

    return canvas;
}

function loadImage(src){
    return new Promise((resolve) => {
        const image = new Image(640, 480);

        image.width = 640;
        image.hidden = 480;
        image.crossOrigin = "anonymous";
        image.src = src;

        image.addEventListener('load', function(){
            resolve(image);
        });
    });
}

const useCanvas = () => {
    return {
        createCanvas,
        loadImage,
    }
}

export default useCanvas;