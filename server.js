// DEPENDENCIES
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

// STATIC CONTENT
app.use(express.static("public"));

// DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//LISTENER
app.listen(PORT, function() {
   console.log("Server listening on: http://localhost:" + PORT)
});