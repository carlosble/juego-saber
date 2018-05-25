import createGame from '../src/game';
import createQuestionsNavigator from '../src/questionsNavigator';
const pug = require('pug');

describe("the questions navigator", () => {
    let questions = [
        {
            id: 10,
            title: 'Foo',
            answers: [
                {id: 0, answer: '25'},
                {id: 1, answer: '33'},
                {id: 2, answer: '37'}
            ],
            correctAnswer: {id: 2}
        },
        {
            id: 11,
            title: 'Pero que dices muchacho?',
            answers: [
                {id: 0, answer: 'Lusaka'},
                {id: 1, answer: 'Harare'},
                {id: 2, answer: 'Canarias'}
            ],
            correctAnswer: {id: 2}
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

    it("does not repeat the last question", () => {
        let question1 = questionsNavigator.getNextQuestion();
        let question2 = questionsNavigator.getNextQuestion();
        let question3 = questionsNavigator.getNextQuestion();

        expect(question1).not.toEqual(question2);
        expect(question2).not.toEqual(question3);
    });

    it("knows when the questions are all visited", () => {
        questionsNavigator.getNextQuestion();
        expect(questionsNavigator.areThereNonVisitedQuestions()).toBeTruthy();
        questionsNavigator.getNextQuestion();
        expect(questionsNavigator.areThereNonVisitedQuestions()).toBeFalsy();
    });
});

describe("the game", function () {
    let game;
    let questions = [
        {
            id: 10,
            title: 'Foo',
            answers: [
                {id: 0, answer: '25'},
                {id: 1, answer: '33'},
                {id: 2, answer: '37'}
            ],
            correctAnswer: {id: 2}
        },
        {
            id: 11,
            title: 'Pero que dices muchacho?',
            answers: [
                {id: 0, answer: 'Lusaka'},
                {id: 1, answer: 'Harare'},
                {id: 2, answer: 'Canarias'}
            ],
            correctAnswer: {id: 2}
        }
    ];
    beforeEach(function () {
        document.body.innerHTML = pug.compileFile('./views/main.pug', null)();
        game = createGame(createQuestionsNavigator);
        game.setServerData(questions);
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
        startGame();
        selectFirstAnswer();
        goToNextQuestion();
        const counterInDOM = document.querySelector(".clock");

        function onTimeout() {
            expect(parseInt(counterInDOM.innerHTML)).toEqual(9);
            done();
        }

        setTimeout(onTimeout, 1000);
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
