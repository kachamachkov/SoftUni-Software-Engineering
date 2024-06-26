const http = require('http');

const { homeHandler } = require('./handlers/home');
const { errorHandler } = require('./handlers/404');
const { staticFileHander } = require('./handlers/static');
const { addBreedHandler, postBreedHandler } = require('./handlers/addBreed');
const { addCatHandler } = require('./handlers/addCat');

const routes = {
    'GET': {
        '/': homeHandler,
        '/index.html': homeHandler,
        '/cats/add-breed': addBreedHandler,
        '/cats/add-cat': addCatHandler
    },
    'POST': {
        '/cats/add-breed': postBreedHandler,
        '/cats/add-cat': addCatHandler

    }
};

http.createServer((req, res) => {
    const methodRoutes = routes[req.method];

    if (methodRoutes) {
        const route = methodRoutes[req.url]; //if we have match, it returns func
        if (typeof route == 'function') {
            route(req, res);
            return;
        }
    }


    if (staticFileHander(req, res)) {
        return;
    }

    // we either call html route or static file or 404 if we reach 21
    errorHandler(req, res);

}).listen(3000);