var fetch = require('node-fetch');
var HttpsProxyAgent = require('https-proxy-agent');

var catset = new Set();

function meow() {
	setTimeout( function () {
		fetch(
			"https://www.petfinder.com/search/?page=1&limit[]=100&status=adoptable&days_on_petfinder[]=1&distance[]=100&type[]=cats&sort[]=nearest&age[]=Baby&gender[]=Male&location_slug[]=us%2Fca%2F99999",
			{
				"agent" : new HttpsProxyAgent('http://127.0.0.1:8888'),
				"credentials" : "omit",
				"headers" : {
					"accept" : "application/json, text/plain, */*",
					"sec-fetch-mode" : "cors","x-requested-with" : "XMLHttpRequest"
				},
				"referrer" : "https://www.petfinder.com/search/cats-for-adoption/us/ca/99999/?age%5B0%5D=Baby&days_on_petfinder=1&gender%5B0%5D=male",
				"referrerPolicy" : "no-referrer-when-downgrade",
				"body" : null,
				"method" : "GET",
				"mode" : "cors"
		})
		.then(function(response) {
			return response.json(); 
		})
		.then(function(catJson) {
			for (let cat of catJson.result.animals) {
				if (! catset.has(cat.animal.id)) {
					console.log(cat.animal.social_sharing.email_url)
					catset.add(cat.animal.id)
				}
			}
			console.log('--------------------------------------------------------------------------------------------------------------------')
		});
		meow()
	}, 60000);
}

meow();
