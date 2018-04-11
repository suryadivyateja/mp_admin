const mongoose = require('mongoose');
const User_gig = require('./gig');
const User = require('./user');

filesSchema=new mongoose.Schema({
    gigs:{
        type:Array
    },
    user_pics:{
        type:Array
    }
});
var files = mongoose.model('files',filesSchema);