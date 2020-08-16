/*!
  Author     : Douglas "Amarelo" Lopes
  Author URI : http://douglasamarelo.com/
  Version    : 1.0.0
  Repository : https://github.com/DouglasAmarelo/filtro-com-destaque
*/

// List of cities
const cities = [
	"Xiaomi",
	"Peter England",
	"Samsung",
	"Motorola",
	"Nokon",
	"Mahindra",
	"TATA"];

// Selected DOM elements
const $search = document.querySelector(".search");
const $list = document.querySelector(".list");
const $listFilteredItems = document.querySelector(".filtered");
const $listToralItems = document.querySelector(".total");

// Update DOM with the cities
const inertCitiesIntoDOM = (cities) => {
	const allCities = cities.map((city) => `<li>${city}</li>`).join("");
	$list.innerHTML = allCities;
};

// Show the total size of the array of cities
const updateTotalItems = (list) => ($listToralItems.innerHTML = list.length);

const updateFilteredItems = (list) =>
	($listFilteredItems.innerHTML = list.length);

// Get a text, clean and return a regex
const transformTextToRegex = (text) => {
	const result = text.trim().replace(/\(|\)/gim, "");

	return new RegExp(`(${result})`, "gmi");
};

// Return an Array filtered
const filterByRegex = (list, regex) => list.filter((item) => item.match(regex));

// Select the text that matchs with the searchterm
const highlightTextByRegex = (searchTerm, regex) => {
	$list.querySelectorAll("li").forEach((item) => {
		if (!searchTerm) return (item.innerHTML = item.textContent);

		item.innerHTML = item.textContent.replace(
			regex,
			'<span class="selected">$1</span>'
		);
	});
};

// Listen to user text input
$search.addEventListener("input", (e) => {
	const searchTerm = e.target.value;
	const searchRegex = transformTextToRegex(searchTerm);
	const filteredCities = filterByRegex(cities, searchRegex);

	inertCitiesIntoDOM(searchTerm ? filteredCities : cities);
	updateFilteredItems(searchTerm ? filteredCities : []);
	highlightTextByRegex(searchTerm, searchRegex);
});

// Start app
inertCitiesIntoDOM(cities);
updateTotalItems(cities);
