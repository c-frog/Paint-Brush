let thing = 2;
let record = false;
let testArr = [];
const modal = document.getElementById("myModal");
const btn = document.getElementById("modalOpen");
const span = document.getElementsByClassName("close")[0];
let recorded = false;
let name;
let cnv;
let colorChoice;

//a simple function that when fired pushes the mouse coordinates into an array
const test = () => {
  testArr.push(mouseX, mouseY);
};

//a function that helps regulate canvas size and position in relation to the screen size
function canvasCenter() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 3;
  cnv.position(x, y);
}

//a function required by p5.js to activate the "draw" function. We added to it: this function sets up the canvas, including size. We added to it a pseudo-listener that checks if the user wants to record, and if so, fires the recording function.
function setup() {
  cnv = createCanvas(640, 480);
  canvasCenter();
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
  ctx.strokeStyle = "black";
}

//p5.js's main function:makes the canvas refresh 60 times/second. In this instance, if the mouse is pressed inside the canvas, a line is drawn.
function draw() {
  if (mouseIsPressed) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

//out download image functionality. The commented out code is an attempt at generating a QR code that we didn't finish.
function qr() {
  $("#canvasStyle").html("<style>canvas {display: none;}</style>");
  let x = document.getElementById("defaultCanvas0").toDataURL("image/jpg");
  modal.style.display = "block";
  $("#loadBtns").html(
    "<style>.modal-stuff{background: #29b6f6;width:40%;padding:40px;}</style><div id='downloadModal'><a id='png' href='" +
      x +
      "' download='drawing.png'>Download PNG</a><img id='thumbnail' src='" +
      x +
      "'></div>"
  );
  // let data = "";
  // const QRsettings = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": "https://qrcode3.p.rapidapi.com/generateQR?fill_style=solid&ec_level=M&format=svg&text="+data,
  //   "method": "GET",
  //   "headers": {
  //     "x-rapidapi-host": "qrcode3.p.rapidapi.com",
  //     "x-rapidapi-key": "50c3507768mshd3e33ce09a430eap1fae7ajsnab00c9f6c026"
  //   }}
  // $.ajax(QRsettings).done(function (resp) {
  //   console.log(resp);
  // });
}

//a recursive function (like a manual loop) that draws a line between inputed coordinates. The coordinates array is used. This function is currently set to fire 100 times/second, creating the illusion of a video.
$("#executeBtn").on("click", function() {
  function timeloop() {
    console.log(testArr);
    const c = document.getElementById("defaultCanvas0");
    const ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = colorChoice;
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

//simple function that clears the canvas and resets the iterator for the video
$("#clean").on("click", function() {
  thing = 2;
  clear();
});

//a function that triggers the recording functionality by changing a boolean. Also prompts users for a name that will later be used to store the drawing to the db.
$("#rec").on("click", function() {
  recorded = true;
  $("#saveImage").attr("style", "background: #29b6f6;color: white;");
  testArr = [];
  thing = 2;
  clear();
  name = prompt("How would you like to name this recording?");
  if (name.length === 0) {
    alert("Image Name Required To Save. Please Try Again");
  } else {
    alert(
      "Please start drawing. The recording will be saved under the name " +
        name +
        ". Once you have finished, you can view your recording by pressing the 'play' button. If you would like to save your recording to the database, click the 'save' button."
    );
    record = true;
  }
});

//a function that passes the saved data to the database when the save button is clicked
$("#saveImage").on("click", function(event) {
  if (recorded === true) {
    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "/api/images",
      data: {
        name: name,
        coordinates: JSON.stringify({ array: testArr }),
        color: colorChoice
      }
    });
  }
});

$("#downloadBtn").on("click", function() {
  qr();
});

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  $("#canvasStyle").html("<style>canvas {display: block;}</style>");
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    $("#canvasStyle").html("<style>canvas {display: block;}</style>");
  }
};

$("#modalOpen").on("click", function(ev) {
  $("#canvasStyle").html("<style>canvas {display: none;}</style>");
  //extra security on modal reset...
  $("#loadBtns").html("");
  ev.preventDefault();
  console.log("test1")
  $.ajax({
    method: "GET",
    url: "/api/images"
  }).then(function(res) {
    //dynamically creates the buttons to be displayed with data attributes to store the data from the db
    $("#loadBtns").html("");
    for (let i = 0; i < res.length; i++) {
      console.log("test2: " + i)
      
       let loadBtn = $("<button>");
       let dataCoord = JSON.parse(res[i].coordinates);
       loadBtn.text(res[i].name);
       loadBtn.attr("class", "toolBtn retBtn");
       loadBtn.attr("data-coord", dataCoord.array);
       loadBtn.attr("data-color", res[i].color);
       $("#loadBtns").append(loadBtn);
    }
    
  });
});

$(document).on('click', '.retBtn', function() {
event.stopPropagation();
  testArr = [];
  colorChoice = event.target.attributes[2].nodeValue;
  let returnData = event.target.attributes[1].nodeValue;
  let newArrOne = returnData.split(",");
  for (let j = 0; j < newArrOne.length; j++) {
    testArr.push(parseFloat(newArrOne[j]));
  }
});
// $(".retBtn").on("click", function() {
  
// });

//handles color selection for the line being drawn
$(".colorTag").on("click", function() {
  let c = document.getElementById("defaultCanvas0");
  let ctx = c.getContext("2d");
  colorChoice = $(this).attr("id");
  let colorArr = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "black"
  ];
  for (var i = 0; i < colorArr.length; i++) {
    if (colorArr[i] === colorChoice) {
      ctx.strokeStyle = colorChoice;
    }
  }
});

//external API call that puts a random background image
$("#testBack").on("click", function(event) {
  event.preventDefault();
  $("canvas").css("background", "url(https://source.unsplash.com/random)");
});
