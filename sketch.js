//Naming variable for main sprites
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var bg, bgImage;
var jump;
var song;

function preload()
{
  
 //Loading images  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  bgImage = loadImage("jungle.png");
  
  //Loading audio
  jump = loadSound("Jump.mp3");
  song = loadSound("AudioWow.wav");
 
}



function setup() 
{
   createCanvas(580, 520);
   var survivalTime=0;
  
  song.loop();
  
  //Creating sprite for bg
  bg = createSprite(290, 260);
  bg.addImage(bgImage);
  bg.velocityX = -4;
  
  
  //Creating sprite for monkey
  monkey=createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.2;
  
  //Creating sprite for ground
  ground = createSprite(400, 450, 2000, 10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  ground.visible = false;
  
  //Creating groups
  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;

  
}


function draw() 
{
  
  background(255);
  
    
  if(ground.x < 0) 
  {
    ground.x=ground.width/2;
  }
  
  
  if(bg.x < 200) 
  {
    bg.x = bg.width/2;
  }

  
  if(obstaclesGroup.isTouching(monkey))
  {
    score = score - 5
    obstaclesGroup.destroyEach();
  }
  
  if(FoodGroup.isTouching(monkey))
  {
    FoodGroup.destroyEach();
    score = score + 2;
  }

   
    if(keyDown("space") && monkey.y >= 200 ) 
    {
      monkey.velocityY = -12;
      jump.play();
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 450,50);        

  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
}



function spawnFood() {
  
  //write code here to spawn the Food
  if (frameCount % 80 === 0) 
  {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() 
{
  if(frameCount % 300 === 0) 
  {
    obstacle = createSprite(800, 430, 10, 40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.2;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}