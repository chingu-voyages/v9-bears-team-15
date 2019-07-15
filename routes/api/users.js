const User = require('../../models/User');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route    POST api/users
//@desc     Register a new user
//@access   Public
router.post('/', (req, res)=> {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({'msg':'Invalid User Fields'});
    }
    User.findOne({email})
    .then(user => {
        if(user) return res.status(400).json({'msg':'User already exists'});

        const newUser = new User({
            username, email, password
        })
        //TODO: refactor using async/await to avoid promise then nesting
        bcrypt.genSalt(10, (err, salt)=> {
            bcrypt.hash(newUser.password, salt, (err, hash)=> {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => {
                        jwt.sign(
                            { id: user.id },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err; 
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        username: user.username,
                                        email: user.email,
                                        cashOnHand: user.cashOnHand
                                    }
                                })
                            }
                        )  
                    });
            })
        })
    })
});

module.exports = router;