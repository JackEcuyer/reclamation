//script for the level selection menu
function levelSelectMenu(){

  //draws all the buttons for the current scene on the screen
  for(b of buttons){
    b.render();
  }

  //draws the cursor on the screen
  image(cursorImg, mouseX, mouseY+30, 80, 80);

}