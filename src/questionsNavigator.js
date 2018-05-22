export default function questionsNavigator(questions) {
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

