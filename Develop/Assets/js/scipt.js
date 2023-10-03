var timeLeft = 60;
var timerInterval;
var questionIndex = 0;

var startButton = document.getElementById("start-button");
var choicesDiv = document.getElementById('choices');
var answerChoicesEl = document.getElementById('answerCheck');
var timerEl = document.getElementById("time-left");

startButton.addEventListener("click", startQuiz);
choicesDiv.addEventListener("click", checkAnswer);


//activates when ever start button is clicked
function startQuiz() {
    document.getElementById("start-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    startButton.setAttribute('class', 'hide');
    
    loadQuestion();

    timerInterval = setInterval(updateTimer, 1000);
}

//loads question and answer choices
function loadQuestion () {
    var currentQuestion = questions[questionIndex];

    console.log(questions[questionIndex]);

    var questionDiv = document.getElementById("question-text");
    questionDiv.textContent = currentQuestion.title;

    for (var i = 0; i < currentQuestion.choice.length; i++) {
        var choice = currentQuestion.choice[i];
        var choiceEl = document.createElement('button');

        choiceEl.setAttribute('class', 'choice');
        choiceEl.setAttribute('value',  choice);

        choiceEl.textContent = i + 1 + '. ' + choice;

        choicesDiv.appendChild(choiceEl);
    }
}

// timer starts once start button is clicked
function updateTimer() {
    timerEl.textContent = timeLeft;
    if(timeLeft === 0) {
        clearInterval(timerInterval);
        alert("Time's up quiz over!");
    } else {
        timeLeft--
    }
}

function checkAnswer() {
    
}

// removed event from parameters
// function checkAnswer(event) {
//     var buttonEl = event.target;
//      if user clicks element outside of button choices return null value or do nothing
//     if (!buttonEl.matches(".choices")) {
//         return;
//     }

//     if (buttonEl.value !== questions[questionIndex].correctAnswer) {
//         timeLeft -= 10;

//         if(timeLeft < 0 ) {
//             timeLeft = 0;
//         }

//         timerEl.textContent = timeLeft;

//         answerChoicesEl.textContent = "Incorrect";
//     } else {
//         answerChoicesEl.textContent = "Correct";
//     }
// }
