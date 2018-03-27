/* eslint-disable new-cap */
'use strict';

const frontPage = require('./mocks/front-page.json');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const path = require('path');
const fetchGet = require('./fetch');


app.engine('handlebars', exphbs({
    extname: 'handlebars',
    layoutDir: './views/layouts',
    partialsDir: [
        //  path to your partials
        './views/partials'
    ]
}));
app.use(express.static(path.join(__dirname, 'public'), {
    dotfiles: 'ignore', etag: false,
    extensions: 'html',
    index: false
}));

Handlebars.registerHelper('json', function (content) {
    return JSON.stringify(content);
});

app.set('view engine', 'handlebars');

app.get('/', async (req, res) =>{
    const temp = new fetchGet();
    const tst = await temp.Get();
    console.info(tst);
    res.locals.data = tst;
    res.render('main', frontPage);
});

app.listen(8080, () => {
    console.info(' Server started\n Open http://localhost:8080/');
});


app.use(function (req, res) {
    res.status(404);
    res.send({ error: 'Not found' });


});