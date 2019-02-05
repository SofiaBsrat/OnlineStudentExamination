const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    student_id: String,
    entry: String,
    date_of_birth: Date,
    invitation: {
        token: String,
        status: String,
        valid: Boolean
    },
    exam: {
        snapshots: [],
        result: Boolean,
        published: Boolean
    }
}
);

// studentSchema.index({student_id: 1, name: 1});
//{type: String, index: true, unique: true},
//, { _id : false }

module.exports = mongoose.model('Student', studentSchema);