const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { createUserToken } = require('../middleware/auth')

// CREATE.
router.post('/login', (req, res) => {
    // res.send("We've hit the /api/login POST route.")
    User.findOne( {email: req.body.email })
    .then(foundUser => createUserToken (req, foundUser))
    .then(token => res.json( {token} )) // Using curly braces returns JSON object with 'token' as the key and a string value. Without curly braces, it only returns the string value.
    .catch( err => console.log( 'ERROR LOGGING IN:', err ))
})

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hashedPassword => ({
        email: req.body.email,
        password: hashedPassword,
        motto: req.body.motto
    }))
    .then(hashedUser => {
        User.create(hashedUser) // hashedUser is a javascript object that gets sent to and created in Mongo.
        // .then(createdUser => res.json(createdUser))
        .then(createdUser => createUserToken(req, createdUser)) // Creating a token.
        .then(token => res.json({token})) // Sending that token to the frontend.
        .catch(err => console.log('ERROR CREATING USER', err))
    })
    // res.send("We've hit the /api/signup POST route.")
})

module.exports = router