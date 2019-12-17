
 function setup() {
  let cnv = createCanvas(640, 480);
  let x = (windowWidth - width) /2;
  let y = (windowHeight - height) /2;
  cnv.position(x,y);
  
}

function draw() {
  if (mouseIsPressed) {
      fill(0);
    line(mouseX, mouseY, pmouseX, pmouseY);
  } 
  
}