import createGame from './game.js';
import createQuestionsNavigator from './questionsNavigator.js';
import createClient from './client.js';

window.onload = function () {
    let game = createGame(createQuestionsNavigator, createClient());
    game.start();
};
