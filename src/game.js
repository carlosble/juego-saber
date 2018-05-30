export default function createGame(createQuestionNavigator, client) {

    var startButton;
    var questionsContainer;
    var nextQuestionButton;
    var questionTitle;
    var questionAnswers;
    var radioAnswersList;
    var timerId;
    var countdown;
    let questionNavigator;

    function start() {
        startButton = document.querySelector('.start--button');
        startButton.addEventListener('click', onStartGame);
        questionsContainer = document.querySelector('.questions__container');
        questionTitle = document.querySelector('.question--title');
        questionAnswers = document.querySelectorAll('.question--answer');
        radioAnswersList = document.querySelectorAll('.input-radio');
        nextQuestionButton = document.getElementById('next--question--button');
        nextQuestionButton.addEventListener('click', onNextQuestion);
        client.getQuestions(function (questions) {
            questionNavigator = createQuestionNavigator(questions);            
        });
    }

    function onStartGame() {
        resetCountdown();
        startTimer();
        loadNextQuestion();
    }
    function onNextQuestion() {
        loadNextQuestion();
    }
    function loadNextQuestion() {
        resetCountdown();
        if (questionNavigator.areThereNonVisitedQuestions()) {
            renderQuestion(questionNavigator.getNextQuestion());
        }
        else {
            gameOver();
        }
    }
    function gameOver() {
        hideContainerPanel();
        stopTimer();
    }

    function startTimer() {
        timerId = setInterval(function () {
            updateCountdown(onNextQuestion, timeChanged);
        }, 1000);
    }
    function stopTimer() {
        clearInterval(timerId);
    }
    function resetCountdown() {
        countdown = 10;
    }
    function timeChanged() {
        var clock = document.querySelector('.clock');
        clock.innerHTML = countdown;
    }
    function updateCountdown(onTimeout, onTimeChanged) {
        countdown--;
        if (countdown > 0) {
            onTimeChanged();
        }
        else if (countdown === 0) {
            onTimeout();
        }
    }

    function renderQuestion(question) {
        showContainerPanel();
        questionTitle.innerHTML = (question.title);
        questionTitle.setAttribute('id', question.id);
        for (var x = 0; x < question.answers.length; x++) {
            questionAnswers[x].innerHTML = (question.answers[x].answer);
            radioAnswersList[x].setAttribute('id', question.answers[x].id);
        }
    }
    function showContainerPanel() {
        questionsContainer.classList.remove('hidden');
    }
    function hideContainerPanel() {
        questionsContainer.classList.toggle('hidden');
    }

    return {
        start,
        questionsNavigator: createQuestionNavigator,
    };
}

// // be able to import the file in node
// if (typeof (module) != 'undefined') {
//     module.exports = createGame;
// }