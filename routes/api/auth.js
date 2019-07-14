const User = require('../../models/User');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route    POST api/auth
//@desc     Authenticate the user
//@access   Public
router.post('/login', (req, res)=> {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({'msg':'Invalid User Fields'});
    }
    User.findOne({email})
    .then(user => {
        if(!user) return res.status(400).json({'msg':'User does not exist'});

        // Validate password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (!isMatch) return res.status(400).json({"msg":"Invalid credentials"});
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
                        });
                    }
                ) 
            })
        
    })
});

module.exports = router;