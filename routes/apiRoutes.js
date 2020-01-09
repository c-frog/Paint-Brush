var db = require("../models");

module.exports = function(app) {
  // Get all images
  app.get("/api/images", function(req, res) {
    db.Images.findAll({}).then(function(dbImages) {
      res.json(dbImages);
    });
  });

  // Create a new image
  app.post("/api/images", function(req, res) {
    db.Images.create(req.body).then(function(dbImages) {
      res.json(dbImages);
    });
  });
  
  // Get a single image
  app.get("/api/images/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbImage) {
      res.json(dbImage);
    });
  });

  // Delete an image by id
  app.delete("/api/images/:id", function(req, res) {
    db.Images.destroy({ where: { id: req.params.id } }).then(function(dbImages) {
      res.json(dbImages);
    });
  });
};
