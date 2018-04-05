const mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost:27017/market-place');

const User = require('./user');

const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');


const order_det = Schema({
    buyer_id:{
        type:String
    },
    seller_id:{
        type:String
    },
    order_id:{
        type:String
    },
    gig_img:{
        type:String
    },
    gig_id:{
        type:String
    },
    gig_title:{
        type:String
    },
    gig_img:{
        type:String,       
    },
    gig_desc:{
        type:String,
    },
    total_ext_days:{
        type:String
    },
    selected_pac:{
        type:String
    },
    selected_price:{
        type:Number
    },
    assigned_days:{
        type:String
    },
    total_amount:{
        type:Number
    },
    resume:{
        type:String
    },
    description:{
        type:String
    },
    selected_extras:{
        type:String
    },
    date:{
        type:String
    },
    order_status:{
        type:String,
        default:"Order PLaced"
    },
    accepted_date:{
        type:String,
    }
});
autoIncrement.initialize(connection);

order_det.plugin(autoIncrement.plugin,{
    model:'order',
    startAt:5000,
    incrementBy:1
})

const order = module.exports = mongoose.model("order",order_det);