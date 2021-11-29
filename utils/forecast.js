const request = require("postman-request");
const APIKey = "60c9c09e1b6b0ff2b75b2901964765a8";
const baseURL = "http://api.weatherstack.com/";
const units = "m";

const foreceast = (latitude, longitude, callback) => {
	request(
		{
			url: `${baseURL}/current?access_key=${APIKey}&query=${latitude},${longitude}&units=${units}`,
			json: true,
		},
		(error, response) => {
			if (error)
				return callback("unable to connect to weather", undefined);
			if (response.error)
				return callback("unable to find lication", undefined);
			const { current } = response.body;
			const { temperature, feelslike, weather_descriptions } = current;

			callback(undefined, {
				temperature,
				feelslike,
				weather_descriptions,
			});
		}
	);
};

module.exports = foreceast;
