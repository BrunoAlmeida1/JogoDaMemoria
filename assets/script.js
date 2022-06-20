const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let shuffle = document.querySelector('#shuffle');
let aboutBtn = document.querySelector('#about');
let visible = false;
let number = document.getElementById("number");
let txt = document.getElementsByTagName("h1")[0];
var currentNumber = 4, hits = 0;

//função para virar carta
function flipCard() {
    if (currentNumber > 0) {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        hasFlippedCard = false;
        checkForMatch();
    }
}

//função que checa se as cartas são iguais, assim como o número de acertos e de tentativas
function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        currentNumber++;
        hits++;
        number.innerHTML = currentNumber;
        disableCards();
        checkHits(hits);
        return;
    }
    currentNumber--;
    number.innerHTML = currentNumber;
    unflipCards();
    checkCurrentNumber(currentNumber);
}

//função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();

//função que analisa se o jogador venceu
function checkHits(hits) {
    if (hits === 6) {
        txt.innerHTML = "Parabéns! <br> Você venceu!";
        document.getElementById("number").style.visibility = "hidden";
    }
}

//função que analisa se o jogador perdeu
function checkCurrentNumber(currentNumber) {
    if (currentNumber === 0) {
        txt.innerHTML = " Fim de jogo <br> Você perdeu!";
        document.getElementById("number").style.visibility = "hidden";
    }
}

//função que mostra ou esconde as informações do jogo
function showAbout() {
    if (!visible) {
        aboutBtn.classList.add("changeColor");
        document.getElementById("text").style.visibility = "visible";
        visible = true;
    }
    else {
        aboutBtn.classList.remove("changeColor");
        document.getElementById("text").style.visibility = "hidden";
        visible = false;
    }
}

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});

//função para embaralhar as cartas
shuffle.addEventListener('click', function () {
    cards.forEach((card) => {
        card.classList.remove("flip");
        card.addEventListener('click', flipCard);
        resetData();
    })
    main();
});

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis))
}

async function main() {
    await sleep(1000);
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
    resetData();
}

function resetData() {
    currentNumber = 4;
    number.innerHTML = currentNumber;
    hits = 0;
    txt.innerHTML = "TENTATIVAS<br>DISPONÍVEIS";
    document.getElementById("number").style.visibility = "visible";
}

//botão de ajuda sobre o jogo
aboutBtn.addEventListener('click', showAbout);
