const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");

// !define path for express config
const staticPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partial = path.join(__dirname, "../templates/partials");

// !setup view engine where express should view and what should view
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partial);

// !Setup static directory
app.use(express.static(staticPath));

app.get("", (req, res) => {
	res.render("index", { title: "Weather", nameApps: "Erik " });
});

app.get("/about", (req, res) => {
	res.render("about", { title: "About", nameApps: "Erik" });
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "help",
		message: "This is page for help",
		nameApps: "Erik",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address)
		return res.send({
			errorMassage: "Please Provide addres",
		});
	geocode(
		req.query.address,
		(error, { latitude, longitude, currentLocation } = {}) => {
			if (error)
				return res.send({
					error,
				});
			forecast(
				latitude,
				longitude,
				(error, { weather_descriptions, temperature, feelslike }) => {
					if (error)
						return res.send({
							error,
						});
					res.send({
						address: req.query.address,
						latitude,
						longitude,
						currentLocation,
						weather_descriptions,
						temperature,
						feelslike,
					});
				}
			);
		}
	);
});

app.get("/products", (req, res) => {
	if (!req.query.search)
		return res.send({ errorMassage: "you must provide search term" });

	console.log(req.query);
	res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
	res.render("notfound", {
		title: "Help 404",
		nameApps: "Erik",
		view: "Help",
		errorMassage: "Page not Found",
	});
});

app.get("/help/render", (req, res) => {
	res.render("notfound", {
		title: "Help 404",
		nameApps: "Erik",
		view: "Help",
		errorMassage: "Page not Found",
	});
});

app.get("*", (req, res) => {
	res.render("notfound", {
		title: "404",
		errorMassage: "Page not Found",
		nameApps: "Erik",
	});
});

app.listen(3000, () => {
	console.log("server is up in port 3000");
});
