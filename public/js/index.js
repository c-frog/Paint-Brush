const testArr=[];



 function setup() {
  let cnv = createCanvas(640, 480);
  let x = (windowWidth - width) /2;
  let y = (windowHeight - height) /2;
  cnv.position(x,y);
  
}

function draw() {
  if (mouseIsPressed) {
   test();
      fill(0);
    line(mouseX, mouseY, pmouseX, pmouseY);
  } 
  
}


$("#test").on("click", function(){
  const uniqueSet = new Set(testArr);
  const backToArr=[...uniqueSet];
  console.log(backToArr);
})


const test=()=>{
  testArr.push(mouseX + ":" +mouseY);
}