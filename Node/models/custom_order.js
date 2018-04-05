const mongoose = require('mongoose');
const schema = mongoose.Schema;
const cus_order = schema({
    order_description:{
        type:String,
        required:true
    },
    order_id:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    orderd_date:{
        type:String,
        required:true
    },
    delivery_date:{
        type:String
    },
    buyer_id:{
        type:String,
        required:true
    },
    seller_id:{
        type:String,
        required:true
    }
});

const custom_order = module.exports = mongoose.model('custom_order',cus_order);