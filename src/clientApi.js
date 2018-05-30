export default function createClientApi() {
    function getQuestions(callback) {
        var request = new XMLHttpRequest();
        request.addEventListener("load", function () {
            let questions = JSON.parse(request.responseText);
            callback(questions);
            
        });
        request.addEventListener("error", function(){
            alert("No se han podido cargar los datos. Vuelva a intentarlo más tarde.");
        });
        request.open("GET", '/api/questions');      
        request.send();
       
    }
    return{
        getQuestions
    };
}