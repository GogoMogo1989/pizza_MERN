const mongoose = require('mongoose');

const orderingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    zip_code: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    ordered_data: [{
        product_name: String,
        quantity: Number,
        price: Number,
    }],
    order_number: {
        type: Number,
        required: true
    },
    is_active: {
        type: Boolean,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    type_of_paid: {
        type: String,
        required: true
    },
    type_of_delivery: {
        type: String,
        required: true
    },
    order_date: {
        type: Date,
        default: Date.now 
    }
});

const OrderingModel = mongoose.model('ordering', orderingSchema);

module.exports = OrderingModel;
