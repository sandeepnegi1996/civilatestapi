const express=require('express');
const router=express.Router();
const AWS=require('aws-sdk');
AWS.config.update({region:"us-east-2"});

var ddb=new AWS.DynamoDB.DocumentClient();






router.post("/latestrecord",(req,res)=>{
    console.log("inside the post request");

	if (req.body.tablename) {
		var data={
        dbTableName:req.body.tablename
	    	};
	    
	    console.log(`post request table name is ${data.dbTableName}`);
	    //res.send(data.dbTableName);
	    return res.status(200).send({
	    	success:'true',
	    	description:'success received request',
	    	dataReceived:data.dbTableName
	    });
	}


		res.status(400).send({
			success:'false',
			description:'post request not properly received'
		});

    
});





router.get('/latest',(req,res)=>{
    res.send("this is the latest data v1");
});

module.exports=router;