const request = require("postman-request");

const baseURLMapBox = "https://api.mapbox.com";
const APIKeyMapBox =
	"pk.eyJ1IjoiZXJpa2VsbGlsbyIsImEiOiJja3YwdTNmenAyZHFoMnBwNmhsdTExdmpyIn0.EGS0-8E2QVERqMEa2w4aNg";
const limit = 1;

const geocode = (addres, callback) => {
	const url = `${baseURLMapBox}/geocoding/v5/mapbox.places/${encodeURIComponent(
		addres
	)}.json?access_token=${APIKeyMapBox}&l${limit}`;

	request({ url, json: true }, (error, response) => {
		if (error) return callback("unable to connect location", undefined);
		const current = response.body;
		if (current.features.length === 0)
			return callback(
				"unbale to find location, try another search ",
				undefined
			);
		const latitude = current.features[0].center[1];
		const longitude = current.features[0].center[0];
		const currentLocation = current.features[0].place_name;
		callback(undefined, {
			latitude,
			longitude,
			currentLocation,
		});
	});
};

module.exports = geocode;
