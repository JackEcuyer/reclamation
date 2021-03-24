//used for shop button organisation
var yPos = 200;

function shopMenu(){

  //draws all the general buttons for the current scene on the screen
  for(b of buttons){
    b.render();
  }

  //draws player currency at top of screen
  fill("lightyellow")
  rect(width/2, 50, 400, 100);
  fill("blue");
  text("Your Balance:",width/2, 40);
  text("£"+currentMoney, width/2, 70);

  shopButtons = [];

  //creates shop buttons for weapons that the player doesn't own
  for(weapon of weaponTypes){

    if(ownedWeapons.includes(weapon.type)){
      //weapon already owned
      weapon.owned = true;
    }

    //create shop button
    shopButtons.push( new shopButton(weapon,500,200));

  }

  //organises shop buttons across the screen in rows
  for(var i=0; i < shopButtons.length; i++){
    shopButtons[i].x = (200 + (i)*100 + (i)*250);

    if(i >= 5){
      shopButtons[i].y = 450;
      shopButtons[i].x = (200 + (i-5)*100 + (i-5)*250);
    }
    if(i >= 10){
      shopButtons[i].y = 700;
      shopButtons[i].x = (200 + (i-10)*100 + (i-10)*250);
    }


  }

  for(button of shopButtons){
    button.renderWeaponButton();
    button.renderAmmoButton();
  }

  //draws the cursor on the screen
  image(cursorImg, mouseX, mouseY+30, 80, 80);

}

//class that creates a shop button that the player can use to purchase a weapon or ammo for the weapon
class shopButton{

  constructor(weapon,x,y){ 
    
    this.x = x;
    this.y = y;

    this.weapon = weapon;

    //matches weapon name to its correct weapon sprite
    this.sprite = matchWeaponSprite(weapon.type);

    //matches correct ammo type to the weapon name
    this.ammo = matchAmmoType(weapon.bullet); 
  }

  renderWeaponButton(){

    //draw weapon image in a box
    fill("lightgreen");
    rect( this.x, this.y, 100, 100);
    image(weaponSpriteSheetImg, this.x, this.y, this.sprite.sWidth/1.8, this.sprite.sHeight/1.8, this.sprite.sx, this.sprite.sy, this.sprite.sWidth, this.sprite.sHeight);

  
    //draw buy box option
    fill("lightblue")
    rect( this.x + 110, this.y, 120, 100);
    fill("blue");
    if(this.weapon.owned == undefined){
      text("BUY", this.x + 110, this.y-10);
      text("£" + this.weapon.price, this.x + 110, this.y+20);
    }
    else{
      fill("red");
      text("OWNED", this.x + 110, this.y);
    }
    fill("lightgreen");
  }

  weaponBuyClickCheck(){
    if (mouseX > this.x + 50 && mouseX < this.x + 170 && mouseY > this.y - 50 && mouseY < this.y + 50) {
      //buy weapon if player has enough money and they don't already own the weapon
      if(this.weapon.owned == undefined){
        if(currentMoney >= this.weapon.price){
          ownedWeapons.push(this.weapon.type);
          currentMoney -= this.weapon.price;
        }
      }
    }
  }

  renderAmmoButton(){
    
    //draw box for ammo buy option
    fill("lightyellow");
    rect(this.x+60, this.y + 100, 220, 90);
    fill("blue");
    text(this.ammo.type, this.x+60, this.y + 95);
    text("Buy x30 £" + this.ammo.price, this.x+60, this.y + 130);
  }

  ammoBuyClickCheck(){
    if (mouseX > this.x - 50 && mouseX < this.x + 170 && mouseY > this.y + 52 && mouseY < this.y + 140) { 
      //buy ammo if player has enough money 
      if(currentMoney >= this.ammo.price && this.ammo.type != "9mm"){

        for(var i=0; i < ownedAmmo.length; i++){
          if(ownedAmmo[i].type == this.ammo.type){
            ownedAmmo[i].amount += 30;
            currentMoney -= this.ammo.price;
          }
        }
      }
    }
  }

}

//function that matches ammo type to weapon name
function matchAmmoType(weaponBullet){
  
  for(ammo of bulletTypes){
    if(ammo.type == weaponBullet){
      return ammo;
    }
  }
}
