

function detect(){

	//alert("detect");
	
	//finalize order
	fetch("http://10.6.3.127:8082/api/v1/snapshot-detection/finalise-order", 
		{
			method: 'POST',
			body: JSON.stringify({"status": "cancelled"})
		}
		)
		.then(response => response.json())
		.then(data => console.log("finalize"))
		.then(data => detect2());
}

function detect2(){

	//start order
	fetch("http://10.6.3.127:8082/api/v1/snapshot-detection",
	{
		method: 'POST',
		body: JSON.stringify({})
	})
	.then(response => response.json())
	.then(data => displayResults(data));
}
var mydata = {};

function displayResults(json){

	console.log("displayResults");
	mydata = json;
	console.log(json);

	//base label:
	//json.items[i].base_label
	
	//image
	//json.items[i].image_url
	
	//detailed label:
	//json.items[i].options[0].label
	
	//options can be emtpy array
	
	labelmap = {};
	
	//make a list of what was found with images
}
