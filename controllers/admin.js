var express = require('express');
const { body, validationResult } = require('express-validator');
const { error } = require('console');
var admindb      = require.main.require('./models/admin');
var router = express.Router();

router.get('/', function(req, res){
    if(req.cookies['type'] == 'admin'){
        res.render('admin/index');
    }
    else{
        res.redirect('/employee');
    }	
});

router.get('/addemployee', function(req, res){
    
    if(req.cookies['type'] == 'admin'){
        
        var value = {
            name: req.body.name,
            username: req.body.username,
            phone: req.body.phone,
            gender: req.body.gender,
            designation: req.body.designation,
        };
        var valueCheck = [];
        var data ={
            value   : value,
            errors  : valueCheck
        }
        res.render('admin/addEmployee',data);
    }
    else{
        res.redirect('/employee');
    }
    
});
router.post('/addemployee', [
    body('name','Name required!').notEmpty(),
    body('username').notEmpty().withMessage('Username required!').isLength({min: 9}).withMessage('Username must be greater than 8 characters!'),
    body('password').notEmpty().withMessage('Password required!').isLength({min: 8}).withMessage('Password must be atleast 8 characters!').custom((value,{req}) => {
        if (value != req.body.cPassword) {
            throw new Error("Passwords don't match");
        } else {
            return value;
        }
    }),
    body('phone').notEmpty().withMessage('Phone number required!').isNumeric().withMessage('Phone number must be numeric!').isLength({min: 11, max: 11}).withMessage('Phone number must be 11 characters!'),
    body('gender','Gender required!').notEmpty(),
], function(req, res){
    if(req.cookies['type'] == 'admin'){
        
        var value = {
            name: req.body.name,
            phone: req.body.phone,
            username: req.body.username,
            gender: req.body.gender,
            designation: req.body.designation,
        };
        
        var valueCheck = [];

        validationResult(req).errors.forEach(error => {
            valueCheck.push(error.msg);
        });
        var data ={
            value   : value,
            errors  : valueCheck
        }
        if(valueCheck.length > 0){
            res.render('admin/addemployee',data);
        } else {
            admindb.addEmployee(value, function(result){
                console.log(result);
                res.redirect('/admin/allemplist');
            });
        }
    }
    else{
        res.redirect('/employee');
    }

});
router.get('/allemplist', function(req, res){
    
    if(req.cookies['type'] == 'admin'){
        admindb.getAllEmp(function(result){
            console.log(result);
            res.render('admin/allemployee',{emp:result});
        });
    }
    else{
        res.redirect('/employee');
    }

});

module.exports = router;