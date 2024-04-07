const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { connection } = require('./Configs/Config');
const { UserRouter } = require('./Routes/user.route');
const { dashboardRouter } = require('./Routes/Dashboard.route')
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.text());

app.get('/', async (req, res) => {
    res.send('Welcome in Task Manager App!!!😊')
});

app.use('/users', UserRouter);
const { validate } = require('./Middleware/validate.middleware');
// app.use(validate);
app.use('/dashboard', validate, dashboardRouter);



app.listen(PORT, async () => {
    try {
        await connection;
        console.log('Connected to DB');
    } catch (err) {
        console.log('Error in connection to DB');
    }
    console.log(`Server is listening on ${PORT}`);
});