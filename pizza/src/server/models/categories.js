const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categories:{
        type: [String],
        required: true
    }
});

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;