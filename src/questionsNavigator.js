var saberganar = saberganar || {};

saberganar.questionsNavigator = function (questions) {
    let questionsIndex = 0;
    let nonVisitedQuestions = true;

    function areThereNonVisitedQuestions() {
        return nonVisitedQuestions;
    }

    function resetQuestions() {
        questionsIndex = 0;
    }

    function goToNextQuestion() {
        questionsIndex++;
    }

    function getNextQuestion() {
        let question = questions[questionsIndex];
        goToNextQuestion();
        if (questionsIndex >= questions.length) {
            nonVisitedQuestions = false;
            resetQuestions();
        }
        return question;
    }

    return {
        areThereNonVisitedQuestions,
        getNextQuestion: getNextQuestion
    };
};

// be able to import the file in node
if (typeof(module) != 'undefined'){
    module.exports = saberganar;
}

