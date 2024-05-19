const http = require('http');
const { homeHandler } = require('../handlers/home');
const { staticFileHandler } = require('../handlers/static');
const { addBreedHandler } = require('../handlers/addBreed');

const routes = {
    '/': homeHandler,
    '/index.html': homeHandler,
    '/cats/add-breed': addBreedHandler
};

http.createServer((req, res) => {
    const route = routes[req.url];

    if (typeof route == 'function') {
        route(req, res);
        return;
    } else if (staticFileHandler(req, res)) {
        return;
    }
    res.writeHead(404, [
        'Content-Type', 'text/plain'
    ]);
    res.write('404');
    res.end();

}).listen(3000);