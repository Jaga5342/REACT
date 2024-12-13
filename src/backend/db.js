
const mongoose =require("mongoose")
mongoose.connect('' ,{ useNewUrlParser: true, useUnifiedTopology: true }
.then (()=>{
   console.log("Database Connected")
})
.catch(()=>
console.log("Backend not connected")
)
)

const Schema =new mongoose.Schema(
    {
     item:String,
     checked:{type:boolean, default:false}
    }

)
const CRUD =mongoose.model('CRUD',Schema)

module.exports=CRUD;