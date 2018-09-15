const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const database = require ('../databaseHandle/connectDatabase');

//Register
router.post('/register', (req, res, next) =>{
    const newUser = [
        req.body.username,
        req.body.password,
        req.body.name,
        req.body.email
      ] //// new object for hold user registration data
    database.addNewUser(newUser , function(err,user){
        if(err){
          res.json({success: false, msg: 'User name exist'});
        }
        else{
          res.json({success: true, msg: 'User registerd'});
        }
    })
});

router.post('/registercompany', (req, res, next) =>{
    console.log('company');
    const newCompany = [
        req.body.name,
        req.body.address,
        req.body.email
      ] //// new object for hold user registration data
    database.addNewCompany(newCompany , function(err,user){
        if(err){
          res.json({success: false, msg: 'company name exist'});
        }
        else{
          res.json({success: true, msg: 'company registerd'});
        }
    })
});

router.post('/registerparticipant', (req, res, next) =>{
    console.log('participant');
    const newParticipant = [
        req.body.fname,
        req.body.lname,
        req.body.address,
        req.body.email,
        req.body.phonenumber,
        req.body.employeeid
      ] //// new object for hold user registration data
    database.addNewParticipant(newParticipant , function(err,user){
        if(err){
          res.json({success: false, msg: 'company name exist'});
        }
        else{
          res.json({success: true, msg: 'company registerd'});
        }
    })
});

//Add compnay


//authenticate
router.post('/authenticate', (req, res, next) =>{
  username = req.body.username;
  password = req.body.password;
  console.log(username);
  console.log(password);
  database.selectUser(username,function(err,user){
    if(err){
      throw err;
    }
    else{
      //console.log(user);
      //console.log(user.length);
      if(user.length === 0){
        res.json({success: false, msg: 'User not Found'});
      }
      else{
        console.log(user[0].password);
        database.comparePassword(password,user[0].password,(err,isMatch) => {
            if(err){
                throw err;
            }
            /*
            if(password==user[0].password){
                isMatch=true;
            }
            else{
                isMatch=false;
            }*/
            console.log(isMatch);
            if(isMatch){
                const token = jwt.sign(toObject(user),config.secret,{
                    expiresIn:604800 //1week
                });
                //console.log(token);
                console.log(user[0]);
                res.json({
                    success: true, 
                    token: 'JWT ' + token,
                    user :user[0]/*{
                        name: user[0].name,
                        username : user[0].username,
                        email:user[0].email
                    }*/
                });
            }
            else{
                res.json({success: false, msg: 'Wrong password'});
            }
        })
      }
    }
  });
});

//Profile
router.get('/profile',passport.authenticate('jwt',{session:false}), function(req,res,next){
    res.json({user:req.user});
});

router.get('/companyDetails', function(req,res,next){
    database.selectCompany(function(err,company){
        if(err){
          throw err;
        }else{
            res.json({company:req.company});
        }
    });
});




module.exports = router;


function toObject(user){
    return {
      name : user[0].name,
      username:  user[0].userName,
      password : user[0].password,
      email :     user[0].emai
    }
  }

function toObject(company){
    return {
        name : company[0].companyName,
        address:company[0].companyAddress,
        email:company[0].companyEmail
    }
  }
