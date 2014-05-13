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

  	$("#redoGeo").click(user.geolocate());

  	testAjax();

}

function testFxn() {
	console.log("testFxn!");
}



function testAjax() {
	console.log("testAjax");

	$.ajax({
  		url: "http://www.ctabustracker.com/bustime/api/v1/getroutes?key=dcBun75XjwhPmnAkv8tQFa2xb",
  		cache: false
	})
  		.done(function( html ) {
    		console.log("done!");
  		});
	}


