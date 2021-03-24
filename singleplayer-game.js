//script for the singleplayer gameplay mode

//this function is executed once when the player chooses a level on singleplayer, to initialise variables.
function singlePlayerInitialise(){

  floorHeight = 800;
  player = new Player(0, floorHeight-50);
  currentBullets = [];
  currentEnemies = [];
  timeLastFired = 0;
  reloadStartTime = 0;
  currentlyReloading = false;

}

//this function is executed every draw loop to update the level
function singlePlayerUpdate(){

  // //if health goes to 0 return to main menu
  // if(player.health <= 0){
  //   gameMode = "mainMenu";
  //   buttons = mainMenuButtons;
  // }

  //checks the current level that the player has selected and generates the level from the corresponding level function
  switch(currentLevel){

    case 1:  generateLevel1();
      break;
      
  }

  //draws all the buttons for the current scene on the screen
  for(b of buttons){
    b.render();
  }

  //draws the floor of the level
  fill("lightgreen");
  rect(width/2, floorHeight+7.5, 1905, 15);

  //updates and draws the current bullets on the screen by looping through each bullet in the array
  for(var i=0; i <= currentBullets.length-1 ; i++){

    currentBullets[i].collisionCheck();

    //removes bullets from the game if they are off the canvas / hit the floor
    if(currentBullets[i].x > 1930 || currentBullets[i].x < -30  || currentBullets[i].y > floorHeight || currentBullets[i].y < -30){
      currentBullets.splice(i,1);
    }

    //removes bullets from the game if they have collided with their target
    else if(currentBullets[i].destroyed){
      currentBullets.splice(i,1);
    }

    else{
      //if they are on the canvas, they are updated and drawn
      currentBullets[i].update();
      currentBullets[i].render();
    }
  }

  //updates and draws the current enemies on the screen by looping through each bullet in the array
  for(var j=0; j <= currentEnemies.length-1; j++){

    //removes enemies from the game once they reach 0 health
    if(currentEnemies[j].health <= 0){
      //rewards player with cash for killing enemy
      currentMoney += currentEnemies[j].reward;
      currentEnemies.splice(j,1);
    }

    else{ 
      
      //updates the enemy
      currentEnemies[j].travelDistanceCheck();

      //renders the enemy
      currentEnemies[j].render();
      
    }
  }

  //checks for specific key presses
  if(keyIsDown(65)){ //if 'a' key is pressed
    player.left(); //player moves left
  }

  if(keyIsDown(68)){ //if 'd' key is pressed
    player.right(); //player moves right
  }

  if(keyIsDown(87) || keyIsDown(32)){ //if 'w' or space is pressed
    if(player.y == floorHeight-50){ // and the player is on the floor
      player.jumping = true; // player jumps
    }
  }

  //weapon slot switching
  if(keyIsDown(49)){
    changeWeaponSlot(0);
  }
  if(keyIsDown(50)){
    changeWeaponSlot(1);
  }
  if(keyIsDown(51)){
    changeWeaponSlot(2);
  }
  if(keyIsDown(52)){
    changeWeaponSlot(3);
  }
  if(keyIsDown(53)){
    changeWeaponSlot(4);
  }


  //Reload Mechanic
  if(keyIsDown(82) || currentlyReloading || equippedWeapons[currentWeaponSlot].ammoInMag == 0){ //if 'r' is pressed or player is  currently reloading or auto reloads if a setting

    //finds the corresponding weapon type from the currently equipped weapon
    let weapon = matchWeaponType(equippedWeapons[currentWeaponSlot])

        //finds the correct ammo type for the weapon the player has equipped
        for(ammo of ownedAmmo){
          if(ammo.type == weapon.bullet) {

            //checks if the mag isn't full and is available to reload
            if( equippedWeapons[currentWeaponSlot].ammoInMag < weapon.magSize ){

              //checks if the player has enough ammo left to fully reload the magazine
              if( weapon.magSize - equippedWeapons[currentWeaponSlot].ammoInMag <= ammo.amount){


                //sets the start time of the reload for reload delay reference
                if(!currentlyReloading){
                  reloadStartTime = millis();
                }

                currentlyReloading = true;

                //waits the reload time of the weapon before performing the reload
                if( millis() - reloadStartTime > weapon.reloadSpeed * 1000 || reloadStartTime == 0){

                  //takes away the ammo from the players spares that is going to be used
                  ammo.amount -= weapon.magSize - equippedWeapons[currentWeaponSlot].ammoInMag;

                  //fully reloads the magazine
                  equippedWeapons[currentWeaponSlot].ammoInMag = weapon.magSize;
                  console.log("Player reloaded " + weapon.type + " magazine fully with " + (weapon.magSize - equippedWeapons[currentWeaponSlot].ammoInMag) + " spare " + ammo.type + " bullets.");

                  currentlyReloading = false;

                }
              }

              //special case for weapons with unlimited ammo to fully reload 
              else if( ammo.amount == "unlimited" ){

                //sets the start time of the reload for reload delay reference
                if(!currentlyReloading){
                  reloadStartTime = millis();
                }

                currentlyReloading = true;

                //waits the reload time of the weapon before performing the reload
                if( millis() - reloadStartTime > weapon.reloadSpeed * 1000 || reloadStartTime == 0){

                  //fully reloads the magazine
                  console.log("Player reloaded " + weapon.type + " magazine fully with " + (weapon.magSize - equippedWeapons[currentWeaponSlot].ammoInMag) + " spare " + ammo.type + " bullets.");
                  equippedWeapons[currentWeaponSlot].ammoInMag = weapon.magSize;                  

                  currentlyReloading = false;

                }

              }

              //if the player doesn't have enough to fully reload the magazine but has a small amount spare, use the last bit of ammo to partially reload the magazine
              else if( ammo.amount > 0 ){ 

                //sets the start time of the reload for reload delay reference
                if(!currentlyReloading){
                  reloadStartTime = millis();
                }

                currentlyReloading = true;
   
                //waits the reload time of the weapon before performing the reload
                if( millis() - reloadStartTime > weapon.reloadSpeed * 1000 || reloadStartTime == 0){

                  //fully reloads the magazine
                  console.log("Player reloaded " + weapon.type + " magazine fully with " + (weapon.magSize - equippedWeapons[currentWeaponSlot].ammoInMag) + " spare " + ammo.type + " bullets.");
                  equippedWeapons[currentWeaponSlot].ammoInMag += ammo.amount;               

                  //takes away the final bit of ammo from the players spares that was used
                  ammo.amount = 0

                  currentlyReloading = false;

                }

              }
            }
          }
        }  
  }

  //Shooting Mechanic 
  if(mouseIsPressed && !currentlyReloading){ //if the mouse button is being held down and the player isnt reloading

    //finds the corresponding weapon type from the currently equipped weapon
    let weapon = matchWeaponType(equippedWeapons[currentWeaponSlot])

        //finds the correct ammo type for the weapon the player has equipped
        for(ammo of ownedAmmo){
          if(ammo.type == weapon.bullet) {

            //checks the player has enough ammo to shoot weapon
            if(equippedWeapons[currentWeaponSlot].ammoInMag > 0 || equippedWeapons[currentWeaponSlot].ammoInMag == "unlimited") {

              //checks if enough time has passed since last bullet was fired for weapon to shoot
              if(millis() - timeLastFired >= weapon.fireRate * 1000 || timeLastFired == 0){

                //adds a new bullet into the game that is travelling towards the position the player clicked at
                let mouseVector = getMouseVector() //get the direction that the bullet needs to travel in
                currentBullets.push(new Bullet(width/2 , player.y, mouseVector.x, mouseVector.y, ammo.type, 'enemy')); //add bullet to array with its type
                //initialises properties of the new bullet
                currentBullets[currentBullets.length-1].calculateTypeStats();

                //updates time last bullet was fired
                timeLastFired = millis();

                //takes a bullet away from the bullets in the weapon magazine
                equippedWeapons[currentWeaponSlot].ammoInMag -= 1
              }
            }
          }
        }   
  }

  //draws the player HUD  

    //Health Bar
    textSize(20);
    fill("white");
    text("Health ❤️️", 180, 40); //text above bar
    fill("black");
    rect(180, 60, 296, 25); //background of bar
    fill("red");
    rect(180, 60, 290, 20); //behind green health to show health lost
    fill("green");
    rectMode(CORNER);
    //green health bar length is dependant on the player's current health
    rect(35, 50, (290 * (player.health/1000)), 20);
    rectMode(CENTER);
    textSize(14);
    fill("white");
    text(player.health + ' / 1000', 180, 65);

    //Weapon Info
      //getting weapon info
      let weapon = matchWeaponType(equippedWeapons[currentWeaponSlot]);
      let weaponSprite = matchWeaponSprite(equippedWeapons[currentWeaponSlot].name);

      //render image of weapon
      image(weaponSpriteSheetImg, 450, 70, weaponSprite.sWidth*1.5, weaponSprite.sHeight*1.5, weaponSprite.sx, weaponSprite.sy, weaponSprite.sWidth, weaponSprite.sHeight);

      //Display weapon name, ammo left in mag and spare ammo remaining
      textSize(30);
      textAlign(LEFT);
      text(equippedWeapons[currentWeaponSlot].name, 580, 45);

      //display infinite for weapon with unlimited ammo
      if(matchBulletType(equippedWeapons[currentWeaponSlot]).amount == "unlimited"){
        text("Spare: ∞" , 580, 75);
      }
      //otherwise display amount of spare ammo
      else{
        text("Spare: " + matchBulletType(equippedWeapons[currentWeaponSlot]).amount , 580, 75);
      }

      textSize(40);
      textAlign(CENTER);
      text(equippedWeapons[currentWeaponSlot].ammoInMag + "/" + weapon.magSize, 480, 105);

    //Weapon Slots
      //loops through players equipped weapons 
      for(var i=0; i < equippedWeapons.length; i++){

        fill("lightblue");
        stroke("black");
        strokeWeight(1);

        //if weapon slot is equipped highlights box
        if(currentWeaponSlot == i){
          fill(37, 255, 255);
          strokeWeight(3);
        }

        //draw box for weapon sprite to be inside
        rect( 800 + (i*80) + (i*2), 55, 80, 80);

        //draw weapon sprite of slot inside box if weapon is inside
        if(equippedWeapons[i].name != null){
          let weaponSprite = matchWeaponSprite(equippedWeapons[i].name);
          image(weaponSpriteSheetImg, 800 + (i*80) + (i*2), 50, weaponSprite.sWidth/1.8, weaponSprite.sHeight/1.8, weaponSprite.sx, weaponSprite.sy, weaponSprite.sWidth, weaponSprite.sHeight);
        }

        //draw number of weapon slot below box
        strokeWeight(0);
        fill("black");
        textSize(25);
        text(i+1, 800 + (i*80), 90);
        
      }


  //alerts the player if they need to reload
  if(equippedWeapons[currentWeaponSlot].ammoInMag <= 0 && !currentlyReloading){
    fill("yellow");
    textSize(30);
    text("Press 'R' to Reload or Switch Weapon", 540, 150);
  }
  //shows player that they are in the process of reloading and how much time is left till their reload is complete
  else if(currentlyReloading){
    fill("yellow");
    textSize(30);
    let weapon = matchWeaponType(equippedWeapons[currentWeaponSlot]);
    text("Reloading in " + Math.round( weapon.reloadSpeed - ((millis() - reloadStartTime) / 1000)) + "...", 540, 150);  
  }
 
  //updates and draws the player object
  player.update();
  player.render();

  //draws the player crosshair at the position their mouse is aiming
  image(defaultCrosshair, mouseX, mouseY, 30, 30);

}

