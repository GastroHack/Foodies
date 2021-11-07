/*
put new product into the system:
http://10.6.3.127:8082/show

*/

var baseurl = "http://10.6.3.127:8082";

function detect(){
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

function toggleLiveView(){
	var view = document.getElementById("liveView");
	if(view.style.display == 'none'){
		view.style.display = 'block';
	}else{
		view.style.display = 'none';
	}
}

function toggleFake(){
	var faketable = document.getElementById("faketable");
	var realtable = document.getElementById("realtable");
	
	if(faketable.style.display == 'none'){
		faketable.style.display = 'block';
		realtable.style.display = 'none';
	}else{
		faketable.style.display = 'none';
		realtable.style.display = 'block';
	}
}

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
function capitalize(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

function beautifyItemName(name){
	var parts = name.split(".");
	if(parts.length != 3){return name;}
	return capitalize(parts[1])+" "+capitalize(parts[2]);
}
function item2TableItem(item){

	var eaten_today = myrand(5);
	var eaten_avg   = myrand(7);
	
	var recommend   = (eaten_avg - eaten_today) - item.count;
	if(recommend < 0){recommend = 0;}
	
	if(recommend == 0){ recommend = ""; }

	return "<tr>"
		+td("<img src='"+baseurl+item.image_url+"'></img>")
		+td(beautifyItemName(item.name))
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

function dataTuple(max){
	var produced = 5 + myrand(max);
	var consumed = Math.max(myrand(produced), produced/3);
	var wasted = produced - consumed;
	return [produced, consumed, wasted].map(x => Math.floor(x));
}

document.addEventListener("DOMContentLoaded", function() {
  
	tuples = [];
	labels = [];
	var j = 1;
	for(var i=30; i > 25; i-= 0.2){
		var date = new Date("2021-10-"+j);
		tuples.push(dataTuple(i));
		labels.push(date.toString().substring(0,16));
		j++;
	}
	
	var json = JSON.parse(plot_data);
	console.log(json);
	
	labels = [];
	for(var i=1; i <= 28; i++){ 
		var date = new Date("2021-10-"+i);
		labels.push(date.toString().substring(0,16)); 
	}
	

	//const labels = [1,2,3,4,5,6,7];
	const mytension = 0.4;

	const data = {
	labels: labels,
	datasets: [
		{
		label: '# Food Items Wasted',
		//data: [20, 15, 8, 17, 18, 3, 6],
		//data: tuples.map(t => t[2]),
		data: Object.keys(json.wasted).map(key => json.wasted[key]),
		fill: true,
		borderColor: 'red',
		tension: mytension
		},
		{
		label: '# Consumed',
		//data: [30, 16, 10, 20, 25, 14, 19],
		//data: tuples.map(t => t[1]),
		data: Object.keys(json.consumed).map(key => json.consumed[key]),
		fill: false,
		borderColor: 'black',
		tension: mytension
		},
		{
		label: '# Produced',
		//data: [50, 31, 18, 37, 43, 17, 25],
		//data: tuples.map(t => t[0]),
		data: Object.keys(json.produced).map(key => json.produced[key]),
		fill: false,
		borderColor: 'orange',
		tension: mytension
		}
	]
	};

const config = {
  type: 'line',
  data: data,
  options: {
  	/*
      scales: {
	      y: {
		type: 'linear',
		display: true,
		position: 'left',
		min: 0,
		max: 50
	      },
      }
      */
  }
};

const myChart = new Chart(
	document.getElementById('myChart'),
	config
);

detect();
});
