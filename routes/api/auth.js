const User = require('../../models/User');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

//@route    POST api/auth/login
//@desc     Login the User
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


//@route    POST api/auth/logout
//@desc     Logout User
//@access   Private
router.post('/logout', auth, (req, res)=> {
    
});

//@route    GET api/auth/user
//@desc     Get user data
//@access   Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
     .select('-password')
     .then(user => res.json(user))
});

module.exports = router;