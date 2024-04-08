const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const pdfkit = require('pdfkit');
const { connection } = require('./Configs/Config');
const { UserRouter } = require('./Routes/user.route');
const { dashboardRouter } = require('./Routes/Dashboard.route')
const PORT = process.env.PORT || 3000;
const { validate } = require('./Middleware/validate.middleware');
const { DashboardModel } = require('./Models/dashboard.model');


app.use(cors());
app.use(express.json());
app.use(express.text());

app.get('/', async (req, res) => {
    res.send('Welcome in Task Manager App!!!😊')
});

app.use('/users', UserRouter);
app.use('/dashboard', validate, dashboardRouter);

app.get('/download/pdf', async (req, res) => {
    try {
        const data = await DashboardModel.find();
        const organizeDataByStatus = (data) => {
            const organizedData = {};
            data.forEach(task => {
                const { status } = task;
                if (!organizedData[status]) {
                    organizedData[status] = [];
                }
                organizedData[status].push(task);
            });

            return organizedData;
        };
        const organizedData = organizeDataByStatus(data);
        function formatDate(timestamp) {
            const date = new Date(timestamp);

            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
            const day = date.getDate();
            const monthIndex = date.getMonth();
            const year = date.getFullYear();
            const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
            return formattedDate;
        };
        const doc = new pdfkit();
        doc.pipe(res);
        for (const status in organizedData) {
            doc.fontSize(25).text(status);
            organizedData[status].forEach(task => {
                doc.fontSize(14).text(`Title: ${task.title}`);
                doc.text(`Description: ${task.description}`);
                doc.text(`Assignee: ${task.assignee}`);
                doc.text(`Priority: ${task.priority}`);
                doc.text(`StartDate: ${formatDate(task.startDate)}`);
                doc.moveDown();
            });
        }
        doc.end();
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, async () => {
    try {
        await connection;
        console.log('Connected to DB');
    } catch (err) {
        console.log('Error in connection to DB');
    }
    console.log(`Server is listening on ${PORT}`);
});