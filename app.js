const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

mongoose.connect(
    process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to DB');
        }
    }
);

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const companyRoutes = require('./routes/company');
const employeeRoutes = require('./routes/employee');
const questionRoutes = require('./routes/question');
const recruiterRoutes = require('./routes/recruiter');
const resumeRoutes = require('./routes/resume');
const vacancyRoutes = require('./routes/vacancy');

app.use('/api', companyRoutes);
app.use('/api', employeeRoutes);
app.use('/api', questionRoutes);
app.use('/api', recruiterRoutes);
app.use('/api', resumeRoutes);
app.use('/api', vacancyRoutes);

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Running on port 3000');
    }
});