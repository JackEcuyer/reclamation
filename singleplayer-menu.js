//script for the singleplayer menu scene of the game
function singlePlayerMenu(){

  //draws all the buttons for the current scene on the screen
  for(b of buttons){
    b.render();
  }

  //draws the menu heading on the screen
  textSize(70);
  fill("lightgreen");
  text("Singleplayer", 952.5, 200);
  
  //draws the cursor on the screen
  image(cursorImg, mouseX, mouseY+30, 80, 80);
}