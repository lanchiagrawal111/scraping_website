const mongoose=require('mongoose');
//create schema
const detailSchema=new mongoose.Schema({
     titleHeading:{
         type:String
         
     },
    titleUrl:{
        type:String
        
    },
    author:{
        type:String
       
    }
    
    
});
//create collection
const Detail=mongoose.model('Detail',detailSchema);
// export 
module.exports=Detail;
