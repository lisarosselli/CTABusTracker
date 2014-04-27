/**
 *	controller.js
 *	
 *	Main entry point and cerebellum of the app
 */

function Controller() {
	console.log("Controller constructor");
}

Controller.prototype.placeUserOnMap = function() {
	console.log("Controller.placeUserOnMap");

	user.placeUserOnMap();
}

Controller.prototype.placeSelfOnMap = function() {
	console.log("Controller.placeSelfOnMap");
}

Controller.prototype.chooseNewDestination = function(latitude, longitude) {
	console.log("Controller.chooseNewDesination");

	user.setDestination(latitude, longitude);
}