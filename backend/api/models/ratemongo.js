const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/rate');


var rateSchema= new mongoose.Schema({
    rateid:String,
});

var ratemodel = mongoose.model('rid',rateSchema);
module.exports=ratemodel;
// var ratemodel = mongoose.model('rateid',rateSchema);
// module.exports=ratemodel;