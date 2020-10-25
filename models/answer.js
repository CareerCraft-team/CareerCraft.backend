const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const AnswerSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    userId: {
        type: String
    },
    response: [{
        questionId: String,
        optionId: String,
    }],

}, { timestamps: true });

AnswerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Answer', AnswerSchema);