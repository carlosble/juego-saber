export default function createClient(onRequestFinished) {

    function getQuestions(callback) {
        let request = new XMLHttpRequest();
        request.addEventListener("load", () => {
            let questions = JSON.parse(request.responseText);
            callback(questions);
            if (typeof (onRequestFinished) != 'undefined'){
                onRequestFinished();
            }
        });
        request.open("GET", 'http://localhost:3000/api/questions');
        request.send();
    }

    return {
        getQuestions
    }
};
