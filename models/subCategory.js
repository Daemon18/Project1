const mongoose=require('mongoose')

const categorsySchema=new mongoose.Schema({
  name:{
  type:String,
  required:true,
  },
  sub:[{type:String}],
});

module.exports=new mongoose.model('category',categorsySchema);