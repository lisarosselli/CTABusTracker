/**
 *	main.js
 */

// global variables/objects
var controller = undefined;
var model = undefined;
var map = undefined;
var user = undefined;

function initialize() {
	console.log("initialize");

	model = new Model();
	controller = new Controller();
	user = new User();

	var mapOptions = {
		center: new google.maps.LatLng(model.defaultAttraction.lat, model.defaultAttraction.lng), 
		disableDefaultUI: true,
		minZoom: 10,
		zoom: 16 
	}

	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	user.geolocate();


 	google.maps.event.addListener(map, 'click', function(e) {
    	console.log("map clicked! at "+e.latLng.lat()+", "+e.latLng.lng());

    	if (user.currentLocation.lat == null && user.currentLocation.lng == null)
    	{
    		user.setCurrentLocation(e.latLng.lat(), e.latLng.lng());
    	} else 
    	{
    		controller.chooseNewDestination(e.latLng.lat(), e.latLng.lng());
    		//user.setDestination(e.latLng.lat(), e.latLng.lng());
    	}
  	});

  	//$("#redoGeo").click(user.geolocate());

  	var xhr = createCORSRequest("GET", "http://www.ctabustracker.com/bustime/api/v1/getroutes?key="+model.apiKey);

  	if (!xhr) {
  		throw new Error("CORS not supported.");
  	} else {
  		console.log(xhr);
  		xhr.send();
  	}

}

function testFxn() {
	console.log("testFxn!");

	getData("http://www.ctabustracker.com/bustime/api/v1/getroutes?key="+model.apiKey, hiyo);

	//http://www.ctabustracker.com/bustime/api/v1/getroutes?key=dcBun75XjwhPmnAkv8tQFa2xb
}

var foo;

// Services

function createCORSRequest(method, url) {
	console.log("createCORSRequest");
	var xhr = new XMLHttpRequest();
	
	if ("withCredentials" in xhr) {
		xhr.open(method, url, true);
	} else if (typeof XDomainRequest != undefined) {
		xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
		xhr = null;
	}

	return xhr;
}

/*
function getData(urlParam, callback) {
	$.ajax({
		type: "GET",
		dataType: "xml",
		url: urlParam,
		success: function(xml) {
			console.log(xml);
			console.log("success?");
		}
	})
}
*/

/*
function getData(url, callback) {
	var xhr;
	xhr = new XMLHttpRequest();
	xhr.onreadystatechange = ensureReadiness;

	function ensureReadiness() {
		if (xhr.readyState < 4) {
			return;
		}

		if (xhr.readyState != 200) {
			console.log("getData not finding service");
		}

		if (xhr.readyState === 4) {
			console.log("getData for "+url+" : success");
			callback(xhr);
		}
	}

	xhr.open('GET', url, true);
	xhr.send('');
}
*/

function hiyo(data) {
	console.log("hiyooo");
	foo = data;
	console.log(data.responseText);
}

