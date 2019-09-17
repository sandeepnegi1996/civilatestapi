const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send("this is the home page");
});


const PORT=5000;
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})