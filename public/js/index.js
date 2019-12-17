
let canvas
let ctx
let brush = {
   x: 0,
   y: 0,
   color: 'black',
   size: 5,
   down: false,
}
let strokes = [];
currsentStroke = null;

function redraw () {
   ctx.clearRect(0,0, canvas.width(), canvas.height());
   ctx.lineCap = 'roud';
   for (let i = 0; i < strokes.length; i++) {
      var s = strokes[i];
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.size;
      ctx.beginPath();
      ctx.moveTo(s.points[0].x, s.points[0].y);
      for (let j = 0; j < s.points.length; j++) {
         var p = s.points[j];
         ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
   }
}

function init () {
   canvas = $('#draw');
   canvas.attr({
      width: window.innerWidth,
      height: window.innerHeight,
   });
   ctx = canvas[0].getContext('2d');

   function mouseEvent (event) {
      brush.x = event.pageX;
      brush.y = event.pageY;
      currentStroke.points.push({
         x: brush.x,
         y: brush.y,
      });
      redraw();
   }

   canvas.mousedown(function (e) {
      brush.down = true;
      currentStroke = {
         color: brush.color, 
         size: brush.size,
         points: [],
      };
      strokes.push(currentStroke);
      mouseEvent(e)
   }).mouseup(function(e) {
      brush.down = false;
      mouseEvent(e);
      currentStoke = null;
   }).mousemove(function (e) {
      if (brush.down) mouseEvent(e);
   });

}
init()
=======
// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);