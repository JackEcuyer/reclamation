//preloads all resources before the game is run.
function preload(){

  //loading all images that will be used in the game
  defaultCrosshair = loadImage('images/default-crosshair.png');
  cursorImg = loadImage('images/cursor-image.png');
  enemySpriteSheetImg = loadImage('images/zombie-sprite-sheet.png');
  lvl1bg = loadImage('images/lvl1-bg.jpg');
  treeSprite = loadImage('images/tree-sprite.png');
  weaponSpriteSheetImg = loadImage('images/weapon-sprite-sheet.png');

};

//initialises all the different menu screens
var mainMenuButtons = [];
var singlePlayerMenuButtons = [];
var playerShopButtons = [];
var pauseButtons = [];
var levelSelectButtons = [];
var weaponSelectButtons = [];
var gameMode = 'mainMenu'; //stores the current gamemode scene
var buttons = []; //stores the current buttons that are being displayed

var equippedButtons = [];
var unequippedButtons = [];
var shopButtons = [];

//initialises singleplayer gamemode variables
var player; //stores the main player object 
var floorHeight; //stores the floor height for the level
var currentLevel; //stores the current level the player has chosen
var currentBullets; //creates an array that will store all the bullet objects currently in the game
var currentEnemies; //creates an array that will store all the enemy objects currently in the game
var timeLastFired; //stores the program time in which the player last fired a bullet
var reloadStartTime; //stores the program time in which the player started to reload their weapon
var currentlyReloading; //stores if the player is in the process of reloading their weapon or not


//stores the weapons that the player has currently chosen to equip before going into a level
var equippedWeapons = [
  {name: null, ammoInMag: 0},
  {name: null, ammoInMag: 0},
  {name: null, ammoInMag: 0},
  {name: null, ammoInMag: 0},
  {name: null, ammoInMag: 0}
]

//stores the current weapon slot the player has equipped
var currentWeaponSlot = 0;

//stores a list of all the weapons owned by the player
var ownedWeapons = [ "Glock"];

//stores the amount of ammo that the player owns for each ammo type
var ownedAmmo = [
  { type: "9mm", amount: 'unlimited'},
  { type: "44 Magnum", amount: 0},
  { type: "7.62mm", amount: 100},
  { type: "5.56mm", amount: 0},
  { type: "8mm", amount: 0},
  { type: ".45 ACP", amount: 0},
  { type: "M18 Grenade", amount: 0},
  { type: "7mm", amount: 0},
  { type: "50 BMG", amount: 0}
];

//initialises array that stores all weapons available to unlock in the game
var weaponTypes = [
  { type: "Glock", bullet: "9mm", magSize: 7, fireRate: 1, reloadSpeed: 1, price: 0},
  { type: "Magnum", bullet: "44 Magnum", magSize: 10, fireRate: 1.5, reloadSpeed: 3, price: 500},
  { type: "AK-47", bullet: "7.62mm", magSize: 30, fireRate: 0.25, reloadSpeed: 3, price: 3000},
  { type: "Scar", bullet: "5.56mm", magSize: 25, fireRate: 0.6, reloadSpeed: 5, price: 5000},
  { type: "Minigun", bullet: "8mm", magSize: 75, fireRate: 0.1, reloadSpeed: 15, price: 99999},
  { type: "Uzi", bullet: ".45 ACP", magSize: 30, fireRate: 0.25, reloadSpeed: 6, price: 1000},
  { type: "RG-6 Grenade Launcher", bullet: "M18 Grenade", magsize: 3, fireRate: 4, reloadSpeed: 10, price: 50000},
  { type: "Hunting Rifle", bullet: "7mm", magSize: 1, fireRate: 0, reloadSpeed: 3, price: 8000},
  { type: "M24 Sniper", bullet: "50 BMG", magSize: 1, fireRate: 0, reloadSpeed: 3, price: 35000},
  { type: "Machine Pistol", bullet: "9mm", magSize: 15, fireRate: 0.3, reloadSpeed: 5, price: 1000},
  { type: "M16A1", bullet: "7.62mm", magSize: 30, fireRate: 0.5, reloadSpeed: 5, price: 5500},
  { type: "Thompson", bullet: ".45 ACP", magSize: 25, fireRate: 0.3, reloadSpeed: 6, price: 2350},
  { type: "Vector", bullet: ".45 ACP", magSize: 35, fireRate: 0.35, reloadSpeed: 4, price: 3400}
]; 


//initialises array that stores each bullet object with its values
var bulletTypes = [
  { type: "9mm", speed: 20, size: 5, colour: "white", damage: 10, price: 0 },
  { type: "44 Magnum", speed: 25, size: 10, colour: "white", damage: 20, price: 10},
  { type: "7.62mm", speed: 15, size: 7.5, colour: "white", damage: 4, price: 25},
  { type: "5.56mm", speed: 13, size: 7, colour: "white", damage: 5, price: 30},
  { type: "8mm", speed: 30, size: 8, colour: "white", damage: 5, price: 50},
  { type: ".45 ACP", speed: 30, size: 5, colour: "white", damage: 3, price: 15},
  { type: "M18 Grenade", speed: 10, size: 20, colour: "red", damage: 30, price: 100},
  { type: "7mm", speed: 40, size: 15, colour: "white", damage: 100, price: 30},
  { type: "50 BMG", speed: 50, size: 20, colour: "white", damage: 150, price: 400},
  { type: "4.6mm", speed: 20, size: 5, colour: "white", damage: 10, price: 10}
];

