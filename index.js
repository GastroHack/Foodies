

function detect(){

	//alert("detect");
	
	//finalize order
	fetch("http://10.6.3.127:8081/api/v1/snapshot-detection/finalise-order", 
		{
			method: 'POST',
			body: JSON.stringify({"status": "cancelled"})
		}
		)
		.then(data => console.log("finalize"));
	
	//start order
	fetch("http://10.6.3.127:8081/api/v1/snapshot-detection",
	{
		method: 'POST',
		body: JSON.stringify({})
	}
	).then(data => console.log(data));
	
	
}
