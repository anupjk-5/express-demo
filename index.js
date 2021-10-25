const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/') {
        res.write('<html>');
        req.write('<head><title>Node Server</title></head>');
        res.write('<body><h2>This is a h2 tag</h2></body>');
        res.write('</html>');
        return res.end();
    } 
    if (url === '/about') {
        res.write('<html>');
        req.write('<head><title>Node Server</title></head>');
        res.write('<body><h1>This is a h1 tag</h1></body>');
        res.write('</html>');
        return res.end();
    }
});

server.listen(4000, () => console.log('Server is running at 4000'));