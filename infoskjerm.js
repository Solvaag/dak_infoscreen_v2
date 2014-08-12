
// fields

var track = 1;
var monthnor = ["Twilight Zone","Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"];
var daynor = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];

var information = {}

function main() {
	
	update_today();
	update_upcoming();
	var daily = setInterval(check_hour, 3600000);
	var perfive = setInterval(update_upcoming, 5000);


	console.log("running!");
	
	
}

function virtual_time (argtrack) {
	var process = new Date();

	if ( argtrack != 0) {
		var input = process.getDate();
		input += argtrack;
		process.setDate(input);
	}

	
	var currentdate = {

	year: process.getFullYear(),
	month: process.getMonth() + 1,
	date: process.getDate(),
	day: process.getDay()
	}

	return currentdate;
}

function check_hour() {
	timecheck = virtual_time(0);
	if (timecheck.getHours == 4) {
		update_today();
	}
}

function update_today() {
	var dateobject = virtual_time(0);
	// write text for today's events.
	parse (dateobject, 0);
	display("today", 0, dateobject);
	console.log("Update today!");
}

function update_upcoming() {
	// write text for upcoming events
	// use track to cycle through days
	var dateobject = virtual_time(track);
parse(dateobject, track);
display("upcoming", track, dateobject);
console.log(track);
track++; 
if ( track > 6) track = 1;
console.log (track);
console.log ("Update upcoming!");
}

function parse(argdate, argtrack) {

	var xmlhttp;
	// args: date + track 
	// track takes today's date and adds track to date. date
	if (window.XMLHttpRequest)
 	{// code for IE7+, Firefox, Chrome, Opera, Safari
 	 xmlhttp=new XMLHttpRequest();
  	}
	else
 	 {// code for IE6, IE5
 	 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
  	
  	console.log("This is what I got:");
  	console.log(argdate);

  	if (argdate.month < 10) 
  		{ xmlhttp.open("GET","fetchxml.php?year=" + argdate.year + "&month=0" + argdate.month + "&date="+ (argdate.date + argtrack) +"", false);
  			console.log("fetchxml.php?year=" + argdate.year + "&month=0" + argdate.month + "&date="+ (argdate.date + argtrack) +"");
  		}
  	else
  		{ xmlhttp.open("GET","fetchxml.php?year=" + argdate.year + "&month=" + argdate.month + "&date="+ (argdate.date + argtrack) +"", false);
  			console.log("fetchxml.php?year=" + argdate.year + "&month=" + argdate.month + "&date="+ (argdate.date + argtrack) +"");
  		}

	xmlhttp.send();
	console.log(xmlhttp);
	xmlDoc = JSON.parse(xmlhttp.responseText);
	console.log(xmlDoc);
	if (xmlDoc == null) {xmlDoc = "Ingen oppførte events."}
	information[argtrack] = xmlDoc;
}

function display(divID, trackID, dateobject) {
	// ARGS: divID, track (0 hvis today)
	// edit and add stuff to divs
	var currentdate = dateobject;
	// h1 for event
	// p rom
	// p for start og slutt
	var wipe = document.getElementById(divID);
	wipe.innerHTML = "";
	var catcher = information[trackID];
	console.log("Catcher:" + catcher + "");
	console.log((catcher.length == 0));

	if (catcher.length == 0) {
		var div = document.getElementById(divID);
		var h1 = document.createElement("h1");
		var node = document.createTextNode("Ingen arrangement - "+ daynor[currentdate.day] +" "+ currentdate.date+" " + monthnor[currentdate.month] + "" );
		h1.appendChild(node);
		div.appendChild(h1);
	} else {
		var div = document.getElementById(divID);
		var h1 = document.createElement("h1");

		var node = document.createTextNode(""+ currentdate.date +" " + monthnor[currentdate.month] + "" );
		h1.appendChild(node);
		div.appendChild(h1);
		for (var i = 0; i < catcher.length; i++) {
		
		var h1 = document.createElement("h1");
		h1.setAttribute("id","evtitle");
		var node = document.createTextNode("" + catcher[i].navn + "");
		h1.appendChild(node);
		var prom = document.createElement("p");
		node = document.createTextNode("Rom: " + catcher[i].sted + "");
		prom.appendChild(node);
		var pstartslutt = document.createElement("p");
		node = document.createTextNode("Starter: " + catcher[i].starter + " Slutter: " + catcher[i].slutt +"");
		pstartslutt.appendChild(node);
		div.appendChild(h1);
		div.appendChild(prom);
		div.appendChild(pstartslutt);

		};
	}



}
