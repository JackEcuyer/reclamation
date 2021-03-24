//script for the main menu scene of the game
function mainMenu(){
  
  //draws all the buttons for the current scene on the screen
  for(b of buttons){
    b.render();
  }

  //draws the menu heading on the screen
  textSize(70);
  fill("lightgreen");
  text("Reclamation", 952.5, 200);

  //draws the cursor on the screen
  image(cursorImg, mouseX, mouseY+30, 80, 80);
}