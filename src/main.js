import createGame from './game.js';
import createQuestionsNavigator from './questionsNavigator.js';
import createClientApi from './clientApi.js';

window.onload = function () {
    let game = createGame(createQuestionsNavigator, createClientApi);
    game.start();
};