var db = require("../models");
var path = require("path")
module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  });

  app.get("/saved", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/savedImages.html"))
  })
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};