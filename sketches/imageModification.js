let img;
function preload() {
  img = loadImage('https://hips.hearstapps.com/hbu.h-cdn.co/assets/17/04/1600x800/landscape-foliage-color-blindness-1.jpg?resize=980:*');
}

function setup() {
  createCanvas(747, 373);
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
                pixels[index+0] = r+70
              }

              
        }
      }
  updatePixels();
}