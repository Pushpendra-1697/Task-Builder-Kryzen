const { Schema, model } = require("mongoose");
const dashboardSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    assignee: String,
    priority: String,
    startDate: { type: Date, required: true },
    status: { type: String, required: true },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, {
    versionKey: false, timestamps: true
});

const DashboardModel = model('bugs', dashboardSchema);
module.exports = { DashboardModel };