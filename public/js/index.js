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