//initialises array that stores each enemy object type with its values
var enemyTypes = [
  { type: "basic", speed: 1, health: 30, spriteSheet: null, attackDistance: 100, attackType: 'projectile', attackSpeed: 2, reward: 10},
  { type: "speedy", speed: 3, health: 20, spriteSheet: null, attackDistance: 300, attackType: 'projectile', attackSpeed: 1, reward: 25}
]

var currentMoney;

//sets up different properties before the draw loop is run.
function setup(){

  currentMoney = 10000;

  //creates the game canvas that sets the boundaries for every object drawn on the screen
  canvas = createCanvas(1905, 917);

  //creates the buttons and adds them to the different menu screens
  mainMenuButtons = [
    new Button("Single Player", 952.5, 300, 600, 100, () => { gameMode = 'singlePlayerMenu'; buttons = singlePlayerMenuButtons }),
    new Button("Shop", 952.5, 450, 600, 100, () => { gameMode = 'shopMenu'; buttons = playerShopButtons })
  ]

  singlePlayerMenuButtons = [
    new Button("Play", 952.5, 300, 600, 100, () => { gameMode = 'levelSelectMenu'; buttons = levelSelectButtons; resetEquippedWeapons()}),
    new Button("Main Menu", 952.5, 450, 600, 100, () => { gameMode = 'mainMenu'; buttons = mainMenuButtons })
  ]

  inGameButtons = [
    new Button("Pause", 1830, 50, 100, 50, () => { gameMode = 'pauseMenu'; buttons = pauseButtons })
  ]
  
  pauseButtons = [
    new Button("Resume", 952.5, 300, 600, 100, () => { gameMode = 'singlePlayerGame'; buttons = inGameButtons }),
    new Button("Quit Game", 952.5, 450, 600, 100, () => { gameMode = 'mainMenu'; buttons = mainMenuButtons })
  ]

  settingsButtons = [
    new Button("Sound", 500, 300, 300, 100, () => {/* This will mute / unmute the game */ })
  ]

  levelSelectButtons = [
    new Button("Level 1", 300, 200, 150, 150, () => { gameMode = 'weaponSelectMenu'; currentLevel = 1; buttons = weaponSelectButtons}),
    new Button("Main Menu", 952.5, 800, 300, 50, () => { gameMode = 'mainMenu'; buttons = mainMenuButtons})
  ]

  weaponSelectButtons = [
    new Button("Main Menu", 952.5, 800, 300, 50, () => { gameMode = 'mainMenu'; buttons = mainMenuButtons})
  ]

  playerShopButtons = [
    new Button("Main Menu", 200, 50, 300, 50, () => { gameMode = 'mainMenu'; buttons = mainMenuButtons})
  ]
 
  //puts the player at the main menu when they initially start the game
  buttons = mainMenuButtons;

  //settings for the alignment of anything drawn on the screen using p5
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
  ellipseMode(CENTER);

}

//executed every time the player presses their mouse
function mousePressed(){

  //loops through each button on screen and checks if the player has clicked each button
  for(b of buttons){
    b.clicked();
  }

  //if in the weapon select menu, button check the weapon slot buttons
  if(gameMode == "weaponSelectMenu"){
    //check for click event on each button
    for(b of equippedButtons){
      b.clickCheck();
    }
    for(b of unequippedButtons){
      b.clickCheck();
    }
  }

  if(gameMode == "shopMenu"){
    //check for click event on each button
    for(b of shopButtons){
      b.weaponBuyClickCheck();
      b.ammoBuyClickCheck();
    }

  }

}

//main draw loop for the game that executes every frame.
function draw(){

  //clears the canvas and sets background
  background("black");
  
  //calls a scene script depending on the current gameMode the player is on
  switch(gameMode){

    case 'mainMenu': mainMenu();
      break;
    
    case 'singlePlayerMenu': singlePlayerMenu();
      break;

    case 'singlePlayerGame': singlePlayerUpdate(); //updates the singleplayer environment
      break;
    
    case 'levelSelectMenu': levelSelectMenu();
      break;

    case 'pauseMenu': pauseMenu();
      break;

    case 'settingsMenu': settingsMenu();
      break;

    case 'playerShop': playerShop();
      break;

    case 'weaponSelectMenu': weaponSelectMenu();
      break;

    case 'shopMenu': shopMenu();
      break;

  }
}

//function that resets the weapons the player has equipped
function resetEquippedWeapons(){
  equippedWeapons = [
  {name: null, ammoInMag: 0},
  {name: null, ammoInMag: 0},
  {name: null, ammoInMag: 0},
  {name: null, ammoInMag: 0},
  {name: null, ammoInMag: 0}
  ]
}