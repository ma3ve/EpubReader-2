const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const auth = require("./auth");

router.post("/api/register", async (req, res) => {
    const { userName, email, password } = req.body;
    const user = new User({ userName, email, password });
    try {
        await user.save();
        const token = await user.generateAuthToken();
        return res.send({
            success: true,
            token,
        });
    } catch (err) {
        // console.log(err.message);
        return res.status(400).send({
            success: false,
            error:
                err.message == "EmailUsed"
                    ? "Email already exists"
                    : "Something went wrong",
        });
    }
});

router.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.send({ success: true, token });
    } catch (error) {
        res.status(400).send({
            success: false,
            error:
                error.message == "EmailPassInc"
                    ? "Incorrect password or Email"
                    : "Something went wrong",
        });
    }
});

router.get("/api/user", auth, async (req, res) => {
    const { user } = req;

    res.send({ user });
});

router.patch("/api/user", auth, async (req, res) => {
    const { user } = req;
    try {
        await user.updateOne(req.body.user);
        await user.save();
        console.log(req.body.user);
        res.send({ success: true });
    } catch (error) {
        console.log(error);
    }
});

router.patch("/api/page/", auth, async (req, res) => {
    const { user } = req;
    const { page } = req.body;

    try {
        user.page = page;
        await user.save();
        res.send({ success: true });
    } catch (error) {
        console.log(error);
    }
});

router.patch("/api/signout", auth, async (req, res) => {
    try {
        const { user } = req;
        user.tokens = user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        user.save();
        res.send({ success: true });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
