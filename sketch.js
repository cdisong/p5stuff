var font;
var vehicles = [];

function preload() {
  font = loadFont('z.ttf');
}

function setup() {
  createCanvas(600,600);
  background(51);
//   textFont(font);
//   textSize(128);
//   fill(255);
//   noStroke();
  //   text('word', 10, 200);
  
  var points = font.textToPoints('WoRd', 10, 200, 190);
  
  
  for (var i = 0; i < points.length; i++) {
      var pt = points[i];
      let vehicle = new Vehicle(pt.x, pt.y);
      vehicles.push(vehicle);
    //   stroke(255);
    //   strokeWeight(4);
    //   point(pt.x, pt.y);
  } 
}


function draw(){ 
    background(51); 
    for (let i = 0; i < vehicles.length; i++) {
        let v = vehicles[i]; 
        v.behaviors();
        v.update();
        v.show();
    }
}