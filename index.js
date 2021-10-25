const express = require("express");
const authorsRouter = require('./routers/authors');
const booksRouter = require('./routers/books');
const app = express();

// middlewares
app.use(express.json({ extended: true }));

app.use('/authors', authorsRouter);
app.use('/books', booksRouter);

// server starting
app.listen(4000, () => {
    console.log('Server is running at port 4000');
});


