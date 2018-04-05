const mongoose = require('mongoose');
const schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost:27017/market-place');
const reviewSchema = schema ({ 
    buyer_id:{
        type:String
    },
    order_id:{
        type:String,
    },
    date:{
        type:String,
    },
    seller_id:{
        type:String
    },
    gig_id:{
        type:String
    },
    score:{
        type:String
    },
    review:{
        type:String
    }
})
autoIncrement.initialize(connection);

reviewSchema.plugin(autoIncrement.plugin,{
    model:'review',
    startAt:7000,
    incrementBy:1
})

const review = module.exports = connection.model('review',reviewSchema);