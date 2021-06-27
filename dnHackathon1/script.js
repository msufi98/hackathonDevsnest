var canvas = document.getElementById("can");
var ctx = canvas.getContext("2d");

rightPressed = false
leftPressed = false
speed = 2

let ball = {
  x: 250,
  y: 480,
  radius :5,
  
  dx: 0,
  dy: 2,
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
    ctx.stroke();
  }
};

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


function checkWallCollision(){
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx *= -1;
  }

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy *= -1;
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

function checkPaddleCollision(){
  if (ball.x > paddle.x && ball.x < paddle.x + paddle.widthidth) {
    if (ball.y = y - paddle.height) {
        ball.dy *= -1;
    }
}
}

var brickRowCount = 4;
var brickColumnCount = 10;
var brickWidth = 45;
var brickHeight = 35;
var brickPadding = 4;
var brickOffsetTop = 30;
var brickOffsetLeft = 5;

var bricks = [];
score =0


function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (
          ball.x +ball.radius>= b.x &&
          ball.x -ball.radius<= b.x + brickWidth &&
          ball.y +ball.radius >= b.y &&
          ball.y - ball.radius <= b.y + brickHeight
        ) {
          ball.dy *= -1;
          b.status = 0;
          score++;
        }
      }
    }
  }
}

function generateBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }
}

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
      }
    }
  }
}

generateBricks()
drawBricks()

function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log(ball.x, ball.y);

  ball.draw();
  paddle.draw();

  checkWallCollision()
  checkPaddleCollision()
  collisionDetection()
  paddleMove()
  drawBricks()


  ball.x+=ball.dx;
  ball.y+=ball.dy;
  window.requestAnimationFrame(game);
}
game();
window.requestAnimationFrame(game);
