export default function createClientApi() {
    function getQuestions(callback, errorCallback) {
        var request = new XMLHttpRequest();
        request.addEventListener("load", function () {
            let questions = JSON.parse(request.responseText);
            callback(questions);
            
        });
        request.addEventListener("error", function(error){
            errorCallback("No se han podido cargar los datos. Vuelva a intentarlo más tarde. " + error.target.status);
        });
        request.open("GET", '/api/questions');      
        request.send();
       
    }
    return{
        getQuestions
    };
}