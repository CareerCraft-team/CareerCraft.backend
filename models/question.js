const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    question_type: {
        type: String,
        default: 'text',
        enum: ['multiple-choise', 'single-choise', 'text'],
    },
    description: {
        type: String,
        required: true,
    },
});