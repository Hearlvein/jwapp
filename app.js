// import * as all from "/animals.js";

loadView(window.location.pathname);

window.onpopstate = () => {
	loadView(window.location.pathname);
};

function loadView(url) {
	fetch(url, {
		headers: {
			"X-Requested-With": "XMLHttpRequest",
		},
	})
		.then((response) => response.text())
		.then((response) => {
			const parser = new DOMParser();
			const doc = parser.parseFromString(response, "text/html");

			// Parse content
			document.getElementById("app").innerHTML = doc.body.innerHTML;

			// Parse JavaScript
			const scriptElements = doc.querySelectorAll("script");
			scriptElements.forEach((scriptElement) => {
				const script = document.createElement("script");
				if (scriptElement.src) {
					script.src = scriptElement.src;
					script.type = "module";
				} else {
					script.textContent = scriptElement.textContent;
				}
				document.body.appendChild(script);
			});

			document.querySelectorAll("a").forEach((link) => {
				link.addEventListener("click", (event) => {
					event.preventDefault();
					const url = event.target.getAttribute("href");
					navigate(url);
				});
			});
		});
}

function navigate(url) {
	window.history.pushState({}, "", url);
	loadView(url);
}

export function http_get(url, callback) {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			callback(xhr.responseText);
		}
	};
	xhr.send();
}
