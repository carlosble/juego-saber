import createGame from './game.js';
import createQuestionsNavigator from './questionsNavigator.js';

window.onload = function () {
    let game = createGame(createQuestionsNavigator);
    game.start();
};