// User model 
const User = require('../../models/User');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

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
        bcrypt.genSalt(10, (err, salt)=> {
            bcrypt.hash(newUser.password, salt, (err, hash)=> {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => {
                        res.json({
                            user: {
                                id: user.id,
                                username: user.username,
                                email: username.email,
                                cashOnHand: user.cashOnHand
                            }
                        })
                    });
            })
        })
    })
});

module.exports = router;