const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send('<h2>This is a h2 tag</h2>');
});

app.get('/about', (req, res) => {
    res.send('<h1>This is a h1 tag</h1>');
});

app.listen(4000, () => console.log('Server is running at 4000'));