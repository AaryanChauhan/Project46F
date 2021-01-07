var backgroundImg;
var santaImg;
var kid1Img;
var kid2Img;
var kid3Img;
var kid4Img;
var gift1Img;
var gift2Img;
var gift3Img;
var backgroundSprite;
var santa;
var santaJumping;
var invisibleGround;
var rand;
var kidsGroup;
var edges;
var giftGroup;
var score = 0;


function preload(){
  backgroundImg = loadImage("images/background_img.jpg");
  santaImg = loadImage("images/santaImg.png");
  kid1Img = loadImage("images/kid_1.png");
  kid2Img = loadImage("images/kid_2.png");
  kid3Img = loadImage("images/kid_3.png");
  kid4Img = loadImage("images/kid_4.png");
  gift1Img = loadImage("images/gift_1.png");
  gift2Img = loadImage("images/gift_2.png");
  gift3Img = loadImage("images/gift_3.png");
  santaJumping = loadImage("images/santa_Jumping.png");
}


function setup(){
  var canvas = createCanvas(800,600);

  backgroundSprite = createSprite(400,300,500,50);
  backgroundSprite.addImage(backgroundImg);
  backgroundSprite.velocityX = -5;
  backgroundSprite.scale = 1;

  santa = createSprite(400,200,25,25);
  santa.addImage(santaImg);
  santa.scale = 0.8;

  invisibleGround = createSprite(400,590,800,20);
  invisibleGround.visible = false;

  kidsGroup = createGroup();
  giftGroup = createGroup();


}


function draw(){
  background(255);

  edges = createEdgeSprites();

  santa.collide(edges);
  if(backgroundSprite.x < 0){
    backgroundSprite.x = backgroundSprite.width/2;
  }
  
  if(keyDown("RIGHT_ARROW")){
    santa.x = santa.x + 5;
  }

  if(keyDown("LEFT_ARROW")){
    santa.x = santa.x - 5;
  }

  if(giftGroup.isTouching(kidsGroup)){
    giftGroup.destroyEach();
    kidsGroup.destroyEach();
    score += 10;
  }
  
  gifts();
  kids();
  drawSprites();
}

function kids(){
  if(frameCount%150===0){
    var kid = createSprite(500,570,10,40);
    kid.velocityX = -5;

    rand = Math.round(random(1,4));

    switch(rand){

      case 1: kid.addImage(kid1Img);
      break;
      case 2: kid.addImage(kid2Img);
      break;
      case 3: kid.addImage(kid3Img);
      break;
      case 4: kid.addImage(kid4Img);
      break;
      default: break;
    }

    kid.scale = 0.4;
    kid.lifetime = 200;
    kid.collide(invisibleGround);

    kidsGroup.add(kid);
  }
}

function gifts(){
  if(keyDown("space")){
    var gift = createSprite(270,300,10,10);
    gift.velocityY = 3;
    rand = Math.round(random(1,3));

    switch(rand){

      case 1: gift.addImage(gift1Img);
      break;
      case 2: gift.addImage(gift2Img);
      break;
      case 3: gift.addImage(gift3Img);
      break;
      default: break;
    }

    gift.scale = 0.25;
    gift.lifetime = 150;
    gift.setCollider("rectangle",0,0,40,40);

    giftGroup.add(gift);
  }
}