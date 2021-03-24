//this class creates the bullet object
class Bullet {

  constructor(x,y,xSpeed,ySpeed,type, target) {
    this.x = x; //initial position of the bullet is inside the player
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.bulletType = type;
    this.target = target;
  }

  //calculates the bullet stats by locating the stats in the bullet statistics array
  calculateTypeStats(){

    //loop through array until finds bullet with same type
    for(var bullet of bulletTypes){
      if(bullet.type == this.bulletType){
        this.speed = bullet.speed; //assigns speed to this object depending on bullet speed
        this.colour = bullet.colour; //assings colour to this object depending on bullet colour
        this.size = bullet.size; //assigns size to this object depending on bullet size
        this.damage = bullet.damage; //assings damage value to this object depending on bullet damage
      }   
    }

    //buffs bullet damage for enemies the higher the current level
    if(this.target == 'player'){
      this.damage += Math.floor(this.damage * (currentLevel/4));
    }
  }

  update(){
    //moves the bullet towards its target direction
    this.x += this.xSpeed * this.speed;
    this.y += this.ySpeed * this.speed;
  }

  //checks if the bullet has collided with it's target and if so the target's health is lowered by the damage of the bullet
  collisionCheck(){

    switch(this.target){

      case 'player': //checks if the bullet x and y is colliding with the player x and y

        if( ((this.x+this.size/2) >= (width/2-25) && (this.x-this.size/2) <= (width/2+25) && (this.y+this.size/2) >= player.y-50 && (this.y-this.size/2) <= player.y+50)){
          player.health -= this.damage;
          this.destroyed = true;  //this variable will tell the main game that the bullet has been destroyed and will remove it from the game after it has collided
        }
        break;

      case 'enemy': //checks if the bullet x and y is colliding with any enemies currently in the game

        for(var i=0; i < currentEnemies.length; i++){

          if( (this.x+this.size/2) >= (currentEnemies[i].x + player.x) - currentEnemies[i].width/2 && (this.x - this.size/2) <= (currentEnemies[i].x + player.x) + currentEnemies[i].width/2 && (this.y+this.size/2) >= currentEnemies[i].y- currentEnemies[i].height/2 && (this.y-this.size/2) <= currentEnemies[i].y + currentEnemies[i].height/2){

            currentEnemies[i].health -= this.damage;
            this.destroyed = true;

          }
        }
        break;

    }
  }

  //draws the bullet on the canvas
  render(){ 
    stroke("black");
    stroke(1);   
    fill(this.colour);
    ellipse(this.x, this.y, this.size);
    noStroke();
  }
}

//gets the normalised vector for the position of the mouse.
function getMouseVector(){
	let mouseXalt = mouseX - width/2;
	let mouseYalt = mouseY - player.y;
	let mouseDir = createVector(mouseXalt, mouseYalt);
	mouseDir.normalize();
	return mouseDir;
}
