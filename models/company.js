const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    company_name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    employees: [{ type: Schema.Types.ObjectId, ref: 'Recruter' }],
    vacancies: [{ type: Schema.Types.ObjectId, ref: 'Vacancy' }],
});

module.exports = mongoose.model('Company', CompanySchema);