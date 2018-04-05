const mongoose = require('mongoose');
const schema = mongoose.Schema;

const conv_schema_one = schema({
    conv_id:{
        type:String,
        required:true
    },
    users:{
        type:Array,
        required:true
    },
    msg:{
        type: Array,        
    },
   status:{
       type:String,
       default:"notSeen"
   },
   updatedon:{
       type:String
   }
});

const conv = module.exports = mongoose.model('conv' , conv_schema_one);