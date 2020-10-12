const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    language: {
        type: String,
        required: true,
        default: 'en',
        enum: ['en', 'ru', 'kz'],
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    questions: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
    },
    resumes: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Resume',
    },
});

module.exports = mongoose.model('Employee', EmployeeSchema);