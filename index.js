/*
put new product into the system:
http://10.6.3.127:8082/show

*/

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

function item2ListItem(item){
	return "<div>"
	+"<img src='"+baseurl+item.image_url+"'></img>"
	+item.name
	+countStr(item.count);
	+"</div>"
}
function td(str){
	return "<td>"+str+"</td>";
}
function myrand(max){
	return Math.floor(Math.random()*max);
}
function item2TableItem(item){

	var eaten_today = myrand(5);
	var eaten_avg   = myrand(7);
	
	var recommend   = (eaten_avg - eaten_today) - item.count;
	if(recommend < 0){recommend = 0;}
	
	if(recommend == 0){ recommend = ""; }

	return "<tr>"
		+td("<img src='"+baseurl+item.image_url+"'></img>")
		+td(item.name)
		+td(countStr(item.count))
		+td(eaten_today)
		+td(eaten_avg)
		+td(recommend)
	+"</tr>"
}

function countStr(count){
	var color = "black";
	var extra = "";
	if(count <= 1){
		color = "red";
		extra = " (running low!!)";
	}
	return "<strong style='color:"+color+";'>"+count+extra+"</strong>";
}

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
	
	list  = document.getElementById("list");
	table = document.getElementById("foodtable"); 
	list.innerHTML = "";
	table.innerHTML = "";
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
		//list.innerHTML += item2ListItem(item);
		table.innerHTML += item2TableItem(item);
	});
}

detect();
