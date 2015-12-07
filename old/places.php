<?php

ini_set('display_errors', 1);

// Signature:
// Localhost: ABQIAAAA6o_l2uOWzUF9SXI8ABYTSxT2yXp_ZAY8_ufC3CFXhHIE1NvwkxRG-HSC7U_YVNW6s8bUeZWCriVcrg

// Yahoo! App ID: lweNwHPV34HwmrEIow.itB1RYgF2KhOyelp6qQClIM4feqh9poBM_SvGrp_33AQv7RNv
$yahooAppID = 'lweNwHPV34HwmrEIow.itB1RYgF2KhOyelp6qQClIM4feqh9poBM_SvGrp_33AQv7RNv';
// Query
$query = 'Buffalo Wild Wings';
// Distance (miles)
$distance = '20';
// Number of results
$results = '20';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://local.yahooapis.com/LocalSearchService/V3/localSearch?appid=' . $yahooAppID . '&query=' . urlencode($query) . '&radius=' . $distance . '&results=' . $results . '&latitude=' . $_GET['lat'] . '&longitude=' . $_GET['lng'] . '&output=json');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$content = curl_exec($ch);
curl_close($ch);

echo $content;

?>