const pipe = document.querySelector('.pipe');
const mario = document.querySelector('.mario');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');

let highScore = localStorage.getItem('highScore') || 0;
highScoreElement.textContent = highScore;

let score = 0;
let isGameOver = false;
let pipeSpeed = 2000; 

// Atualiza a animação do pipe com a velocidade atual
const updatePipeAnimation = () => {
    pipe.style.animation = `pipe-animation ${pipeSpeed}ms infinite linear`;
};


const jump = () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
};

// Loop principal de colisão
const collisionLoop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    const isCollision = pipePosition <= 120 && pipePosition > 0 && marioPosition < 80;

    if (isCollision) {
        // Para as animações
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        // Aplica imagem de game over
        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        // Finaliza o jogo
        isGameOver = true;
        clearInterval(scoreInterval);
        clearInterval(collisionLoop);

        document.getElementById('gameOver').style.display = 'flex';

    }
}, 10);

// Contador de pontuação
const scoreInterval = setInterval(() => {
    if (!isGameOver) {
        score++;
        scoreElement.textContent = score;

        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
            highScoreElement.textContent = highScore;
            document.getElementById('new-record').style.display = 'block';
        }
    }
}, 100);

// Controles de teclado
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        isGameOver ? location.reload() : jump();
    }
});

// Inicializa a animação do pipe
updatePipeAnimation();
