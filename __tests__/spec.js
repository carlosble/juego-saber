const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const chai = require('chai');
chai.expect();

function loadTemplate(filepath, onLoad) {
    jsdom.JSDOM.fromFile
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

   beforeEach(function(done){
       loadTemplate('../templates/body.html', function(text){
           document.body.innerHTML = text;
           done();
       });
   });

   it('loads the markup', function(){
       expect(
           document.getElementById('start--button'))
           .not.toBeNull();
   });
});