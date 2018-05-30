const pug = require('pug');
import createGame from '../src/game';
import createQuestionsNavigator from '../src/questionsNavigator';
import createClientApi from '../src/clientApi';

xdescribe("the questions navigator", () => {
    let questions = [
        {
            id: 10,
            title: 'Foo',
            answers: [
                { id: 0, answer: '25' },
                { id: 1, answer: '33' },
                { id: 2, answer: '37' }
            ],
            correctAnswer: { id: 2 }
        },
        {
            id: 11,
            title: 'Pero que dices muchacho?',
            answers: [
                { id: 0, answer: 'Lusaka' },
                { id: 1, answer: 'Harare' },
                { id: 2, answer: 'Canarias' }
            ],
            correctAnswer: { id: 2 }
        }
    ];
    let questionsNavigator;
    beforeEach(function () {
        questionsNavigator = createQuestionsNavigator(questions);
    });
    it("gest the current question", () => {

        let question = questionsNavigator.getNextQuestion();
        expect(questions).toContain(question);
    });
    it("is always pointing to a question", () => {

        let question = questionsNavigator.getNextQuestion();
        expect(questions).toContain(question);
    });
    it("is always pointing to a question", () => {

        questionsNavigator.getNextQuestion();
        questionsNavigator.getNextQuestion();
        questionsNavigator.getNextQuestion();
        questionsNavigator.getNextQuestion();

        let question = questionsNavigator.getNextQuestion();
        expect(questions).toContain(question);
    });
    it("get a diferent question", () => {

        let initialQuestion = questionsNavigator.getNextQuestion();
        let initialQuestionId = initialQuestion.id;

        let firstQuestion = questionsNavigator.getNextQuestion();
        let firstQuestionId = firstQuestion.id;
        expect(firstQuestionId).not.toEqual(initialQuestionId);

        let nextQuestion = questionsNavigator.getNextQuestion();
        let nextQuestionId = nextQuestion.id;
        expect(nextQuestionId).not.toEqual(firstQuestionId);

        let nextQuestionAgain = questionsNavigator.getNextQuestion();
        let nextQuestionAgainId = nextQuestionAgain.id;
        expect(nextQuestionAgainId).not.toEqual(nextQuestionId);
    });
});

describe("the game", function () {
    let game;
    let questions = [
        {
            id: 10,
            title: 'Foo',
            answers: [
                { id: 0, answer: '25' },
                { id: 1, answer: '33' },
                { id: 2, answer: '37' }
            ],
            correctAnswer: { id: 2 }
        },
        {
            id: 11,
            title: 'Pero que dices muchacho?',
            answers: [
                { id: 0, answer: 'Lusaka' },
                { id: 1, answer: 'Harare' },
                { id: 2, answer: 'Canarias' }
            ],
            correctAnswer: { id: 2 }
        }
    ];
    beforeEach(function () {
        document.body.innerHTML = pug.compileFile('./views/main.pug', null)();
        let stubClient;

        stubClient = {
            getQuestions: function (callback) {
                callback(questions);
            }
        }
        game = createGame(createQuestionsNavigator, stubClient);
        game.start();
    });

    it('loads the markup', function () {
        expect(
            document.getElementById('start--button'))
            .not.toBeNull();
    });

    it('answers a question', function () {
        startGame();
        selectFirstAnswer();

        goToNextQuestion();

        assertThatSecondQuestionIsRendered();
    });

    it("restart the counter time", function (done) {
        //    startGame();
        // selectFirstAnswer();
        // goToNextQuestion();
        // const counterInDOM = document.querySelector(".clock");
        // expect(parseInt(counterInDOM.innerHTML)).toEqual(9);
        startGame();
        console.log(1);
        selectFirstAnswer();
        console.log(2);
        goToNextQuestion();
        console.log(3);
        const counterInDOM = document.querySelector(".clock");
        console.log(4);
        function onTimeout() {
            console.log(5);
            expect(parseInt(counterInDOM.innerHTML)).toEqual(9);
            console.log(6);
            done();
            console.log(7);
        }
        setTimeout(onTimeout, 1000);
        console.log(8);
    });

    function getQuestionTitleElement() {
        let questionTitle = document.querySelector('.question--title');
        return questionTitle;
    }

    function expectFirstQuestionToBeRendered() {
        let questionTitle = getQuestionTitleElement();
        expect(Number(questionTitle.id)).toEqual(Number(questions[0].id));
    }

    function startGame() {
        let buttonStart = document.getElementById('start--button');
        buttonStart.click();
        expectFirstQuestionToBeRendered();
    }

    function selectFirstAnswer() {
        let firstAnswer = document.getElementsByTagName('input')[0];
        firstAnswer.click();
    }

    function goToNextQuestion() {
        let nextQuestionButton = document.getElementById('next--question--button');
        nextQuestionButton.click();
    }

    function assertThatSecondQuestionIsRendered() {
        let questionTitle = getQuestionTitleElement();
        expect(Number(questionTitle.id)).toEqual(Number(questions[1].id));
        expect(questionTitle.innerHTML).toEqual(questions[1].title);
    }
});