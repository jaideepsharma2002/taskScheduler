const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    userid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "add the userid"]
    },
    title: {
        type: String,
        required: [true,"add the task"]
    },
    type: {
        type: String,
        enum: ['note','reminder'],
        required: [true, "added the type of task"]
    }
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("Task", taskSchema);