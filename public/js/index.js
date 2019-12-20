const testArr = [];
const xArr = [126, 129, 156, 134];
const yArr = [45, 28, 124, 400];

function setup() {
  let cnv = createCanvas(640, 480);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
  $("#defaultCanvas0")
    .mousedown(function() {
      timer = setInterval(test, 100);
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
  var c = document.getElementById("defaultCanvas0");
  var ctx = c.getContext("2d");

  ctx.beginPath();
  ctx.moveTo(testArr[0], testArr[1]);
  for (let i = 2; i < testArr.length; i += 2) {
    if (typeof testArr[i + 3] === "number") {
      ctx.lineTo(testArr[i], testArr[i + 1]);
    }
  }
  ctx.stroke();
});

$("#clean").on("click", function() {
  clear();
});
$("#printArr").on("click", function() {
  console.log(testArr);
});

const test = () => {
  testArr.push(mouseX, mouseY);
};
