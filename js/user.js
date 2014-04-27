/**
 *	user.js
 *
 */

function User() {
	console.log("User constructor");

	this.currentLocation = {
		lat: undefined,
		lng: undefined,
		marker: undefined,
		infoWindow: undefined
	}

	this.destination = {
		lat: undefined,
		lng: undefined,
		marker: undefined,
		infoWindow: undefined
	}
}

User.prototype.placeUserOnMap = function() {
	console.log("User.placeUserOnMap");

	if (!this.currentLocation.lat && !this.currentLocation.lng) {
		console.warn("User.placeUserOnMap :: currentLocation is undefined.");
		return;
	}

	var img;
	var shape;
	var oMarker;
	var oInfoWindow;

	//this.removeOriginMarker();

	//this.currentLocation.lat = latitude;
	//this.currentLocation.lng = longitude;

	img = { url: "http://mt.google.com/vt/icon?psize=27&font=fonts/Roboto-Bold.ttf&color=ff133C00&name=icons/spotlight/spotlight-waypoint-a.png&ax=43&ay=50&text=%E2%80%A2",
					size: new google.maps.Size(22, 40),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(11, 40),
			};

	shape = { coord: [0, 0, 0, 22, 40, 22, 40 , 0],
  				type: 'poly'
		};

	oMarker = new google.maps.Marker({
		position: new google.maps.LatLng(this.currentLocation.lat, this.currentLocation.lng),
		icon: img,
		shape: shape,
		map: map,
		animation: google.maps.Animation.DROP,
		title: "You are here!!!"
	});

	this.currentLocation.marker = oMarker;

	oInfoWindow = new google.maps.InfoWindow({
		content: this.currentLocation.marker.title
	});	

	this.currentLocation.infoWindow = oInfoWindow;

	oMarker.setMap(map);
	oInfoWindow.open(map, this.currentLocation.marker);

	google.maps.event.addListener(user.currentLocation.marker, 'click', function() {
		user.currentLocation.infoWindow.open(map, user.currentLocation.marker);
	});	

	if (this.destination.lat && this.destination.lng) {
		//adjustMapBounds();
	}
}

User.prototype.setDestination = function(latitude, longitude) {
	console.log("User.setDetination");

	this.destination.lat = latitude;
	this.destination.lng = longitude;
}