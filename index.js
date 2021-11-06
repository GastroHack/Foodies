var baseurl = "http://10.6.3.127:8082";

function detect(){

	//alert("detect");
	
	//finalize order
	fetch(baseurl+"/api/v1/snapshot-detection/finalise-order", 
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
	fetch(baseurl+"/api/v1/snapshot-detection",
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
	
	//count how many times an item appears
	
	labelmap = {};
	
	list = document.getElementById("list");
	list.innerHTML = "";
	//make a list of what was found with images
	json.items.forEach(item => {
	
		var name = item.base_label;
		
		if(item.options.length != 0){
			name = item.options[0].label;
		}
	
		if(labelmap[name] == undefined){
			labelmap[name] = {
				"name": name,
				"image_url": item.image_url,
				"count": 1
			};
		}else{
			labelmap[name].count++;
		}
	});
	
	Object.keys(labelmap).map(key => labelmap[key]).forEach(item => {
		list.innerHTML += "<div>"
			+"<img src='"+baseurl+item.image_url+"'></img>"
			+item.name
			+"<strong>"+item.count+"</strong>"
			+"</div>"
	});
}

detect();
