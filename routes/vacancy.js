const router = require('express').Router();
const { json } = require('body-parser');
const Vacancy = require('../models/vacancy');
const upload = require('../middlewares/upload-photo');

router.post('/vacancies', upload.single('photo'), async(req, res) => {
    try {
        let vacancy = new Vacancy();
        vacancy.title = req.body.title;
        vacancy.salary = req.body.salary;
        vacancy.salary_type = req.body.salary_type;
        vacancy.description = req.body.description;
        vacancy.skills_required = req.body.skills_required;
        vacancy.work_type = req.body.work_type;
        vacancy.recruiterID = req.body.recruiterID;
        vacancy.candidateID = req.body.candidateID;
        await vacancy.save();
        res.json({
            status: true,
            message: 'Successfully saved!',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

router.get('/products', async(req, res) => {
    try {
        let products = await Product.find()
            .populate('owner category')
            .populate('reviews', 'rating')
            .exec();
        res.json({
            success: true,
            products: products,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

router.get('/products/:id', async(req, res) => {
    try {
        let product = await (await Product.findOne({ _id: req.params.id }))
            .populated('owner category')
            .populate('reviews', 'rating')
            .exec();
        res.json({
            success: true,
            product: product,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

router.put('/products/:id', upload.single('photo'), async(req, res) => {
    try {
        let product = await Product.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                title: req.body.title,
                price: req.body.price,
                category: req.body.categoryID,
                photo: req.file.location,
                description: req.body.description,
                owner: req.body.ownerID,
            },
        }, { upsert: true });
        res.json({
            success: true,
            updatedProduct: product,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

router.delete('/products/:id', async(req, res) => {
    try {
        let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });
        if (deletedProduct) {
            res.json({
                status: true,
                message: 'Successfully deleted',
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

module.exports = router;