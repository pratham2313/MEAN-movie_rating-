const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/auth');
//mongoose.connect('mongodb://localhost:27017/rate');


var check= new mongoose.Schema({
    email:String,
    password:String,
    islogin:Boolean
});

var checkmodel = mongoose.model('islogin',check);
module.exports=checkmodel;
// var ratemodel = mongoose.model('rateid',rateSchema);
// module.exports=ratemodel;