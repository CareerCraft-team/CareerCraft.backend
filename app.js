const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const UserEmployee = require('./models/user_employee');
const UserRecruter = require('./models/user_recruter');

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

const profileRoutes = require('./routes/profile');
const createResumeRoutes = require('./routes/create-resume');
const createVacancyRoutes = require('./routes/create-vacancy');

app.use('/api', profileRoutes);
app.use('/api', createResumeRoutes);
app.use('/api', createVacancyRoutes);

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Running on port 3000');
    }
});