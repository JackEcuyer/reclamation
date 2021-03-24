//this class creates the enemy object
class Enemy {
  
  constructor(x,y, width, height, type){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type; //type of enemy
    this.currentDirection; //used for sprite animation, shows direction of enemy travel
    this.currentFrame = 1; //used for moving sprite frame switching
  }

  //initialises the properties of the enemy depending on the enemy type
  propertyInitialise(){

    //loops through enemy object array
    for(var enemy of enemyTypes){
      if(enemy.type == this.type){
        this.health = enemy.health //assigns health to this object depending on enemy type
        this.maxHealth = enemy.health //assigns max health to this object depending on enemy type
        this.spriteSheet = enemy.spriteSheet //sets up the sprite sheet to be used for this object 
        this.speed = enemy.speed //assigns speed to this object depending on enemy type
        this.attackDistance = enemy.attackDistance //assigns attack distance depending on enemy type
        this.attackType = enemy.attackType //assings attack type depending on enemy type
        this.attackDistanceOffset = random(200); //assigns an offset from default attack distance to lower the amount of enemies who get stuck in the same spot
        this.attackSpeed = enemy.attackSpeed //assigns the attack speed of the enemy (seconds) depending on enemy type
        this.timeLastAttacked = 0; //stores the time of program when the enemy last fired a bullet
        this.reward = enemy.reward; //stores the money amount that will be rewarded upon enemy kill
      }
    }

    //matches correct enemy sprite object to this enemy
    for(var sprite of enemySprites){
      if(this.type == sprite.name){
        this.spriteSheet = sprite;
      }
    }
  }

  /* checks the distance that this enemy is from the player and causes the 
     enemy to travel closer or attack depending on the enemy type */
  travelDistanceCheck(){

    //travel closer to player if not within the attack range
    if( (this.x+player.x) - width/2 > this.attackDistance + this.attackDistanceOffset){
      this.x -= this.speed ;
      this.currentDirection = "left";
    }
    else if( (this.x+player.x) - width/2 < -this.attackDistance - this.attackDistanceOffset){
      this.x += this.speed;
      this.currentDirection = "right";
    }
    else{
      //if enemy is not moving
      if(this.x + player.x >= width/2){
        this.currentDirection = "leftstatic";
      }
      else if(this.x + player.x < width/2){
        this.currentDirection = "rightstatic";
      }
    }

    //attack the player with specific attack method if within the specific attack range
    if( ((this.x+player.x) - width/2 < (this.attackDistance + this.attackDistanceOffset)) && ( (this.x+player.x) - width/2 > (-this.attackDistance - this.attackDistanceOffset)) ){

      //checks attack method and performs correct attack type
      switch(this.attackType){

        case 'projectile': 

          //checks if enough time has passed since the last bullet has fired to fire another bullet depending on attack speed
          if( millis() - this.timeLastAttacked >= this.attackSpeed*1000 || this.timeLastAttacked == 0){

            //calculates the direction the bullet has to travel in
            let bulletDir = createVector( ( width/2 - (this.x + player.x) ), (player.y-this.y) );
            bulletDir.normalize();

            currentBullets.push(new Bullet((this.x+player.x), this.y, bulletDir.x, bulletDir.y, '9mm', 'player')); //shoots a bullet at the player
            currentBullets[currentBullets.length-1].calculateTypeStats();  

            //updates the time last bullet was fired  
            this.timeLastAttacked = millis();  

          }
          break;

        case 'melee': null
          break;

      }
    }
  }

  //this function renders the enemy and its health bar on the screen
  render(){
    let prevX = 0;
    
    //enemy
    fill("yellow");
    //rect(this.x + player.x, this.y, this.width, this.height);

    //draws correct enemy sprite frame at enemy position
    switch(this.currentDirection){

      case "leftstatic": 
        image(enemySpriteSheetImg, this.x + player.x, this.y, this.width, this.height, this.spriteSheet.frame2.sx, this.spriteSheet.frame2.sy, enemySprites[0].sWidth, enemySprites[0].sHeight);
        break;

      case "rightstatic": 
        image(enemySpriteSheetImg, this.x + player.x, this.y, this.width, this.height, this.spriteSheet.frame3.sx, this.spriteSheet.frame3.sy, enemySprites[0].sWidth, enemySprites[0].sHeight);
        break;

      case "left":

         //change frame every time width of sprite has passed
         if( Math.floor(this.x) % Math.floor(this.width/3) == 0){

           if(prevX - this.x > 3 || prevX - this.x < -3){

            if(this.currentFrame - 1 == 0){
              this.currentFrame = 2;
            }
            else{
              this.currentFrame = 1;
            }
            prevX = this.x;
           }

         };

        //display one of the two moving sprite frames
         if(this.currentFrame == 1){
           image(enemySpriteSheetImg, this.x + player.x, this.y, this.width, this.height, this.spriteSheet.frame1.sx, this.spriteSheet.frame1.sy, enemySprites[0].sWidth, enemySprites[0].sHeight);
         }
         else{
           image(enemySpriteSheetImg, this.x + player.x, this.y, this.width, this.height, this.spriteSheet.frame2.sx, this.spriteSheet.frame2.sy, enemySprites[0].sWidth, enemySprites[0].sHeight);
         }

         break;

      case "right":
        
         //change frame every time width of sprite has passed
         if( Math.floor(this.x) % Math.floor(this.width/3) == 0){

           if(prevX - this.x > 3 || prevX - this.x < -3){

            if(this.currentFrame - 2 == 0){
              this.currentFrame = 1;
            }
            else{
              this.currentFrame = 2;
            }
            prevX = this.x;
           }
         };

        //display one of the two moving sprite frames
         if(this.currentFrame == 1){
           image(enemySpriteSheetImg, this.x + player.x, this.y, this.width, this.height, this.spriteSheet.frame3.sx, this.spriteSheet.frame3.sy, enemySprites[0].sWidth, enemySprites[0].sHeight);
         }
         else{
           image(enemySpriteSheetImg, this.x + player.x, this.y, this.width, this.height, this.spriteSheet.frame4.sx, this.spriteSheet.frame4.sy, enemySprites[0].sWidth, enemySprites[0].sHeight);
         }
    }

    //health bar
    fill("black");
    rect( this.x + player.x, (this.y - this.height/2 - 20), 102, 12);
    fill("red");
    rect( (this.x + player.x), (this.y - this.height/2 - 20), 100, 10);
    fill("green");
    rectMode(CORNER);
    rect( (this.x + player.x - 50), (this.y - this.height/2 - 25), 100 * (this.health/this.maxHealth) , 10);
    rectMode(CENTER);

  }
  
}
