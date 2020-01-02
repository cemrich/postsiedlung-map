/* Outputs a simple list of all locations */

const geoData = require('./components/Map/data/geodata.json');

for (let location of geoData.features) {
	console.log(location.properties.name);
}
