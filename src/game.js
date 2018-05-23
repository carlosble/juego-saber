export default function createGame(questionsNavigator) {

    let questions = [];
    let serverData = null;
    let startButton;
    let questionsContainer;
    let nextQuestionButton;
    let questionTitle;
    let questionAnswers;
    let radioAnswersList;
    let timerId;
    let countdown;
    let theQuestionNavigator;


    function start(){
        startButton = document.querySelector('.start--button');
        startButton.addEventListener('click', onStartGame);
        questionsContainer = document.querySelector('.questions__container');
        questionTitle = document.querySelector('.question--title');
        questionAnswers = document.querySelectorAll('.question--answer');
        radioAnswersList = document.querySelectorAll('.input-radio');
        nextQuestionButton = document.getElementById('next--question--button');
        nextQuestionButton.addEventListener('click', onNextQuestion);
        getQuestions(function (data) {
            questions = data;
            theQuestionNavigator = questionsNavigator(questions);
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
        if (theQuestionNavigator.areThereNonVisitedQuestions()) {
            renderQuestion(theQuestionNavigator.getNextQuestion());
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

    function getQuestions(callback) {

        serverData = serverData || [
            {
                id: 1,
                title: '¿Cuántos años tiene María?',
                answers: [
                    {id: 0, answer: '25'},
                    {id: 1, answer: '33'},
                    {id: 2, answer: '37'}
                ],
                correctAnswer: {id: 1}
            },
            {
                id: 2,
                title: '¿Cuál es la capital de Zambia?',
                answers: [
                    {id: 0, answer: 'Lusaka'},
                    {id: 1, answer: 'Harare'},
                    {id: 2, answer: 'Madrid'}
                ],
                correctAnswer: {id: 0}
            },
            {
                id: 3,
                title: '¿Cuál es el nombre completo de Freud?',
                answers: [
                    {id: 0, answer: 'Adolf'},
                    {id: 1, answer: 'Sefarad'},
                    {id: 2, answer: 'Sigmund'}
                ],
                correctAnswer: {id: 2}
            },
            {
                id: 4,
                title: '¿Cuál es el animal más rápido del mundo?',
                answers: [
                    {id: 0, answer: 'Guepardo'},
                    {id: 1, answer: 'León'},
                    {id: 2, answer: 'Tortuga'}
                ],
                correctAnswer: {id: 0}
            }
        ];
        callback(serverData);
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
        setServerData: function(data){
            serverData = data;
        },
        questionsNavigator
    }
};