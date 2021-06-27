var canvas = document.getElementById("can");
var ctx = canvas.getContext("2d");

rightPressed = false
leftPressed = false
speed = 2


// Ball Object
let ball = {
  x: 250,
  y: 400,
  radius :5,
  
  dx: speed/2,
  dy: -(speed/2),
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
    ctx.stroke();
  }
};


//Paddle Object
let paddle = {
  x:250,
  y:400,

  width:200,
  height:20,

  draw: function(){
    ctx.beginPath();
    ctx.rect(this.x,this.y,this.width,this.height );
    ctx.stroke();
  }
}

// Paddle left and right functionality
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function paddleMove(){
  if (rightPressed) {
    paddle.x += 5;
    if (paddle.x + paddle.width > canvas.width) {
      paddle.x = canvas.width - paddle.width;
    }
  } else if (leftPressed) {
    paddle.x -= 5;
    if (paddle.x < 0) {
      paddle.x = 0;
    }
  }
}

// Wall bouncing functionality
function checkWallCollision(){
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx *= -1;
  }

  if (ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }
  if(ball.y + ball.radius > canvas.height)
  {
    endGame("lost")
  }
}


// Paddle bouncing functionality
function checkPaddleCollision(){
  let half = (paddle.width)/2
  if ((ball.x +ball.radius) > paddle.x && (ball.x -ball.radius) < paddle.x + paddle.width) {
    if (ball.y +ball.radius === paddle.y) {
      
      factor = ((ball.x-paddle.x) - half )/paddle.width * 2
      if(0.75 < Math.abs(factor)){
        if(factor<0) factor= -.75
        else factor=.75
      } 
        console.log(ball.dx,ball.dy)
        
        ball.dx = factor*speed
        ball.dy =(1-Math.abs(factor)) * speed * -1
        console.log(factor, ball.dx, ball.dy )
      }
}
}


// Brick formation functionality
var brickRowCount = 4;
var brickColumnCount = 10;
var brickWidth = 45;
var brickHeight = 35;
var brickPadding = 4;
var brickOffsetTop = 30;
var brickOffsetLeft = 5;

var bricks = [];
score =0


function brickCollisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (
          ball.x +ball.radius>= b.x &&
          ball.x -ball.radius<= b.x + brickWidth &&
          ball.y +ball.radius >= b.y &&
          ball.y - ball.radius <= b.y + brickHeight
        ) // Is ball hitting the brick at all 
        {
          if((ball.x -ball.radius=== b.x+brickWidth || ball.x +ball.radius=== b.x) && ((ball.y +ball.radius)>b.y && ball.y -ball.radius<b.y+b.height)) // Ball at left or right edge of brick
          {
            ball.dx*=-1
          }
          else // Ball at up or down edge of brick
          {
            ball.dy*=-1
          }
            // Brick is destroyed and score updated
            b.status = 0;
            score++;
            brickcount--;
            if(brickcount === 0) endGame("won")
        }
      }
    }
  }
}

function endGame(condition){
  ball.dx = 0
  ball.dy = 0
  if(condition === "won")
  document.querySelector(".high-score").innerText = score
  else
  document.querySelector(".high-score").innerText = "You lost"

}

function generateBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }
}
brickcount = 0

function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#230c33";
        ctx.fill();
        ctx.closePath();
        brickcount++;
      }
    }
  }
}

generateBricks()
drawBricks()

function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ball.draw();
  paddle.draw();

  checkWallCollision()
  checkPaddleCollision()
  brickCollisionDetection()
  paddleMove()
  drawBricks()


  ball.x+=ball.dx;
  ball.y+=ball.dy;
  window.requestAnimationFrame(game);
}
game();
window.requestAnimationFrame(game);
