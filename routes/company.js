const router = require('express').Router();
const Company = require('../models/company');
const upload = require('../middlewares/upload-photo');

router.post('/company', upload.single('photo'), async(req, res) => {
    try {
        let company = new Company();
        company.company_name = req.body.company_name;
        company.avatar = req.body.avatar;
        company.description = req.file.description;

        await owner.save();
        res.json({
            success: true,
            message: 'Company successfully created',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

router.get('/company', async(req, res) => {
    try {
        let company = await Company.find();
        res.json({
            success: true,
            categories: company,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

module.exports = router;