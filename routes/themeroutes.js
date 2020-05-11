const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const auth = require("./auth");

router.patch("/api/theme", auth, async (req, res) => {
    const { user } = req;
    try {
        user.theme = req.body.theme;
        await user.save();
        // console.log(req.body.user);
        res.send({ success: true });
    } catch (error) {
        console.log(error);
    }
});

router.patch("/api/fontSize", auth, async (req, res) => {
    const { user } = req;
    try {
        user.fontSize = req.body.fontSize;
        await user.save();
        // console.log(req.body.user);
        res.send({ success: true });
    } catch (error) {
        console.log(error);
    }
});

router.patch("/api/flow", auth, async (req, res) => {
    const { user } = req;
    try {
        user.flow = req.body.flow;
        await user.save();
        res.send({ success: true });
    } catch (error) {
        console.log(error);
    }
});
module.exports = router;
