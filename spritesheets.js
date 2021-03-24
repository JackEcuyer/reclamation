//this script stores the arrays of all the sprite sheets for each object used in reclamation
// each sprite sheet array is stored with each element being arrays of objects containing the data for individual sprite frames for each sprite type.

var weaponSprites = [
  {name: null, sWidth: 150, sHeight: 100},
  {name: "Glock", sx: 50, sy: 50},
  {name: "Scar", sx: 200, sy: 50},
  {name: "Magnum", sx: 375, sy: 50},
  {name: "AK-47", sx: 540, sy: 50},
  {name: "Uzi", sx: 50, sy: 200},
  {name: "Minigun", sx: 200, sy: 200},
  {name: "RG-6 Grenade Launcher", sx: 375, sy: 200},
  {name: "Hunting Rifle", sx: 540, sy: 200},
  {name: "M24 Sniper", sx: 50, sy: 350},
  {name: "Machine Pistol", sx: 200, sy: 350},
  {name: "Thompson", sx: 540, sy: 350},
  {name: "M16A1", sx: 700, sy: 350},
  {name: "Vector", sx: 550, sy: 525}
]

//enemy sprite frames are stored with the first frame being the left facing frame then frames working their way to the right facing frames.
var enemySprites = [
  {name: null, sWidth: 45, sHeight: 72},
  {name: "basic", frame1: {sx: 434, sy: 668}, frame2: {sx: 504, sy: 665}, frame3: {sx: 516, sy: 489}, frame4: {sx: 442, sy: 492} },
  {name: "speedy", frame1: {sx: 42, sy: 667}, frame2: {sx: 109, sy: 664}, frame3: {sx: 118, sy: 489}, frame4: {sx: 42, sy: 489} }
]

var playerSprites = [
  {name: null, sWidth: 45, sHeight: 72},
  {name: "default", frame1: {sx: 241, sy: 308}, frame2: {sx: 371, sy: 308}, frame3: {sx: 305, sy: 306}, frame4: {sx: 301, sy: 132}, frame5: {sx: 231, sy: 135}, frame6: {sx: 364, sy: 133}}
]