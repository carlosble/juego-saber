export default function createQuestionNavigator(questions) {
    let questionsIndex = 0;
    let nonVisitedQuestions = true;
    function areThereNotVisitedQuestions() {
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
        areThereNotVisitedQuestions,
        getNextQuestion
    };
}
