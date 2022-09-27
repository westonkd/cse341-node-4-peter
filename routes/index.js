const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts'))

// routes.get('/', (req, res) => {
//     res.send('Joshua Watson')
// });

module.exports = router;