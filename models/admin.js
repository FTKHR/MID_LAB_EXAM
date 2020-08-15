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
    }   
}