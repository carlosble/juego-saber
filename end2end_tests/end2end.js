
var chromedriver = require('chromedriver');

module.exports = {
    before: function(done){
      chromedriver.start();
      done();
    },
    after: function(done){
      chromedriver.stop();
      done();
    },
    'Demo test' : function (browser) {
        console.log('Browser:', browser);
        browser
            .url(browser.launchUrl)
            // ...
            .end();
    }
};