let speedTypingTest = document.getElementById('speedTypingTest');
let span = document.getElementById('span');
let timer = document.getElementById('timer');
let quoteDisplay = document.getElementById('quoteDisplay');
let result = document.getElementById('result');
let quoteInput = document.getElementById('quoteInput');
let submitBtn = document.getElementById('submitBtn');
let resetBtn = document.getElementById('resetBtn');
let spinner = document.getElementById('spinner');

let startBtn = document.getElementById("startBtn");

let url = "https://apis.ccbp.in/random-quote";
let options = { method: "GET" };

// Fetch Quote
function getquote() {
    spinner.classList.remove('d-none');
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinner.classList.add('d-none');
            quoteDisplay.textContent = jsonData.content;
        });
}

let count = 0;
let unquiid = null;

// ✅ Start Button — Starts Timer & Loads Quote
startBtn.addEventListener("click", function () {
    count = 0;
    span.textContent = count;
    result.textContent = "";
    quoteInput.value = "";

    getquote();  // Load new quote

    // Clear previous timer if any
    clearInterval(unquiid);

    // Start new timer
    unquiid = setInterval(function () {
        count++;
        span.textContent = count;
    }, 1000);
});

// Accuracy Calculation
function calculateAccuracy(originalText, userText) {
    let correctCount = 0;
    let length = Math.min(originalText.length, userText.length);

    for (let i = 0; i < length; i++) {
        if (originalText[i] === userText[i]) {
            correctCount++;
        }
    }

    let accuracy = (correctCount / originalText.length) * 100;
    return accuracy.toFixed(2);
}

// Submit Button
submitBtn.addEventListener('click', function() {
    let userText = quoteInput.value.trim();
    let quoteText = quoteDisplay.textContent.trim();

    clearInterval(unquiid);

    let accuracy = calculateAccuracy(quoteText, userText);

    if (userText === quoteText) {
        result.textContent = `✅ Perfect! You typed correctly in ${count} seconds with 100% accuracy!`;
    } else {
        result.textContent = `⏱ You finished in ${count} seconds.\n🎯 Accuracy: ${accuracy}%`;
    }
});

// Reset Button
resetBtn.addEventListener('click', function() {

    count = 0;
    span.textContent = count;
    quoteInput.value = "";
    result.textContent = "";
    getquote();

    clearInterval(unquiid);
    unquiid = setInterval(function() {
        count++;
        span.textContent = count;
    }, 1000);
});
