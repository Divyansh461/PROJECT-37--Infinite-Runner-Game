var backImage,backgr;
var player, player_running;
var ground,ground_img;

var foodgroup, bananaImage;
var obstaclegroup, obstacle_img;

var gameOver;
var score=0;


function preload(){
  backImage=loadImage("MonkeygoHappyfiles/jungle.jpg");
  player_running = loadAnimation("MonkeygoHappyfiles/Monkey_01.png","MonkeygoHappyfiles/Monkey_02.png","MonkeygoHappyfiles/Monkey_03.png","MonkeygoHappyfiles/Monkey_04.png","MonkeygoHappyfiles/Monkey_05.png","MonkeygoHappyfiles/Monkey_06.png","MonkeygoHappyfiles/Monkey_07.png","MonkeygoHappyfiles/Monkey_08.png","MonkeygoHappyfiles/Monkey_09.png","MonkeygoHappyfiles/Monkey_10.png");
  
  

  bananaImage = loadImage("MonkeygoHappyfiles/banana.png");
  obstacle_img = loadImage("MonkeygoHappyfiles/stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  foodgroup = new Group();
  obstaclegroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(foodgroup.isTouching(player)){
      foodgroup.destroyEach();
    score = score + 2;

    camera.position.x = width/2;
    camera.position.y = foodgroup.y - 50;
      
    }

    
  
 if(obstaclegroup.isTouching(player)) { 
  player.scale=0.08;  
}
  
    switch(score){
        case 10: player.scale=0.12;
         break;  
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
                default: break;
    }
  
  
  
    if(keyDown("space")  && player.y >= 314 ) {
      player.velocityY = -16;
    }
    player.velocityY = player.velocityY + 0.8;
  
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();
 
    
  
  
  
  
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    foodgroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclegroup.add(obstacle);
  }
}


  
