const { Router } = require('express');
const { DashboardModel } = require('../Models/dashboard.model');
const dashboardRouter = Router();
const jwt = require('jsonwebtoken');


dashboardRouter.get('/', async (req, res) => {
    const { token } = req.headers;
    userId = jwt.decode(token, process.env.secret_key).id;
    try {
        const bugs = await DashboardModel.find({ userId });
        res.send(bugs);
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

dashboardRouter.post('/post', async (req, res) => {
    let { name } = req.body;
    const { token } = req.headers;
    userId = jwt.decode(token, process.env.secret_key).id;
    const paylaod = { name, userId };

    try {
        const bugs = new DashboardModel(paylaod);
        await bugs.save();
        res.status(200).send(bugs);
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

dashboardRouter.patch('/patch/:id', async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        await DashboardModel.findByIdAndUpdate({ _id: id }, payload);
        let bug = await DashboardModel.findOne({ _id: id });
        res.status(200).send(bug);
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

dashboardRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let bug = await DashboardModel.findByIdAndDelete({ _id: id });
        res.send(bug);
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

module.exports = { dashboardRouter };