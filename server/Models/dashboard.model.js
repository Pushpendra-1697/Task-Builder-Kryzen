const { Schema, model } = require("mongoose");
const dashboardSchema = new Schema({
    name: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, {
    versionKey: false
});

const DashboardModel = model('bugs', dashboardSchema);
module.exports = { DashboardModel };