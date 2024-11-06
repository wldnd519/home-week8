let words = [];
let wordIndex = 0;
let startTime = Date.now();
let bestScore = localStorage.getItem('bestScore') || null;

const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const startButton = document.getElementById('start');

const modal = document.getElementById('result-modal');
const modalMessage = document.getElementById('modal-message');
const closeModalButton = document.getElementById('close-modal');

const bestScoreElement = document.getElementById('best-score');

function displayBestScore() {
    if (bestScore !== null) {
        bestScoreElement.innerText = `Your best time is ${bestScore} seconds.`;
    } else {
        bestScoreElement.innerText = `You don't have a best time yet. Play to set one!`;
    }
}

displayBestScore();

startButton.addEventListener('click', () => {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    words = quote.split(' ');
    wordIndex = 0;

    quoteElement.innerHTML = '';
    words.forEach(word => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';

        word.split('').forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char';
            charSpan.innerText = char;
            wordSpan.appendChild(charSpan);
        });

        const spaceSpan = document.createElement('span');
        spaceSpan.innerText = ' ';
        wordSpan.appendChild(spaceSpan);

        quoteElement.appendChild(wordSpan);
    });

    quoteElement.childNodes[wordIndex].classList.add('highlight');
    messageElement.innerText = '';
    typedValueElement.value = '';
    typedValueElement.focus();
    startTime = new Date().getTime();

    typedValueElement.disabled = false;
    startButton.disabled = true;
});

typedValueElement.addEventListener('input', () => {
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value.trim();

    const currentWordElement = quoteElement.childNodes[wordIndex];
    const charElements = currentWordElement.querySelectorAll('.char');

    let correct = true;
    for (let i = 0; i < currentWord.length; i++) {
        const charElement = charElements[i];
        const typedChar = typedValue[i];

        if (typedChar == null) {
            charElement.classList.remove('correct', 'incorrect');
            correct = false;
        } else if (typedChar === currentWord[i]) {
            charElement.classList.add('correct');
            charElement.classList.remove('incorrect');
        } else {
            charElement.classList.add('incorrect');
            charElement.classList.remove('correct');
            correct = false;
        }
    }

    if (typedValue === currentWord && event.inputType === 'insertText' && event.data === ' ') {
        typedValueElement.value = '';
        currentWordElement.classList.remove('highlight');
        wordIndex++;
        if (wordIndex < words.length) {
            quoteElement.childNodes[wordIndex].classList.add('highlight');
        } else {
            const elapsedTime = new Date().getTime() - startTime;
            const elapsedSeconds = (elapsedTime / 1000).toFixed(2);
            const message = `CONGRATULATIONS! You finished in ${elapsedSeconds} seconds.`;

            if (bestScore === null || elapsedSeconds < bestScore) {
                bestScore = elapsedSeconds;
                localStorage.setItem('bestScore', bestScore);
                displayBestScore();
            }

            modalMessage.innerText = message;
            modal.style.display = 'block';

            typedValueElement.disabled = true;
            startButton.disabled = false;
        }
    } else if (typedValue === currentWord && wordIndex === words.length - 1) {
        const elapsedTime = new Date().getTime() - startTime;
        const elapsedSeconds = (elapsedTime / 1000).toFixed(2);
        const message = `CONGRATULATIONS! You finished in ${elapsedSeconds} seconds.`;

        if (bestScore === null || elapsedSeconds < bestScore) {
            bestScore = elapsedSeconds;
            localStorage.setItem('bestScore', bestScore);
            displayBestScore();
        }
        modalMessage.innerText = message;
        modal.style.display = 'block';
        typedValueElement.disabled = true;
        startButton.disabled = false;
    } else {
        
    }
});

closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
