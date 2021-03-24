//this class creates the player object
class Player {
  
  constructor(x,y){  
    this.x = x //note: the x position for the player acts as a placeholder to move all other objects in the game, the player's x position never actually changes
    this.y = y
    this.speed = 3;
    this.jumpSpeed = 6;
    this.jumping = false
    this.health = 1000; //player max health is 1000
    this.currentDirection = "staticright"; //used for sprite animation, shows direction of player travel
    this.currentFrame; //used for moving sprite frame switching
  }

  //draws the player to the screen
  render(){
 
    //draws correct player sprite frame at center of the screen
    switch(this.currentDirection){
      
      case "staticleft": 
        image(enemySpriteSheetImg, width/2, this.y, 50, 100, playerSprites[1].frame3.sx, playerSprites[1].frame3.sy, playerSprites[0].sWidth, playerSprites[0].sHeight);
        break;

      case "staticright": 
        image(enemySpriteSheetImg, width/2, this.y, 50, 100, playerSprites[1].frame4.sx, playerSprites[1].frame4.sy, playerSprites[0].sWidth, playerSprites[0].sHeight);

        break;

      case "left":

        //change frame every time width of sprite has passed
        if( Math.floor(this.x) % Math.floor(50/3) == 0){
          if(this.currentFrame - 1 == 0){
            this.currentFrame = 2;
          }
          else{
            this.currentFrame = 1;
          }
        };

        //display one of the two moving sprite frames
        if(this.currentFrame == 1){
          image(enemySpriteSheetImg, width/2, this.y, 50, 100, playerSprites[1].frame1.sx, playerSprites[1].frame1.sy, playerSprites[0].sWidth, playerSprites[0].sHeight);
         }
         else{
          image(enemySpriteSheetImg, width/2, this.y, 50, 100, playerSprites[1].frame2.sx, playerSprites[1].frame2.sy, playerSprites[0].sWidth, playerSprites[0].sHeight);
         }
         break;

      case "right":

        //change frame every time width of sprite has passed
        if( Math.floor(this.x) % Math.floor(50/3) == 0){
          if(this.currentFrame - 1 == 0){
            this.currentFrame = 2;
          }
          else{
            this.currentFrame = 1;
          }
        };

        //display one of the two moving sprite frames
        if(this.currentFrame == 1){
          image(enemySpriteSheetImg, width/2, this.y, 50, 100, playerSprites[1].frame5.sx, playerSprites[1].frame5.sy, playerSprites[0].sWidth, playerSprites[0].sHeight);
         }
         else{
          image(enemySpriteSheetImg, width/2, this.y, 50, 100, playerSprites[1].frame6.sx, playerSprites[1].frame6.sy, playerSprites[0].sWidth, playerSprites[0].sHeight);
         }
         break;

    }


  }

  //this function is called every draw loop and updates the player position
  update(){
    
    //Jumping Mechanics
    //checks to make sure that the player jump is not exceeding the max jump limit
    if(this.y <= floorHeight-200){
      this.jumping = false;
    }

    //decreases the player y value if the player is jumping
    else if(this.jumping == true){
      this.y -= this.jumpSpeed;
    }

    //creates the effect of gravity if the player is not still jumping
    if(this.jumping == false && this.y < floorHeight-50){
      this.y += this.jumpSpeed;
    }
  
  }

  //moves the player left if left key is pressed/held
  left(){
    this.x += this.speed;
    this.currentDirection = "left";
  }

  //moves the player right if right key is pressed/held
  right(){
    this.x -= this.speed;
    this.currentDirection = "right";
  }

}