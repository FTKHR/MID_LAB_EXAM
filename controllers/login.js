var express = require('express');
const { body, validationResult } = require('express-validator');
const { error } = require('console');
var logindb      = require.main.require('./models/login');
var router = express.Router();

router.get('/', function(req, res){
    var data ={
        error : ''
    }
    res.render('login/login',data);
	
});

router.post('/', [
    body('password').isLength({ min: 8 })
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      error123 = errors.array();
      if(error123[0].param=='password');
      {
        var data ={
            error : 'invalid password'
        }
        res.render('login/login',data);
      }
    }
    else{
        logindb.getCredentials(req.body.username,req.body.password,function(Result){
            if(Result.length>0){
                if(Result[0].type=="employee")res.redirect('/employee');
                
                else if(Result[0].type=="admin")res.redirect('/admin');
            }
            else{
                var data ={
                    error : 'invalid username/password'
                }
                res.render('login/login',data);
            }
        });
    }
  });
  module.exports = router;