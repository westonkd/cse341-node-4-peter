const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts'))
router.use('/api-docs', require('./docs'));

// routes.get('/', (req, res) => {
//     res.send('Joshua Watson')
// });

module.exports = router;