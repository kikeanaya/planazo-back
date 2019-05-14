const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
    planCreator: {type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    description: String,
    locations: [{type: Schema.Types.ObjectId, ref: 'Location'}],
    categories: {
        type: [String],
        enum: ['romantic', 'party', 'nature', 'food', 'drinks', 'sports', 'shopping', 'pets']
    },
    maxPrice: {
        type: Number,
        enum: [0,10,30,50,70,100,300,500,700,1000,2000,5000]
    },
    minPeople: {
        type: Number,
        enum: [1,2,4,8,20,100]
    },
    planDuration: Number,
    likes: Number,
    imagesUrls: [String]
}, {
        timestamps: true
});

const Plan = mongoose.model('Plan', PlanSchema);
module.exports = Plan;