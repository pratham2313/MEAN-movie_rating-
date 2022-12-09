var express = require('express');
var router = express.Router();
var moviemodel=require('../models/mongo');
var ratemodel=require('../models/ratemongo');
var userratemodel = require('../models/afterrate');
var signupmodel = require('../models/signup');
var check = require('../models/logincheck');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movie');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
const cors = require('cors');
//var tools = require('./index');
router.use(cors({
    origin: '*'
}));



// router.get('/getData',(req,res)=>{

//     var userdetails=new usermodel({
//         movieid:987654,
//     });
//     // res.json({
//     //     "statuscode":200,
//     //     "statusmessage":"success",
        
//     // })
//     userdetails.save(function(err,req1){
//         if(err) throw err;

//         console.log('user record inserted');
//     })
    
// });



//for movie and series single view
router.get('/addid', function(req, res) {
  
    moviemodel.find({}).limit(1).sort({$natural:-1}).exec(function(err,data){
        if(err){
            console.log('can not get last record');
        }
        else{
            res.json(data);
        }
    }) 
  });
router.post('/addid',function(req,res,next){
    
    console.log(req.body.id1);
    var userdetails=new moviemodel({
        
        movieid:req.body.id1,
    });
    
    userdetails.save(function(err,req1){
                if(err) throw err;
        
                console.log('user record inserted in user');
            })
});


//for userrate movie

router.post('/userratedata', function(req, res,next) {
    console.log(req.body.email)
    userratemodel.find({useremail:req.body.email}).exec(function(err,data){
        if(err){
            console.log('can not get last record');
        }
        else{
            console.log(data.length);
            res.json(data);
        }
    }) 
  });
router.post('/userrate',function(req,res,next){
    console.log('i am userrate');
    console.log(req.body.id1);
    console.log(req.body.rate1  );
    var userdetails=new userratemodel({
        
        userrateid:req.body.id1,
        userrate:req.body.rate1,
        moviename:req.body.name,
        ratedate:req.body.rdate,
        movieimage:req.body.bgpath,
        useremail:req.body.email1,
    });
    
    userdetails.save(function(err,req1){
                if(err) throw err;
        
                console.log('user record inserted in user');
            })
});
//for movie rating

router.get('/rateid', function(req, res) {
  
    ratemodel.find({}).limit(1).sort({$natural:-1}).exec(function(err,data1){
        if(err){
            console.log('can not get last record');
        }
        else{
            console.log(data1);
            res.json(data1);
        }
    }) 
  });
   
router.post('/rateid',function(req,res,next){
    
    console.log(req.body.id1);
    var ratedetails=new ratemodel({
        
        rateid:req.body.id1,
    });
    
    ratedetails.save(function(err,req1){
                if(err) throw err;
        
                console.log('user record inserted in rate');
            })
});
  


//for signup

router.post('/signup',function(req,res,next){
    
    console.log(req.body.email);
    var query = { email: req.body.email};
        signupmodel.find(query).exec(function(err,data){
            if(data.length==0){
                console.log('duplicate email not avaiable'); 
                var signupdetails=new signupmodel({
        
                    email:req.body.email,
                    password:req.body.password,
                    username:req.body.username,
                    firstname:req.body.firstname,
                    lastname:req.body.lastname,
                    country:req.body.country,
                    state:req.body.state,
                    
            
                });
                
                signupdetails.save(function(err,req1){
                            if(err) throw err;
                    
                            console.log('user record inserted in signup');
                        });
                        res.json(false);
                
            }
            else{
                res.json(true);
            }
        });
    
});
router.post('/login',function(req,res,next){
    login:Boolean;
    console.log(req.body.email);
    console.log(req.body.password);

    
    var query = { email: req.body.email, password:req.body.password };
        signupmodel.find(query).exec(function(err,data){
            if(err){
                console.log('can not get user');
            }
            else{
                
                if(data.length==0){
                    console.log('user not found'); 
                    res.json(false);
                }
                else
                {
                    console.log('user found'); 
                    var checkdetails=new check({
        
                        email:req.body.email,
                        password:req.body.password,
                        islogin:true
                    });
                    checkdetails.save(function(err,req1){
                        if(err) throw err;
                
                        console.log('user record inserted in signup');
                    })
                    check.find({email: req.body.email}).limit(1).sort({$natural:-1}).exec(function(err,data){
                        if(data.length==0){
                            console.log('user not login');
                            res.json(false);
                        }
                        else{
                            
                            console.log(data[0].islogin);
                            res.json(data);
                        }

                    
                    });
                }
                
            }
        });






        // update islogin


        router.post('/update',function(req,res,next){
    
            console.log(req.body.email);
            check.find({email: req.body.email}).limit(1).sort({$natural:-1}).exec(function(err,data){
                if(data.length==0){
                    console.log('user not login');
                    res.json(false);
                }
                else{
                    query={email: req.body.email};
                    newvalue={islogin:false}
                    check.updateOne(query,newvalue,function(err,res){
                        if (err) throw err;
                        console.log("1 document updated");
                    })
                    console.log(data[0].islogin);
                    res.json(data);
                }

            
            });
        });
      
    // var signupdetails=new signupmodel({
        
    //     email:req.body.email,
    //     password:req.body.password,
    //     username:req.body.username,
    //     firstname:req.body.firstname,
    //     lastname:req.body.lastname,
    //     country:req.body.country,
    //     state:req.body.state,
        

    // });
    
    // signupdetails.save(function(err,req1){
    //             if(err) throw err;
        
    //             console.log('user record inserted in signup');
    //         })
});




    // router.listen(3000,(req,res)=>{
    // console.log('express API is running at port 3000');


module.exports = router;
