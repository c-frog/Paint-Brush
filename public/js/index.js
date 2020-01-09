let testArr = [];
let i = 2;
let record = false;

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
}

function draw() {
  if (mouseIsPressed) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

$("#go").on("click", function() {
  function timeloop() {
    const c = document.getElementById("defaultCanvas0");
    const ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(testArr[i - 2], testArr[i - 1]);
    i += 2;
    ctx.lineTo(testArr[i - 2], testArr[i - 1]);
    ctx.stroke();

    if (i + 1 < testArr.length) {
      setTimeout(timeloop, 10);
    }
  }
  timeloop();
});

$("#clean").on("click", function() {
  i = 2;
  clear();
});

$("#rec").on("click", function() {
  testArr = [];
  i = 2;
  clear();
  let name = prompt("How would you like to name this recording?");
  alert(
    "Please start drawing. The recording will be saved under the name " +
      name +
      ". Once you have finished, you can view your recording by pressing the 'execute' button."
  );
  record = true;
});

$("#saveImage").on("click", function(event) {
  // Make sure to preventDefault on a submit event.
  event.preventDefault();
  
    $.ajax({
      method: "POST",
      url: "/api/images", 
      data: testArr
    })
});
