const express = require('express')
const app = express()
const port = 3000

app.use('/', require('./routes'))

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})