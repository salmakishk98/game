// draw the background
const canv = document.getElementById('snake_canvas');
console.log(canv);
const game_window = canv.getContext("2d");

// creat parameter box the size of block
const box =32 ;

// define all image and audio files
const img = new Image();
img.src = "img/ground.png";
const food = new Image();
food.src = "img/food.png";
const die = new Audio();
die.src = 'audio/dead.mp3';
const down = new Audio();
down.src = 'audio/down.mp3';
const up = new Audio();
up.src = 'audio/up.mp3';
const left = new Audio();
left.src = 'audio/left.mp3';
const right = new Audio();
right.src = 'audio/right.mp3';
const eat = new Audio();
eat.src = 'audio/eat.mp3';

// creat an event 
document.addEventListener('keydown',control);

// creat food 
apple = {
    x : Math.floor(Math.random()*17+1)*box ,
    y : Math.floor(Math.random()*15+3)*box 
};
// score var 
let score =0 ;

// define wall border
const left_border =0*box;
const right_border = box*18;
const up_border = 2*box ;
const down_border = box*18;

// creat snake 
let snake = [];
snake[0]=
{
    snake_x : 5*box,
    snake_y : 12*box
};


// creat event function 
let d ;
function control(e)
{
   if (e.keyCode==38 && d!="down" )
     {d = 'up';
     up.play();} 
   else if (e.keyCode==37 && d!="right" )
      {d = 'left';
       left.play();}
   else if (e.keyCode==39 && d!="left")
     {
        d = 'right';
        right.play();
     } 
   else if (e.keyCode==40 && d!="up")
      {
        d = 'down'; 
        down.play();
      }    
}
// snake collision function 
function collision_snake (newhead,snake)
{
    for( let i=0 ; i<snake.length; i++)
    {
        if (newhead.snake_x==snake[i].snake_x&& newhead.snake_y==snake[i].snake_y)
           return true;
    }
    return false;
}

var speed = 500;
function draw ()
{
  console.log(speed);
  clearInterval(game);
  game = setInterval(draw,speed)
  // add range 
  const slider = document.getElementById("myRange");
 slider.oninput = function ()
 {
 speed = 600-slider.value ; // string
 }
   // draw background 
    game_window.drawImage(img,0,0);
   // draw food
    game_window.drawImage(food,apple.x,apple.y);

  // draw snake
  for ( let i=0 ;i<snake.length;i++)
  {
      if(i==0)
      {
          game_window.fillStyle = "red";
      }
      else
      {
          game_window.fillStyle ="yellow";
      }
      game_window.fillRect(snake[i].snake_x,snake[i].snake_y,box,box);
      game_window.strokeStyle = "green";
      game_window.strokeRect(snake[i].snake_x,snake[i].snake_y,box,box);
  }
  // get old head
  let  old_x = snake[0].snake_x;
  let old_y = snake[0].snake_y;
  
  // move the snake 
    if(d=='left')
     old_x-=box;
    if(d=='right')
     old_x+=box;
    if(d=='up')
     old_y-=box;
    if(d=='down')
     old_y+=box;
  

  // detect eating food 
  if(snake[0].snake_x==apple.x && snake[0].snake_y==apple.y)
  {
      score++;
      eat.play();
      apple.x = Math.floor(Math.random()*17+1)*box ;
      apple.y = Math.floor(Math.random()*15+3)*box ;   
  }
  else 
  {
      snake.pop();
  }
  // define new head 
 let newhead={
    snake_x: old_x,
    snake_y: old_y
};  
  // detection collsion for borders 
  if(old_x <left_border|| old_x>right_border || old_y<up_border || old_y>down_border||collision_snake(newhead,snake))
    {
     clearInterval(game);
     die.play();
     alert("game over");
    }
snake.unshift(newhead);
game_window.fillStyle="yellow";
game_window.font = " 40px Changa one";
game_window.fillText(score,2*box,1.6*box);
}
let game = setInterval(draw,speed);
