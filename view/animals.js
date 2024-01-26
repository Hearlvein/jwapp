import { http_get } from "./app.js";

// Load animals.json
http_get("/animals.json", function (response) {
	const animals = JSON.parse(response);
	const animalsList = document.getElementById("animals-collection");
	animals.forEach((animal) => {
		const li = document.createElement("li");
		li.innerHTML = animal.name;
		animalsList.appendChild(li);
	});
});
