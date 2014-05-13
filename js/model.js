/**
 *	model.js
 *	
 *	State-related app info
 */

 function Model() {
 	console.log("Model constructor");
 }

 Model.prototype.defaultAttraction = ATTRACTIONS[0];

 Model.prototype.getXHRObjectSettings = function() {
 	var o 		= {};
 	o.accepts 	= "xml";
 	o.async 	= true;
 	o.cache 	= false;
 	o.dataType 	= "xml";
 	return o;
 }