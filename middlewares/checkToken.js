// function to check authorization based on token
const checkToken = (req, res, next) => {
    const { token } = req.query;

    if (token === 'abcd1234') {
        next();
    } else if(token === 'abcd123') {
        throw new Error('Invalid token');
    } else {
        res.status(400).json({ message: 'Unauthorized' });
    }
};

module.exports = checkToken;