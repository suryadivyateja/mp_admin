const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FilesSchema = Schema({
    gigs:{
        type:Array
    }
  
});

const Files = module.exports = mongoose.model('Files',FilesSchema);

