const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VacancySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    recruiter: { type: Schema.Types.ObjectId, ref: 'Recruiter' },
    salary: {
        type: String,
        required: true,
    },
    salary_type: {
        type: String,
        required: true,
        default: 'tenge',
        enum: ['tenge', 'dollars', 'rubles', 'euro'],
    },
    description: {
        type: String,
        required: true,
    },
    skills_required: {
        type: [String],
        required: true,
    },
    work_type: {
        type: String,
        required: true,
        default: 'full-time',
        enum: ['full-time', 'remote', 'part-time'],
    },
    date_published: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    candidates: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
    },
    comments: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Comments',
    },
});

module.exports = mongoose.model('Vacancy', VacancySchema);