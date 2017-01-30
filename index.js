var md5 = require('md5');
var fetch = require('node-fetch');
const querystring = require('querystring');

var public_key = process.env.STURENTS_PUBLIC_KEY;
var api_key = process.env.STURENTS_API_KEY;
var landlord_id = process.env.LANDLORD_ID;

const URI = "https://sturents.com/api";
const URI_HOUSES = URI + "/houses";
const URI_HOUSE = URI + "/house";

function getAuth(json){
	var auth_string = json + api_key;

	return md5(auth_string);
}

function fetchHouses(callback){
	if (!public_key){
		throw "Set STURENTS_PUBLIC_KEY env variable";
	}
	if (!landlord_id){
		throw "Set LANDLORD_ID env variable";
	}

	// HTTP GET request
	fetch(URI_HOUSES + '?' + querystring.stringify({ landlord: landlord_id, public: public_key }))
    .then(function(res) {
    	return res.text();
    })
	.then(function(json){
		var request = JSON.parse(json);
		callback(request);
	})
	.catch(function(err) {
		console.log(err);
	});
}

function addHouse(request, callback){
	if (!api_key){
		throw "Set STURENTS_API_KEY env variable";
	}
	if (!landlord_id){
		throw "Set LANDLORD_ID env variable";
	}

	var json = JSON.stringify(request);
	var auth = getAuth(json);

	// HTTP POST request
	fetch(URI_HOUSE + '?' + querystring.stringify({landlord : landlord_id, auth: auth}), { method: 'POST', body: json })
	.then(function(res){
        return res.text();
    }).then(function(json){
		console.log(json);
		var response = JSON.parse(json);
		callback && callback(response);
	});
}

exports.fetchHouses = fetchHouses;
exports.addHouse = addHouse;
