export default function createGame(createQuestionsNavigator, client) {

    let startButton;
    let questionsContainer;
    let nextQuestionButton;
    let questionTitle;
    let questionAnswers;
    let radioAnswersList;
    let timerId;
    let countdown;
    let questionNavigator;

    function start(){
        startButton = document.querySelector('.start--button');
        startButton.addEventListener('click', onStartGame);
        questionsContainer = document.querySelector('.questions__container');
        questionTitle = document.querySelector('.question--title');
        questionAnswers = document.querySelectorAll('.question--answer');
        radioAnswersList = document.querySelectorAll('.input-radio');
        nextQuestionButton = document.getElementById('next--question--button');
        nextQuestionButton.addEventListener('click', onNextQuestion);
        client.getQuestions(function (questions) {
            questionNavigator = createQuestionsNavigator(questions);
        });
    }

    function onStartGame(){
        resetCountdown();
        startTimer();
        loadNextQuestion();
    }
    function onNextQuestion(){
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
    function gameOver(){
        hideContainerPanel();
        stopTimer();
    }

    function startTimer() {
        timerId = setInterval(function(){
            updateCountdown(onNextQuestion, timeChanged);
        }, 1000);
    }
    function stopTimer(){
        clearInterval(timerId);
    }
    function resetCountdown(){
        countdown = 10;
    }
    function timeChanged() {
        let clock = document.querySelector('.clock');
        clock.innerHTML = countdown;
    }
    function updateCountdown(onTimeout, onTimeChanged){
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
        for (let i = 0; i < question.answers.length; i++) {
            questionAnswers[i].innerHTML = (question.answers[i].answer);
            radioAnswersList[i].setAttribute('id', question.answers[i].id);
        }
    }

    function showContainerPanel(){
        questionsContainer.classList.remove('hidden');
    }

    function hideContainerPanel() {
        questionsContainer.classList.toggle('hidden');
    }

    return {
        start,
        questionsNavigator: createQuestionsNavigator
    }
};
