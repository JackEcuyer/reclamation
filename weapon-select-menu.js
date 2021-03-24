//script for the weapon select menu where the player chooses which of their weapons to equip before they enter a level
function weaponSelectMenu(){

  //draws all the buttons for the current scene on the screen
  for(b of buttons){
    b.render();
  }

  //draws heading on the screen
  textSize(70);
  fill("lightgreen");
  text("Select your Weapons", width/2, 105);

  //stores equipped weapon buttons (clears each loop)
  equippedButtons = [];
  //stores unequipped weapon buttons
  unequippedButtons = [];

  //creates equipped weapon slot buttons based off weapons equipped in slots
  for(var i=0; i< equippedWeapons.length; i++){
    equippedButtons.push(new weaponButton(equippedWeapons[i].name, "lightblue", (740 + i*100 + i*2), 250, "unequip", i))
  }

  //creates unequipped weapon buttons based off weapons unequipped and owned by the player
  for(var i=0; i< ownedWeapons.length; i++){
     //if this owned weapon is not equipped
     if(!checkIfEquipped(ownedWeapons[i])){
      //create a button for the owned weapon
      unequippedButtons.push(new weaponButton(ownedWeapons[i], "lightblue", (500 + unequippedButtons.length*100 + unequippedButtons.length*20), 390, "equip", undefined));
     }
  }

  //draws equipped weapon slots
  for(var i=0; i < equippedButtons.length; i++){
    equippedButtons[i].render();
  }

  //draws unequipped weapon options
  for(b of unequippedButtons){
    b.render();
  }

  //checks if the player should be able to begin the level (if no more spare weapons or if they have 5 equipped)
  if(unequippedButtons.length == 0 || !spareSlotCheck(equippedWeapons,"equip")[0]){
    //add a play button option to the screen
    buttons = [
    new Button("Main Menu", 952.5, 800, 300, 50, () => { gameMode = 'mainMenu'; buttons = mainMenuButtons}),
    new Button("Play", 952.5, 160, 300, 50, () => { gameMode = 'singlePlayerGame'; buttons = inGameButtons; singlePlayerInitialise()})
    ]
  }
  else{
    buttons = weaponSelectButtons;
  }


  //draws the cursor on the screen
  image(cursorImg, mouseX, mouseY+30, 80, 80);

}

//class that creates a weapon button that the player can press to equip/unequip weapon
class weaponButton {

  constructor(weaponName, fill="lightgreen", x, y, type, slotIndex){
    this.x = x;
    this.y = y;
    this.fill = fill;

    //type stores if it is a slot with option of equip or unequip
    this.type = type;

    this.weaponName = weaponName;
    //matches correct weapon sprite to object
    this.sprite = matchWeaponSprite(weaponName);
    this.slotIndex = slotIndex;
  }

  //draws button object
  render(){
    fill(this.fill);
    rect( this.x, this.y, 100, 100);
    if(this.weaponName != null){
      image(weaponSpriteSheetImg, this.x, this.y, this.sprite.sWidth/1.8, this.sprite.sHeight/1.8, this.sprite.sx, this.sprite.sy, this.sprite.sWidth, this.sprite.sHeight);
    }
    if(this.type == "unequip"){
      fill("black");
      textSize(25);
      text(this.slotIndex+1,this.x,this.y+30);
    }
  }

  clickCheck(){

    //if the mouse is within the box when clicked
    if (mouseX > this.x - 50 && mouseX < this.x + 50 && mouseY > this.y - 50 && mouseY < this.y
      + 50) {

        var slotData = spareSlotCheck(equippedWeapons,this.type);

        //if a slot is not empty, give slotdata the index of this button slot
        if(slotData[1] == undefined){
          slotData[1] = this.slotIndex;
        }

        //if weapon is equippable
        if(this.type == "equip"){
          //if there is a spare weapon slot left
          if(slotData[0]){
            //add weapon to player's equipped weapons
            equippedWeapons[slotData[1]].name = this.weaponName;
          }
        }

        //if the weapon is already equipped
        else{

          //remove the weapon from the equippedWeapons
          equippedWeapons[slotData[1]].name = null;
        }
    }
  }

}

//function that returns if a weapon slot is empty and the location of the empty slot
function spareSlotCheck(equippedWeapons,type){

  //if weapon is trying to be equipped
  if(type == "equip"){
    //check if there is a spare slot
    for(var i=0; i<equippedWeapons.length; i++){
      if(equippedWeapons[i].name == null){
        return [true,i];
      }
    }
    return [false];
  }
  //if weapon is being unequipped 
  else{
    return [false];
  }

}

//function that checks if the input weapon type is equipped
function checkIfEquipped(weapon){

  for(w of equippedWeapons){
    //if equipped
    if(w.name == weapon){
      return true;
    }
  }
  return false;
}