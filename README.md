# Flint'z Skinz

## Overview and User Story

This is a fairly simple "paint-brush" style doodling app. With it users can choose the color they want to paint with, and draw on the canvas. The advanced functionality allows for the saving of their work to a database, and the loading of "images" from the database in a way that simulated stop-motion animation.

User Story:
I AM a person with creative urges. 
I WANT a simple, quick way to express myself
SO THAT I can relax and regain effectiveness for my other tasks

## Functionality

The UI is fairly simple: a color palet above a canvas, and a set of buttons to the left. If none of the buttons on the left are clicked, the user can draw freely on the canvas, including changing colors (the drawing will occur in the color currently selected).
If the user clicks the "record" button, an alert will direct the user to input a name for the recording. Then, the user can pick a color, and once they start drawing, the recording functionality triggers: as long as the mouse is pressed, the mouse coordinates are pushed to an array 20 times/second. Once the user has finished recording (stopped pressing the button), the coordinates can be used to recreate the drawing as a video. Pressing the "Clear" button will clear the canvas. Pressing the "Play" button will trigger a function that draws lines to the coordinates saved in the array. This function will trigger 10 times/second, so visually it looks like the drawing is being recreated as an animation. Clicking the "Save" button will save the coordinates array and the selected color to a SQL database. Clicking the "Load" button will open a modal that will dynamically present all "videos" stored in the database. Clicking on one of those will load the coordinates and color of it, allowing for replay. The "Download" button opens a modal that allows the user to download their image (as a still) to their computer. Finally, clicking the "Random BG" button will trigger an API call that will randomize the background image on which the doodles take place.

## Technologies, Libraries, and API's used

This app utilizes the HTML 5 Canvas technology for its main functionality. It also uses jQuery, Materialize CSS, p5.js libraries, and Unsplash API.

## Deployed Link

https://flintz-skinz-2.herokuapp.com/
