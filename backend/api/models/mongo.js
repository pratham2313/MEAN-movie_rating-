const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/movie');

var userSchema= new mongoose.Schema({
    movieid:String,
});


var moviemodel = mongoose.model('mid',userSchema);
module.exports=moviemodel;
