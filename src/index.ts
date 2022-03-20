#!/usr/bin/env npm start
// Start here
console.log("Start here!");

import { CanvasView } from './view/CanvasView';
import { Ball } from './sprites/Ball';
import { Brick } from './sprites/Brick';
import { Paddle } from './sprites/Paddle';
import { Collision } from './Collision'
// Images
import PADDLE_IMAGE from './images/paddle.png'
import BALL_IMAGE from './images/ball.png'
// Level and colors

import {
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_STARTX,
  BALL_SPEED,
  BALL_SIZE,
  BALL_STARTX,
  BALL_STARTY
} from './setup';
// Helpers
import { createBricks } from './helpers'

let gameOver:boolean = false
let score:number = 0

function setGameOver(view: CanvasView) {
  view.drawInfo('Game Over!')
  gameOver = true;
}

function setGameWin(view: CanvasView) {
  view.drawInfo('Game won!')
  gameOver = true;
}

function gameLoop(
  view: CanvasView,
  bricks: Brick[],
  paddle: Paddle,
 ball: Ball,
 collision: Collision
) {
  view.clear()
  view.drawBricks(bricks)
  view.drawSprite(paddle)
  view.drawSprite(ball)
  // Move Ball
  ball.moveBall()
  console.log("gameLoop iteration!")

  // Move paddle and check out of bounds
  if ( 
      (paddle.isMovingLeft && paddle.pos.x > 0) ||
      (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width) 
     )
     {
       paddle.movePaddle();
     }

     collision.checkBallCollision(ball,paddle,view);
     const collidingBrick = collision.isCollidingBricks(ball,bricks);
     if (collidingBrick) {
       score += 10
       view.drawScore(score);
     }
     
     // Game Over when ball leaves playfield
     if (ball.pos.y > view.canvas.height) gameOver = true;

     // If game won, set gameOver and display win 
     if (bricks.length === 0) return setGameWin(view)

      // Return if gameover and don't run request animation frame
    if (gameOver) return setGameOver(view);
     requestAnimationFrame(() => gameLoop(view,bricks,paddle,ball,collision));

}

function startGame(view: CanvasView) {
// Reset displays
score = 0;
view.drawInfo('');
view.drawScore(0);

// Create collission instanceof 
const collision = new Collision()

// Create all bricks 
const bricks = createBricks()
// Create a ball 
const ball = new Ball(
  BALL_SPEED,
  BALL_SIZE,
  {x:BALL_STARTX,
    y:BALL_STARTY},
    BALL_IMAGE
)

// Create a paddle
const paddle = new Paddle(
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,{
  x: PADDLE_STARTX,
  y: view.canvas.height - PADDLE_HEIGHT - 5
},
  PADDLE_IMAGE
)

// Reset gameover
gameOver=false

gameLoop(view,bricks,paddle,ball,collision)

}

const view = new CanvasView('#playField');
view.initStartButton(startGame);

