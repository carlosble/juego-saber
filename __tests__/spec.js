const fs = require('fs');
const path = require('path');
const chai = require('chai');
const application = require('../src/main');
chai.expect();

function loadTemplate(filepath, onLoad) {
    const filePath = path.join(__dirname, filepath);
    fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
        if (!err) {
            onLoad(data);
        } else {
            console.log(err);
        }
    });
}

describe("the game", function(){
   var app;
   beforeEach(function(done){
       loadTemplate('../views/body.html', function(text){
           document.body.innerHTML = text;
           app = application();
           app.start();
           done();
       });
   });

   it('loads the markup', function(){
       expect(
           document.getElementById('start--button'))
           .not.toBeNull();
   });

   it('answers a question', function () {
       let buttonStart = document.getElementById('start--button');
       buttonStart.click();
       let firstAnswer = document.getElementsByTagName('input')[0];
       firstAnswer.click();
       let nextQuestionButton = document.getElementById('next--question--button');
       nextQuestionButton.click();
       // TODO: expect
       expect(1).toEqual(1);
   });
});