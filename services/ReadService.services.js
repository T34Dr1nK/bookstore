//dbconnection  maybe move it to service
const connection = require("./dbconn.services");
connection.connect(function(err) {
    if (err) throw err;
    console.log(`Connected to mySQL`);
})

const queryWithPlaceHolder=(sql,place_holder)=>
    {
        //กำหนดให้ return  object Promise รอ
        return new Promise(function(resolve, reject){
    
            connection.connect(()=>{

                connection.query(sql,place_holder,(err,result)=>{
                    if(err)
                    {
                        console.log(err);
                        return reject(err);
                    }
            
                    if(result==null)
                    {
                        return reject({ message:"MySQL Error" });
                    }
                    resolve(result);
                }) 
            });
        });
    }
    
const querywithoutplaceHolder = (sql)=>
    {
        //กำหนดให้ return  object Promise รอ
        return new Promise(function(resolve, reject){
    
            connection.connect(()=>{

                connection.query(sql,(err,result)=>{
                    if(err)
                    {
                        console.log(err);
                        return reject(err);
                    }
            
                    if(result==null)
                    {
                        return reject({ message:"MySQL Error" });
                    }
                    resolve(result);
                }) 
            });
        });
    }
module.exports = { queryWithPlaceHolder, querywithoutplaceHolder };