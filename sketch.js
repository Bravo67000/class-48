var bg ;
var moonLander;
var moonLanderImg;
var g = 0.05
var vx = 0 , vy = 0;
var fuel = 100;
var crash,land,left_thrust,right_thrust,thrust,normal;
var ground ,lz , lzImg , invisibleGround
var PLAY = 1 
var END = 0
var gameState = PLAY


function preload(){
  bg = loadImage("bg.png");
  moonLanderImg = loadImage("normal.png");
  thrust = loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png")
  crash = loadAnimation("crash1.png","crash2.png","crash3.png")
  land = loadAnimation("landing1.png","landing2.png","landing_3.png")
  left_thrust= loadAnimation("left_thruster_1.png","left_thruster_2.png")
  right_thrust= loadAnimation("right_thruster_1.png","right_thruster_2.png")
  normal = loadAnimation("normal.png");
  lzImg = loadImage("lz.png")

  thrust.playing = true
  thrust.looping = false
  crash.looping = false
  land.looping = false
  left_thrust.looping = false
  right_thrust.looping = false
  


   

}
function setup(){
createCanvas(1000,700)


moonLander = createSprite(500,100,20,20)
moonLander.addImage(moonLanderImg)
moonLander.scale = 0.15
moonLander.addAnimation("thrusting", thrust)
moonLander.addAnimation("normal", normal)
moonLander.addAnimation("leftT", left_thrust)
moonLander.addAnimation("rightT", right_thrust)
moonLander.addAnimation("land", land)
moonLander.addAnimation("crash", crash)

ground = createSprite(500,690,1000,20)
rectMode(CENTER)


lz = createSprite(250,450,20,20)
lz.addImage(lzImg)
lz.scale=0.4

invisibleGround = createSprite(253,570,160,10)
invisibleGround.visible = false;









}
function draw(){
 background(bg);

 textSize(15)
 fill("white")
 text("Vertical velocity:  "+vy  ,20,20)
 text("Horizontal velocity:  "+vx.toFixed(2),20,40)
 text("Fuel:  "+fuel ,20,60);
 

 textSize(15)
 fill("white")
 text("m/s^2",300,20)

 textSize(15)
 fill("white")
 text("m/s" ,200,40)

 textSize(15)
 fill("white")
 text("Kilo Litre" ,100,60)

 lz.depth = moonLander.depth
 moonLander.depth +=1

 
 if (gameState === PLAY) {
    vy += g ;
    moonLander.position.y += vy;
    moonLander.position.x += vx;
   
    if (moonLander.collide(invisibleGround)){
      gameState = END;
    }
 } else if (gameState === END ) {
    moonLander.x = 254
    moonLander.y = 470
    moonLander.changeAnimation("normal")
    vx = 0
    vy = 0
    

 }

  drawSprites()
}

function keyPressed(){
  if(keyCode==38 && fuel>0){
    upward_thrust()
    fuel -=1;
    moonLander.changeAnimation("thrusting")
  }
  if(keyCode==LEFT_ARROW && fuel>0){
    vx = -1
    fuel -=1;
    moonLander.changeAnimation("rightT")
  }
  if(keyCode==RIGHT_ARROW && fuel>0){
    vx = +1
    fuel -=1;
    moonLander.changeAnimation("leftT")
  }
    
}
function upward_thrust(){
  vy = -1;
}



  
