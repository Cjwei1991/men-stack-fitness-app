const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const alltUsers = await User.find({});

        res.render('users/users_index.ejs', {
            users: alltUsers,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:userId', async (req, res) => {
    try {

        const user = await User.findById(req.params.userId);
        res.render('users/user_show.ejs', {
            user: user,
        })
    } catch (error) {

        console.log(error);
        res.redirect('/');
    }
});


// router logic will go here - will be built later on in the lab

module.exports = router;