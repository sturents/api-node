
/*
Must set following env variables before running
see sturents.com/software/developer

export STURENTS_PUBLIC_KEY=
export STURENTS_API_KEY=
export LANDLORD_ID=
*/

/**
  Example of how to call fetchHouses
*/
var sturents = require('./index.js');

function list_houses(){

  console.log('Fetching all houses');
  sturents.fetchHouses(function(response){
  	var houses = response.branches[0].properties;
  	console.log('Total properties found ' + houses.length);
  	houses.forEach(function(house){
  		console.log(house.reference);
  	});
  });

}

/**
 Example of add house
*/
function add_house(){
  console.log('Adding a houses');
  var request = {
      "reference" : "Propert_reference_1234", // Must be unique across my properties, will use this for updating this property
      "available_from": "2017-09-01",
      "beds": "1",
      "rooms_let_individually": "false",
      "quantity": "",
      "property_type": "Residential",
      "description": "Some description of the house",
      "facilities": ["LCD TV", "Microwave", "Parking", "Complimentary Broadband & WiFi"],
      "address": {
          "property_name": "",
          "property_number": "1",
          "road_name": "Hilton Road",
          "city": "London",
          "postcode": "EC2 7AF",
          "uprn": ""
      },
      "coordinates": {
          "lat": "",
          "lng": ""
      },
      "contract": {
          "price": {
              "amount": 80,
              "amount_per": "person",
              "time_period": "person",
              "utilities": {
                  "water": true,
                  "gas": true,
                  "electricity": true,
                  "broadband": false,
                  "phone": false,
                  "contents_insurance": false
              }
          },
          "min_contract_weeks": "",
          "deposit": {
              "amount": 250,
              "amount_per": "person"
          }
      },
      "media": {
          "photos": [{
              "photo": "http:\/\/images.website.com\/4eb81da2a4b33a0635f752749529f0fb\/large\/1185.jpg",
              "thumb": "http:\/\/images.website.com\/4eb81da2a4b33a0635f752749529f0fb\/thumbnails\/1185.jpg",
              "type": "url"
          },
          {
              "photo": "http:\/\/images.website.com\/4eb81da2a4b33a0635f752749529f0fb\/large\/1185.jpg",
              "thumb": "http:\/\/images.website.com\/4eb81da2a4b33a0635f752749529f0fb\/thumbnails\/1185.jpg",
              "type": "url"
          }],
      "videos": [],
      "floorplans": []
      },
      "energy_performance": {
        'epc_reference': '',
        'epc_certificate' : '',

      },
      "accreditations": [],
      "incomplete": "0",
      "eligibility": {
        'undergraduate_student' : true,
        'postgraduate_student' : true,
        'professional' : false,
        'trainee' : false,
        'dss' : false,
        'pets_permitted' : false,
        'smoking_permitted' : false
      }
  };

  sturents.addHouse(request);
}
