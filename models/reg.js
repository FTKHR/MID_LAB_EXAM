var db      = require('./dbconnection');

module.exports = {
    regUser: function(info,callback){
        var sql="INSERT INTO `personal_info`(`fname`, `lname`, `email`, `username`, `dob`, `school`, `college`, `university`, `displayimg`, `backgroundimg`) VALUES ('"+ info.fname +"', '"+info.lname +"', '"+ info.email +"', '"+ info.username +"', '"+ info.dob +"', '"+ info.school +"', '"+ info.college +"', '"+ info.uni +"', ' ',' ')";
        
        db.execute(sql,function(result){
            var sql2 = "INSERT INTO `login_cred`(`pid`, `username`, `email`, `password`, `type`) VALUES ('"+ result.insertId +"', '"+info.username +"', '"+ info.email +"', '"+ info.password +"', 'member')";
           
            db.execute(sql2,function(result2){
                //console.log(result);
                //console.log(result2);
                callback(result,result2);
            });
        });
    },
    checkUname: function(uname,callback){
        var sql =" SELECT * FROM `login_cred` WHERE `username`= '"+uname+"'";
        db.getResults(sql,function(result){
            if(result.length>0){
                
                callback(false);
            }
            else{
                
                callback(true);
            }
            
        });
    },
    checkEmail: function(email,callback){
        var sql =" SELECT * FROM `login_cred` WHERE `email`= '"+email+"'";
        
        db.getResults(sql,function(result){
            if(result.length>0){
                
                callback(false);
            }
            else{
            
                callback(true);
            }
            
        });
    }
}