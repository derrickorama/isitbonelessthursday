/*global $, google, navigator, setTimeout, clearTimeout */
var Locator = function () {
	var detectLocationSupport,
	loadByGeolocation,
	loadByIP,
	loadCoords,
	locationSet,
	locationSetTimer,
	onLocationCoordsSetEvent = function () {},
	onLocationSetEvent = function () {},
	save,
	self = this,
	userCancelled;
	
	detectLocationSupport = function () {
		var geo,
		locationSetTimer = setTimeout(userCancelled, 5000);
		
		if (navigator.geolocation) {
			// Using your browser's GeoLocation API
			navigator.geolocation.getCurrentPosition(loadByGeolocation, loadByIP);
		} else if (typeof google === 'object' && google.gears) {
			// Try using Google Gears
			geo = google.gears.factory.create('beta.geolocation');
			geo.getCurrentPosition(loadByGeolocation, loadByIP);
		} else {
			 // GeoLocation not supported, using IP
			loadByIP();
		}
	};
	
	// Load address using position.address
	loadByGeolocation = function(position) {
		var address = position.address;
		
		// Browser only returns Long/Lat
		loadCoords(position);
		
		if (typeof address !== 'undefined' && address !== null) {
			save({
				city : address.city,
				country: address.countryCode,
				state: address.region,
				street: address.street,
				zip: address.postalCode
			}, 'address|coords');
		}
    };
	
	// Load address using IP
	loadByIP = function () {
		$.getJSON('http://www.geoplugin.net/json.gp?jsoncallback=?',
			function (data) {
				save({
					latitude: data.geoplugin_latitude,
					longitude: data.geoplugin_longitude
				}, 'coords');
			});
	};
	
	// Load address using coords
	loadCoords = function (position) {
		save({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		}, 'coords');
	};
	
	save = function (position, type) {
		self.position = $.extend({
				city: '',
				country: '',
				latitude: '',
				longitude: '',
				state: '',
				zip: ''
			}, position);
			locationSet = true;
		
		clearTimeout(locationSetTimer);
		
		if (type.indexOf('coords') > -1) {
			onLocationCoordsSetEvent();
		}
		
		if (type.indexOf('address') > -1) {
			onLocationSetEvent();
		}
	};
	
	userCancelled = function () {
		if (!locationSet) {
			loadByIP();
		}
	};
	
	this.init = function () {
		detectLocationSupport();
	};
	
	/*
	noGeoLocation = function () {
		var position = {
			coords: {
				latitude: 42.433846,
				longitude: -83.983269
			}
		};
		
		if (browserSupport === true) {
			alert("Geolocation service failed.");
		} else {
			$('#quicklyMessage').after('<p class="messageWarning" style="display: none">Looks like you\'re not supporting geolocation (could be your browser).<br />We\'ve placed you in Hell (MI). Enjoy.</p>');
			$('.messageWarning').slideDown();
		}
		
		setLocation(position);
	};*/
	
	this.onLocationCoordsSet = function (callback) {
		onLocationCoordsSetEvent = callback;
	};
	
	this.onLocationSet = function (callback) {
		onLocationSetEvent = callback;
	};
};