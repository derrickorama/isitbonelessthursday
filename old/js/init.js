if (today.isThursday() === true) {
	head.js(
		{ gGears: 'http://code.google.com/apis/gears/gears_init.js' },
		{ jQuery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js' },
		{ locator: 'js/locator.js' }
	);

	head.ready('jQuery', function() {
		head.ready('gGears', function() {
			head.ready('locator', function() {
				locator = new Locator();
				locator.onLocationCoordsSet(function () {
					// Test latitude
					//locator.latitude = 41.926694;
					// Test longitude
					//locator.longitude = -87.650973;
					var url = 'http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;q=Buffalo+Wild+Wings&amp;aq=0&amp;ie=UTF8&amp;hq=Buffalo+Wild+Wings&amp;sll=' + locator.position.latitude + ',' + locator.position.longitude + '&amp;z=10&amp;t=h&amp;output=embed&amp;iwloc=A';
					$('#map_canvas')
						.css({ height: 350, overflow: 'hidden' })
						.html('<iframe width="900" height="353" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="' + url + '"></iframe>');
				});
				locator.init();
			});
		});
	});
}

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-20801139-1']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();