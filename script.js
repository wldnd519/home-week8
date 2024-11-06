let words = [];
let wordIndex = 0;
let startTime = Date.now();

const quotes = [
    '2024 10 25',
    '집에 가고싶다',
    '과제는 깃헙 주소를 나한테',
    '파일 폴더 만들어서 나한테',
    '시원해 지고 싶다',
    '과제는 언제까지',
    'a b c d e',
];

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const startButton = document.getElementById('start');


startButton.addEventListener('click', () => {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    words = quote.split(' ');
    wordIndex = 0;
    const spanWords = words.map(word => `<span>${word} </span>`);
    quoteElement.innerHTML = spanWords.join('');
    quoteElement.childNodes[0].className = 'highlight';
    messageElement.innerText = '';
    typedValueElement.value = '';
    typedValueElement.focus();
    startTime = new Date().getTime();

    typedValueElement.disabled = false;
    startButton.disabled = true;
});

typedValueElement.addEventListener('input', () => {
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        const elapsedTime = new Date().getTime() - startTime;
        const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
        messageElement.innerText = message;
        typedValueElement.disabled = true;
        startButton.disabled = false;

    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        typedValueElement.value = '';
        wordIndex++;
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }
        quoteElement.childNodes[wordIndex].className = 'highlight';

    } else if (currentWord.startsWith(typedValue)) {
        typedValueElement.className = '';

    } else {
        typedValueElement.className = 'error';
    }
});
