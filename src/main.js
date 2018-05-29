import createGame from './game.js';
import createQuestionsNavigator from './questionNavigator';

window.onload = function () {
    let game = createGame(createQuestionsNavigator);
    game.start();
};