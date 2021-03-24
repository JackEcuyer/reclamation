//this class has the functionality of setting up individual buttons for the game menu
class Button {

  constructor(text, x, y, w, h, click) {
    this.x = x
    this.y = y
    this.text = text
    this.width = w
    this.height = h
    this.click = click // click stores the code that will be executed once the player has clicked this button
    this.enabled = true
  }

  //this function is executed when the player clicks the screen and checks whether the player mouse is within the area of the button
  clicked() {
    if (this.enabled) {
      // if the player has clicked on the button
      if (mouseX > this.x - this.width / 2 && mouseX < this.x + this.width / 2 && mouseY > this.y - this.height / 2 && mouseY < this.y
      + this.height / 2) {
      this.click() // executes the code of the button stored in click
      }
    }
  }

  //draws the button on the screen
  render() {
    fill(0);
    stroke(37, 255, 255);
    strokeWeight(1);
    rect(this.x, this.y, this.width, this.height);
    noFill();
    textSize(30);
    text(this.text, this.x, this.y + 10);
    noStroke();
  }
}