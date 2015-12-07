/*global $, google, Locator */

function initialize() {
	var addMarker,
	locator,
	myOptions = {
		zoom: 9,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	$('#map_canvas').css({
		height: 300,
		textAlign: 'left'
	});

	var map = new google.maps.Map($('#map_canvas')[0], myOptions);
	
	addMarker = function (params) {
		var content,
		image = params.image,
		infowindow,
		latLng = new google.maps.LatLng(params.latitude, params.longitude),
		marker = new google.maps.Marker({
			position: latLng,
			map: params.map,
			title: params.title,
			icon: image
		});
		
		content = '<div id="content"><strong>' + params.title + '</strong></div>';
		
		infowindow = new google.maps.InfoWindow({
			content: content
		});
		
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(params.map, marker);
		});
	};
	
	locator = new Locator(map);
	locator.onLocationSet(function () {
		$.getJSON('/places.php?lat=' + locator.latitude + '&lng=' + locator.longitude, function (data) {
			var i,
			result,
			results,
			resultCount = data.ResultSet.totalResultsAvailable;
			
			if (resultCount > 0) {
				results = data.ResultSet.Result;
				for (i = 0; i < resultCount; i++) {
					result = results[i];
					
					// Extra check to make sure it's BWW's
					if (result.BusinessUrl === 'http://www.buffalowildwings.com/') {
						addMarker({
							image: 'images/bwws-icon.png',
							latitude: result.Latitude,
							longitude: result.Longitude,
							map: map,
							title: result.Title
						});
					}
				}
			}
		});
	});
	locator.getLocation();
}