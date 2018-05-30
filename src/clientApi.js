export default function createClientApi() {
    function getQuestions(callback) {
        var request = new XMLHttpRequest();
        request.addEventListener("load", function () {
            let questions = JSON.parse(this.responseText);
            callback(questions);
        });
        request.open("GET", '/api/questions');
        request.send();
    }
    return{
        getQuestions
    };
}