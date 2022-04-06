let img;
    function preload() {
    img = loadImage('https://xabelian.github.io/VisualComputing/sketches/original.jpg');
    }

    function setup() {
    createCanvas(404, 402);
    image(img, 0, 0, width, height);
    let d = pixelDensity();
    loadPixels();
            for (var y = 0; y < height*4; y++) {
                for (var x = 0; x < width; x++) {
                var index = (x + y * width)*4;
                var r = pixels[index+0];
                var g = pixels[index+1];
                var b = pixels[index+2];
                var a = pixels[index+3];     
                
                if (g > 80){
                    pixels[index+2] = b+70
                    //pixels[index+1] = g-40
                }

                
            }
        }
    updatePixels();
}