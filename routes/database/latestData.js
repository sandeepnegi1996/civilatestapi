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
	    
	     dbQueryTableName = data.dbTableName;

	    var params = {
	        TableName: dbQueryTableName,
	        KeyConditionExpression: "#deviceid = :deviceidvalue",
	        ExpressionAttributeNames: {
	            "#deviceid": "DeviceId"
	        },
	        ExpressionAttributeValues: {
	            ":deviceidvalue": "nodecivi"
	        },
	        Limit: 1,
	        ScanIndexForward: false
	    };
	    //params for the request is being set

//=================================================================================

		   var finalDataObj;
		   var finaldataReturn;

		 ddb.query(params, function (err, data) {
	        console.log("inside query");
	        if (err) {
	            console.log("Error", err);
	        } else {
	           //    console.log(data);
	            // console.log(data.Items[0].DeviceId);
	             console.log(data.Items[0].data);
	             finalDataObj = data.Items[0].data;
	             
	            var finaldataReturn = {
	                DeviceID: finalDataObj.nodeid,
	                AssetID:finalDataObj.assetId,
	                ReadingId:finalDataObj.readingId,
	                AccelerationX: finalDataObj.ax,
	                AccelerationY: finalDataObj.ay,
	                AccelerationZ: finalDataObj.az,
	                Temperature: finalDataObj.temp,
	                RecordTime:finalDataObj.recordtime

	            }

	            //console.log(finaldataReturn);

	         


	        //    console.log("outside function sending back the object");
	         // return  res.send(finaldataReturn);






	        }
    });



//just
	
		   console.log(finaldataReturn);
		    
	    
	    return res.status(200).send({
	    	success:'true',
	    	description:'success received request',
	    	dataReceived:data.dbTableName,
	    	message:'just testing',
	    	finalDataObj1:finaldataReturn


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