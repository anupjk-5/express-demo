const express = require("express");
const router = express.Router();
const { executeQuery, getId } = require("../helpers/utils");

router.use((req, res, next) => {
    console.log('You are in the books router');
    next();
});

// routes
router.get('/', async (req, res) => {
    const query = 'SELECT * FROM books';
    try {
        const result = await executeQuery(query, []);
        res.json({ result });
    } catch (error) {
        res.json({ error });
    }
});

router.post('/', async (req, res) => {
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

router.patch('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM books WHERE id=?";
    try {
        await executeQuery(query, [id]);
        res.json({ msg: "The entry is removed" });
    } catch (error) {
        res.json({ error });
    }
});

module.exports = router;
