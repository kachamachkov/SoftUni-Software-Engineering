const express = require('express');
const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();
const port = 5007;

configHandlebars(app);
configExpress(app);

app.use(routes);

// dealing with edge case of server starting BEFORE DB
// connect DB first, then start server
mongoose.connect('mongodb://localhost:27017/magic-movies')
    .then(() => {
        console.log('DB connected');

        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    })
    .catch(err => console.log('Cannot connect to DB'));

// mongoose.connection.on('error', (err) => console.log(err));