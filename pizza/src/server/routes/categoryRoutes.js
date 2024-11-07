// routes/categories.js
const express = require('express');
const CategoryModel = require('../models/categories');

const router = express.Router();

// Kategória létrehozása (POST)
router.post('/', async (req, res) => {
    try {
        const { categories } = req.body; // A tömb
        if (!categories || !Array.isArray(categories) || categories.length === 0) {
            return res.status(400).json({ message: 'Main categories are required and must be a non-empty array' });
        }

        const newCategory = new CategoryModel({ categories });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({ message: 'Error creating category', error: err });
    }
});

// Kategóriák lekérése (GET)
router.get('/', async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching categories', error: err });
    }
});

// Kategória törlése (DELETE)
router.delete('/:id', async (req, res) => {
    const categoryId = req.params.id;
    try {
        const deletedCategory = await CategoryModel.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted', deletedCategory });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting category', error: err });
    }
});

module.exports = router;
