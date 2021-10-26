const express = require("express");
const { executeQuery, getId } = require("./helpers/utils");
const checkToken = require('./middlewares/token');
const app = express();

// middlewares
app.use(express.json());

// routes
app.get('/books', async (req, res) => {
    const query = 'SELECT * FROM books';
    try {
        const result = await executeQuery(query, []);
        res.json({ result });
    } catch (error) {
        res.json({ error });
    }
});

app.use(checkToken);

app.post('/books', async (req, res) => {
    const { name, author, publishedOn } = req.body;
    const id = getId();
    const newRow = { id, name, author, publishedOn };

    const query = 'INSERT INTO books(id, name, author, published_on) VALUES(?, ?, ?, ?)';
    try {
        await executeQuery(query, [id, name, author, publishedOn]);
        res.json(newRow);
    } catch (error) {
        res.json({ error });
    }
});

app.patch('/books/:id', async (req, res) => {
    const { id } = req.params;
    let keyValuePairs = '';
    const params = [];
    let index = 0;

    Object.keys(req.body).forEach((key) => {
        keyValuePairs += `${key}=?`;
        params.push(req.body[key]);

        if (index < Object.keys(req.body).length - 1) {
            keyValuePairs += ',';
        }

        index += 1;
    });

    const query1 = `UPDATE books SET ${keyValuePairs} WHERE id=?;`;
    const query2 =  "SELECT * FROM books WHERE id=?";
    try {
        await executeQuery(query1, [...params, id]);
        const result2 = await executeQuery(query2, [id]);
        res.json({ result: result2 });
    } catch (error) {
        res.json({ error });
    }
});

app.delete('/books/:id', async (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM books WHERE id=?";
    try {
        await executeQuery(query, [id]);
        res.json({ msg: "The entry is removed" });
    } catch (error) {
        res.json({ error });
    }
});

// middleware vs handlers
// app.get('/books/:id', async (req, res, next) => {
//     const { id } = req.params;

//     const queryStr = 'SELECT * FROM books WHERE id=?';
//     try {
//         const [ book ] = await executeQuery(queryStr, [id]);
 
//         if (!book) return res.json({message: 'No book is found'});

//         if (parseInt(book.published_on, 10) > 2000) return next('route');

//         next();
//     } catch (error) {
//         res.send('Error');
//     }
// }, (req, res, next) => {
//     res.json({ message: 'This is not a modern literature' });
// });
  
// app.get('/books/:id', function (req, res, next) {
//     res.json({ message: 'This is a modern literature' })
// });

// server starting
app.listen(4000, () => {
    console.log('Server is running at port 4000');
});