//function that matches the player's currently equipped weapon to the corresponding weapon type
function matchWeaponType(equippedWeapon){

  for( weapon of weaponTypes){
    if(weapon.type == equippedWeapon.name){
      return weapon;
    }
  }
}

//function that matches the player's currently equipped weapon's bullet type to the corresponding owned bullet element
function matchBulletType(equippedWeapon){

  let weapon = matchWeaponType(equippedWeapons[currentWeaponSlot]);

  for(ammo of ownedAmmo){
    if(ammo.type == weapon.bullet){
      return ammo;
    }
  }
}

//function that matches the input weapon name to it's corresponding weapon sprite
function matchWeaponSprite(name){

  for(sprite of weaponSprites){
    if(sprite.name == name){
      //sets default width and height of sprite frame
      sprite.sWidth = weaponSprites[0].sWidth;
      sprite.sHeight = weaponSprites[0].sHeight;
      return sprite;
    }
  }
}

//function that changes the player's equipped weapon slot
function changeWeaponSlot(slot){
  if(equippedWeapons[slot].name != null){
    currentWeaponSlot = slot;
    currentlyReloading = false;
  }
}

//function that can be used to spawn a wave of a specific enemy type
function spawnWave(amount,type){

  for(var i=0; i < amount; i++){
    currentEnemies.push(new Enemy(0, floorHeight-50, 50, 100, type));
  }
  
}

//generation script for level 1
function generateLevel1(){

  imageMode(CORNER);
  background(lvl1bg);
  imageMode(CENTER);
  fill("blue");
  
  //rect(player.x-300, floorHeight-50, 100, 100);
  image(treeSprite, player.x+500, floorHeight-90, 180, 250);
  image(treeSprite, player.x+1600, floorHeight-90, 180, 250);

  while(currentEnemies.length < 5){

    var spawnPoints = [ Math.floor((width - player.x + random(500))) , Math.floor((0 - player.x - random(500))) ];

    currentEnemies.push(new Enemy(spawnPoints[Math.floor(random(1.9))], floorHeight-50, 50, 100, "basic"));
    currentEnemies[currentEnemies.length-1].propertyInitialise();

    currentEnemies.push(new Enemy(spawnPoints[Math.floor(random(1.9))], floorHeight-50, 50, 100, "speedy"));
    currentEnemies[currentEnemies.length-1].propertyInitialise();

    currentEnemies.push(new Enemy(spawnPoints[Math.floor(random(1.9))], floorHeight-random(150,400), 50, 100, "speedy"));
    currentEnemies[currentEnemies.length-1].propertyInitialise();

  }
}