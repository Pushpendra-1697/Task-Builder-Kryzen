const { Router } = require('express');
const UserRouter = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserModel } = require('../Models/user.model');

UserRouter.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        bcrypt.hash(password, +(process.env.Salt_rounds), async (err, secure_password) => {
            if (err) {
                console.log(err);
            } else {
                const user = new UserModel({ email, password: secure_password });
                await user.save();
                res.status(201).send({ msg: 'Registered Successfully' });
            }
        })
    } catch (err) {
        res.status(404).send({ msg: "Registation failed" });
    }
});

UserRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, results) => {
                if (results) {
                    let token = jwt.sign({ id: user[0]._id, name: user[0].name }, process.env.secret_key, { expiresIn: "365d" });
                    res.send({ msg: "Login Successfully", token, user_id: user[0]._id });
                } else {
                    res.status(201).send({ msg: "Wrong Password" });
                }
            })
        } else {
            res.status(201).send({ msg: "Wrong email" });
        }
    } catch (err) {
        res.status(404).send({ msg: "Login failed" });
    }
});

module.exports = { UserRouter };