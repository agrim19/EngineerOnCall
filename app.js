const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
    return res.render('home');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
});
