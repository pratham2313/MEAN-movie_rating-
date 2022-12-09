const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/auth');
//mongoose.connect('mongodb://localhost:27017/rate');


var signupSchema= new mongoose.Schema({
    email:String,
    password:String,
    username:String,
    firstname:String,
    lastname:String,
    country:String,
    state:String,
});

var signupmodel = mongoose.model('signupinfo',signupSchema);
module.exports=signupmodel;
// var ratemodel = mongoose.model('rateid',rateSchema);
// module.exports=ratemodel;