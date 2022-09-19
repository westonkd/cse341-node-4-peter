const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Joshua Watson')
});

module.exports = routes;