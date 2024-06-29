const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get("/", (req, res) => {
    res.render('index', { title: "Home Page" });
});

router.post("/add-user", async (req, res) => {
    const { name, email, phone, image } = req.body;
    try {
        const user = new User({ name, email, phone, image });
        await user.save();
        req.session.message = {
            type: 'success',
            intro: 'Success:',
            message: 'User added successfully!'
        };
        res.redirect('/');
    } catch (error) {
        req.session.message = {
            type: 'danger',
            intro: 'Error:',
            message: error.message
        };
        res.redirect('/');
    }
});

module.exports = router;
