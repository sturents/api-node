var md5 = require('md5');
var fetch = require('node-fetch');
const querystring = require('querystring');

var publicKey = process.env.STURENTS_PUBLIC_KEY;
var apiKey = process.env.STURENTS_API_KEY;
var landlordId = process.env.LANDLORD_ID;

const URI = "https://sturents.com/api";
const URI_HOUSES = URI + "/houses";
const URI_HOUSE = URI + "/house";

function getAuth(json){
	var authString = json + apiKey;

	return md5(authString);
}

function fetchHouses(callback){
	if (!publicKey){
		throw "Set STURENTS_PUBLIC_KEY env variable";
	}
	if (!landlordId){
		throw "Set LANDLORD_ID env variable";
	}

	// HTTP GET request
	fetch(URI_HOUSES + '?' + querystring.stringify({ landlord: landlordId, public: publicKey }))
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
	if (!apiKey){
		throw "Set STURENTS_API_KEY env variable";
	}
	if (!landlordId){
		throw "Set LANDLORD_ID env variable";
	}

	var json = JSON.stringify(request);
	var auth = getAuth(json);

	// HTTP POST request
	fetch(URI_HOUSE + '?' + querystring.stringify({landlord : landlordId, auth: auth}), { method: 'POST', body: json })
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
