export default function createClient() {

    function getQuestions(callback) {
        let request = new XMLHttpRequest();
        request.addEventListener("load", () => {
            let questions = JSON.parse(request.responseText);
            callback(questions);
        });
        request.open("GET", '/api/questions');
        request.send();
    }

    return {
        getQuestions
    }
};
