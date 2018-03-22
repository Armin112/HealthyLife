const express = require('express');
const app = express();

app.use('/', express.static('static'));

app.listen(3200, () => console.log('Proba da vidimo da li radi'));
