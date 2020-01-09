let thing = 2;
let record = false;
let testArr = [];
let colorChoice = "black";

const test = () => {
  testArr.push(mouseX, mouseY);
};

function setup() {
  let cnv = createCanvas(640, 480);
  let x = 420;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
  $("#defaultCanvas0")
    .mousedown(function() {
      if (record === true) {
        timer = setInterval(test, 5);
      }
    })
    .mouseup(function() {
      clearInterval(timer);
      record = false;
    });
  let c = document.getElementById("defaultCanvas0");
  let ctx = c.getContext("2d");
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'black';
}

function draw() {
  if (mouseIsPressed) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

$("#executeBtn").on("click", function() {
  console.log(testArr)
  function timeloop() {
    const c = document.getElementById("defaultCanvas0");
    const ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(testArr[thing - 2], testArr[thing - 1]);
    thing += 2;
    ctx.lineTo(testArr[thing - 2], testArr[thing - 1]);
    ctx.stroke();

    if (thing + 1 < testArr.length) {
      setTimeout(timeloop, 10);
    }
  }
  timeloop();
});

$("#clean").on("click", function() {
  thing = 2;
  clear();
});

$("#rec").on("click", function() {
  testArr=[];
  thing=2;
  clear();
  let name = prompt("How would you like to name this recording?");
  if(name.length === 0){alert("Image Name Required To Save. Please Try Again")}else{
  alert("Please start drawing. The recording will be saved under the name " + name +". Once you have finished, you can view your recording by pressing the 'execute' button." )
  record = true;}
})


$("#saveImage").on("click", function(event) {
  // Make sure to preventDefault on a submit event.
  event.preventDefault();
  
    $.ajax({
      method: "POST",
      url: "/api/images", 
      data: testArr
    })
});


$("#saveImg").on("click", function(){
  // console.log("eyy")
  // var image = new Image();
  // var base64Stream = document.getElementById("defaultCanvas0").toDataURL("image/jpg")
  // .replace("image/jpg", "image/octet-stream");
  // image.src= base64Stream;
  // $("#imgTests").append(image);
  // console.log(image);
  // console.log(testArr.length);
})

$(".colorTag").on("click", function(){
  let c = document.getElementById("defaultCanvas0");
  let ctx = c.getContext("2d");
  colorChoice = $(this).attr("id");
  let colorArr = ["red", "orange", "yellow", "green", "blue", "purple", "black"]
  for(var i = 0; i < colorArr.length; i++){
    if(colorArr[i] === colorChoice){
      ctx.strokeStyle = colorChoice;
    }}
})

