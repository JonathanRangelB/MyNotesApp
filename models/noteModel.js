const mongoose = require("mongoose")
const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content:{
        required: true,
        type: String
    },
    noteCreationDate:{
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("notes",noteSchema)