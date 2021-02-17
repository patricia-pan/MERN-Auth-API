const express = require('express')
const router = express.Router()

// CREATE.
router.post('/login', (req, res) => {
    res.send("We've hit the /api/login POST route.")
})

router.post('/signup', (req, res) => {
    res.send("We've hit the /api/signup POST route.")
})

module.exports = router