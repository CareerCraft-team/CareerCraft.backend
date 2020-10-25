const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    title: {
        type: String,
        required: true,
    },
    questionType: {
        type: String,
        default: 'text',
        enum: ['multiple-choise', 'single-choise', 'text'],
    },
    description: {
        type: String,
        default: "",
    },
    correctAnswer: {
        type: String,
    },
    questions: [{
        open: { type: Boolean, default: false },
        questionText: String,
        questionImage: { type: String, default: "" },
        options: [{
            optionText: String,
            optionImage: { type: String, default: "" },
        }],
    }],
    stared: { type: Boolean, default: false },
    formType: { type: String }

}, { timestamps: true });
FormSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Question', QuestionSchema);