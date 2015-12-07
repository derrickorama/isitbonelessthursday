/*global $, document */

var Today = function () {
	var d = document,
	date = new Date(),
	day = date.getDay(),
	empty = function (elem) {
		var child;
		while (child = elem.firstChild) {
			elem.removeChild(child);
		}
	},
	fill = function (elem, html) {
		var child,
		div = d.createElement('div');
		div.innerHTML = html;
		while (child = div.firstChild) {
			elem.appendChild(child);
		}
	},
	html = function (id, html) {
		var elem,
		get = function (i) { return d.getElementById(i); };
		
		elem = get(id); 
		empty(elem);
		fill(elem, html);
	},
	isThursday = false;
	
	this.init = function () {
		if (day === 4) {
			html('pageTitle', 'It <em>is</em> Boneless Thursday @ BWWs!');
			html('quicklyMessage', 'Quickly, find the closest BWWs!');
			isThursday = true;
		} else {
			html('pageTitle', 'Not Boneless Thursday yet!');
			html('quicklyMessage', 'Check back tomorrow!');
			html('map_canvas', '<img src="images/buffalo-jump.jpg" alt="Buffalo falling off a cliff." title="Buffalo falling off a cliff." width="500" height="421" />');
		}
	};
	
	this.isThursday = function () {
		return isThursday;
	};
};