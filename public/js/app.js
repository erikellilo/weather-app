console.log("Client side Javascript is loaded");

const weatherForm = document.querySelector(`form`);
const search = document.querySelector(`input`);
let messageOne = document.querySelector(`#message-1`);
let messageTwo = document.querySelector(`#message-2`);

const fetchLocation = location => {
	fetch(`/weather?address=${location}`).then(response => {
		response.json().then(data => {
			if (data.error) return (messageOne.textContent = `${data.error}`);
			messageOne.textContent = `${data.currentLocation}`;
			messageTwo.textContent = `its ${data.temperature} ° but feels like ${data.feelslike} ° and humidity are ${data.humidity}`;
		});
	});
};

weatherForm.addEventListener("submit", e => {
	e.preventDefault();
	messageOne.textContent = "Loading";
	messageTwo.textContent = "";

	const location = search.value;
	if (!search.value) return console.log("Please Provide Location");
	fetchLocation(location);
});
