//script for the pause menu scene of the game
function pauseMenu(){

  //draws the pause heading on the screen
  textSize(70);
  fill("lightgreen");
  text("Paused", 952.5, 200);
  
  //draws all the buttons for the current scene on the screen
  for(b of buttons){
    b.render();
  }

  //draws the cursor on the screen
  image(cursorImg, mouseX, mouseY+30, 80, 80);

}
