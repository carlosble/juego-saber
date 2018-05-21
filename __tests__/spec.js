const fs = require('fs');
const pug = require('pug');
const path = require('path');
const chai = require('chai');
const application = require('../src/main');
chai.expect();

// function loadTemplate(filepath, onLoad) {
//     const filePath = path.join(__dirname, filepath);
//     fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
//         if (!err) {
//             onLoad(data);
//         } else {
//             console.log(err);
//         }
//     });
// }

describe("the game", function () {
    var app;
    var questions = [
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
        app = application();
        app.setServerData(questions);
        app.start();
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
        console.log(1);
        selectFirstAnswer();
        console.log(2);
        goToNextQuestion();
        console.log(3);
        const counterInDOM = document.querySelector(".clock");
        console.log(4);
        setTimeout(function () {
            console.log(5);
            expect(parseInt(counterInDOM.innerHTML)).toEqual(9);
            console.log(6);
            done();
            console.log(7);
        }, 1000);
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