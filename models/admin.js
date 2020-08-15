var db      = require('./dbconnection');

module.exports = {
    getAllEmp: function(callback){
        var sql="SELECT * FROM `personal_details` WHERE `username` like 'e%'";
        console.log(sql);
        db.getResults(sql,function(result){
            if(result.length>0){
                callback(result);
                
            }
            else{
                callback([]);
            }
        });
    },

    addEmployee: function(value, callback){
        var sql="INSERT INTO `login_cred` (`username`, `password`, `type`) VALUES ('"+value.username+"','"+value.password+"','employee');";
        db.getResults(sql,function(result){
            var sql1="INSERT INTO `personal_details`(`u_id`, `name`, `phone`, `gender`, `designation`,`username`) VALUES ('"+result.insertId+"','"+value.name+"','"+value.phone+"','"+value.gender+"','"+value.designation+"','"+ value.username +"');";
            console.log(sql1);
            db.getResults(sql1,function(result1){
                callback(result1);
            });
        });
    },

}