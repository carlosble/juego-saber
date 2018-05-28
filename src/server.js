const express = require('express');
const app = express();

// CONFIGURATION:
app.use(express.static('src'));
app.set('view engine', 'pug');
app.set('views', 'views');

// ROUTES:
app.get('/', (req, res) => {
    res.render('index', {'variable': 'Aida'});
});

app.get('/api/questions', (request, response) => {
    let questions = [{id: 1}, {id: 2}, {id: 3}];
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify(questions));
});

// START APP
app.listen(3000, () => console.log('Example app listening on port 3000!'))