const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Rebecca Leach')
});

module.exports = routes;