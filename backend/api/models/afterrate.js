const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/rate');


var afterrateSchema= new mongoose.Schema({
    userrateid:String,
    userrate:String,
    moviename:String,
    ratedate:String,
    movieimage:String,
    useremail:String
});

var userratemodel = mongoose.model('userratedata',afterrateSchema);
module.exports=userratemodel;