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

	// find user location
	var geoOptions = {
						enableHighAccuracy: false,
  						timeout: 10000,
  						maximumAge: 60000
					}

	if (navigator.geolocation)
 	{
 		console.log("browser does have geo!");
 		navigator.geolocation.getCurrentPosition(locationFound, locationError, geoOptions);
 	} else
 	{
 		console.log("browser no have geo");
 		handleNoGeolocation(true);
 	}


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


}

function locationError(err) {
	console.log("ERROR "+err.code+err.message);
}

function locationFound(position) {
	console.log("locationFound");

	if (user) {
		user.currentLocation.lat = position.coords.latitude;
		user.currentLocation.lng = position.coords.longitude;
		controller.placeUserOnMap();
	}
}

function handleNoLocation() {
	console.log("handleNoLocation");
}