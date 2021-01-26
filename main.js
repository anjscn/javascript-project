const background = document.querySelector('.background');
const dino = document.querySelector('.dino');
const bgTitle = document.querySelector('.backgroundTitle');

let isJumping = false;
let position = 0;

background.addEventListener("click", function(event) 
{
  bgTitle.style.display = 'none';
  background.style.animation = 'slideright 600s linear';
  document.addEventListener('keyup', handleKeyUp);
  createCactus();
});


//Verifica a tecla pressionada
function handleKeyUp(event)
{
  if (event.keyCode === 32 || event.keyCode === 38) { //32 = espaço, 38 = seta pra cima
    if (!isJumping) {
      jump();
    }
  }
}

function jump() 
{
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 120) {
      //Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      //Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() 
{
  const cactus = document.createElement('div');
  let cactusPosition = 1100;
  let randomTime = Math.random() * 6000;

  cactus.classList.add('cactus');
  
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';
  
  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } 
    else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Fim de jogo
      clearInterval(leftTimer);
      background.removeChild(cactus);
      gameOver();
    } 
    else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

function gameOver() 
{
  bgTitle.style.display = 'inherit';
  bgTitle.innerHTML = 'Fim de jogo';
  background.style.animation = 'slideright paused';
}
