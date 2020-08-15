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
        res.redirect('/login');
    }
    
	
});
module.exports = router;