const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

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
        // required: true,
    },
    language: {
        type: String,
        // required: true,
        default: 'en',
        enum: ['en', 'ru', 'kz'],
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    avatar: {
        type: String,
        // required: true,
    },
    questions: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
    },
    resumes: {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: 'Resume',
    },
});

EmployeeSchema.pre('save', function(next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

EmployeeSchema.methods.comparePassword = function(password, next) {
    let user = this;
    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('Employee', EmployeeSchema);