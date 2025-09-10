// Pong Game Variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 90;
const PADDLE_MARGIN = 25;
const BALL_SIZE = 16;
const BALL_SPEED = 8;
const PLAYER_SPEED = 10;
const AI_SPEED = 5;

// Game state
let playerPaddle = {
    x: PADDLE_MARGIN,
    y: canvas.height / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT
};

let aiPaddle = {
    x: canvas.width - PADDLE_MARGIN - PADDLE_WIDTH,
    y: canvas.height / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT
};

let ball = {
    x: canvas.width / 3- BALL_SIZE / 3,
    y: canvas.height / 2 - BALL_SIZE / 2,
    width: BALL_SIZE,
    height: BALL_SIZE,
    dx: BALL_SPEED * (Math.random() > 0.5 ? 1 : -1),
    dy: BALL_SPEED * (Math.random() * 2 - 1)
    
};

let animationId;

// Draw everything
function draw() {
    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Middle line
    ctx.setLineDash([10, 15]);
    ctx.strokeStyle = '#fff9';
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Player paddle
    ctx.fillStyle = '#54e1ff';
    ctx.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);

    // AI paddle
    ctx.fillStyle = '#ff5454';
    ctx.fillRect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height);

    // Ball
    ctx.fillStyle = '#fff';
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
}

// Move paddles and ball
function update() {
    // Ball movement
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top/bottom
    if (ball.y <= 0) {
        ball.y = 0;
        ball.dy *= -1;
    } else if (ball.y + ball.height >= canvas.height) {
        ball.y = canvas.height - ball.height;
        ball.dy *= -1;
    }

    // Ball collision with player paddle
    if (ball.x <= playerPaddle.x + playerPaddle.width &&
        ball.y + ball.height >= playerPaddle.y &&
        ball.y <= playerPaddle.y + playerPaddle.height) {
        ball.x = playerPaddle.x + playerPaddle.width;
        ball.dx *= -1;
        // Add some "spin" based on where the ball hits the paddle
        let hitPoint = (ball.y + ball.height/2) - (playerPaddle.y + playerPaddle.height/2);
        ball.dy = hitPoint * 0.25;
    }

    // Ball collision with AI paddle
    if (ball.x + ball.width >= aiPaddle.x &&
        ball.y + ball.height >= aiPaddle.y &&
        ball.y <= aiPaddle.y + aiPaddle.height) {
        ball.x = aiPaddle.x - ball.width;
        ball.dx *= -1;
        let hitPoint = (ball.y + ball.height/2) - (aiPaddle.y + aiPaddle.height/2);
        ball.dy = hitPoint * 0.25;
    }

    // Ball out of bounds (left/right)
    if (ball.x < 0 || ball.x > canvas.width) {
        resetBall();
    }

    // AI Paddle movement (simple AI: track the ball)
    let target = ball.y + ball.height/2 - aiPaddle.height/2;
    if (aiPaddle.y < target) {
        aiPaddle.y += Math.min(AI_SPEED, target - aiPaddle.y);
    } else if (aiPaddle.y > target) {
        aiPaddle.y -= Math.min(AI_SPEED, aiPaddle.y - target);
    }
    // Clamp AI paddle
    aiPaddle.y = Math.max(0, Math.min(canvas.height - aiPaddle.height, aiPaddle.y));
}

// Reset ball to center
function resetBall() {
    ball.x = canvas.width / 2 - BALL_SIZE / 2;
    ball.y = canvas.height / 2 - BALL_SIZE / 2;
    // Randomize direction
    ball.dx = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = BALL_SPEED * (Math.random() * 2 - 1);
}

// Mouse controls for player paddle
canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    let mouseY = e.clientY - rect.top;
    playerPaddle.y = mouseY - playerPaddle.height / 2;
    // Clamp within canvas
    playerPaddle.y = Math.max(0, Math.min(canvas.height - playerPaddle.height, playerPaddle.y));
});

// Main loop
function gameLoop() {
    update();
    draw();
    animationId = requestAnimationFrame(gameLoop);
}

// Start game
gameLoop();
