const express=require('express');
const app=express();


//this is used this is body parser for the post data
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get('/',(req,res)=>{
    res.send("this is the home page");
});

app.use('/api/v1',require('./routes/database/latestData'));


const PORT=5000;
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})