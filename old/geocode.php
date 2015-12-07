<?php

ini_set('display_errors', 1);

// Signature:
// Localhost: ABQIAAAA6o_l2uOWzUF9SXI8ABYTSxT2yXp_ZAY8_ufC3CFXhHIE1NvwkxRG-HSC7U_YVNW6s8bUeZWCriVcrg
// Production: ABQIAAAA6o_l2uOWzUF9SXI8ABYTSxQXaLYIEzbME_vb6rzfb671uS47DhRQarH2gIHGJQv2gAX_uZiSjdK6jA

$apiKey = 'ABQIAAAA6o_l2uOWzUF9SXI8ABYTSxQXaLYIEzbME_vb6rzfb671uS47DhRQarH2gIHGJQv2gAX_uZiSjdK6jA';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' . $_GET['lat'] . ',' . $_GET['lng'] . '&sensor=false');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$content = curl_exec($ch);
curl_close($ch);

$location = json_decode($content);

if (count($location->results) > 0) {
	$address_components = $location->results[0]->address_components;
	
	for ($i = 0; $i < count($address_components); $i++) {
		if ($address_components[$i]->types[0] === 'postal_code') {
			echo $address_components[$i]->short_name;
		}
	}
}

?>