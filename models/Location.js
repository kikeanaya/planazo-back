const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    name: String,
    photo: String,
    address: String,
    rating: Number,
    website: String,
    price_level: Number
}, {
        timestamps: true
});

const Location = mongoose.model('Location', LocationSchema);
module.exports = Location;