let testArr = [];
let i = 2;

function setup() {
  let cnv = createCanvas(640, 480);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
  $("#defaultCanvas0")
    .mousedown(function() {
      timer = setInterval(test, 5);
    })
    .mouseup(function() {
      clearInterval(timer);
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

$("#noArr").on("click", function() {
  testArr = [];
});

$("#clean").on("click", function() {
  i = 2;
  clear();
});
$("#printArr").on("click", function() {
  console.log(testArr);
});

const test = () => {
  testArr.push(mouseX, mouseY);
};
