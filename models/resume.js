const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResumeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    expected_salary: {
        type: String,
        required: true,
    },
    education: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: 'Education',
    },
    work_experience: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: 'Work_Experience',
    },
    skills: {
        type: [String],
        required: true,
    },
    languages: {
        type: [String],
        required: true,
    },
    comments: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: 'Comments',
    },
});