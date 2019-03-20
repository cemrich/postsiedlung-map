import './style.css';

const url = "https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node[wheelchair][name](49.846119189527,8.6337089538574,49.863439787456,8.6450386047363);way[wheelchair][name](49.846119189527,8.6337089538574,49.863439787456,8.6450386047363););out;>;out skel qt;";

export default class WheelchairLayer {

	constructor(map) {
		this.map = map;
		this.layer = L.layerGroup();

		fetch(url)
		  .then(response => response.json())
			.then(json => this._addMarkers(json));
	}

	_addMarkers(json) {
		this.layer.attribution = json.osm3s.copyright;
		const elementMap = {};
		json.elements.forEach(element => elementMap[element.id] = element);
		json.elements.forEach(marker => this._addMarker(marker, elementMap));
	}

	_addMarker(element, elementMap) {
		if (element.type === 'way') {
			this._addWayMarker(element, elementMap);
		} else if (element.tags) {
			this._addLatLonMarker(element);
		}
	}

	_addLatLonMarker(element) {
		const icon = L.divIcon({
			html: element.tags.name,
			className: 'wheelchair-icon wheelchair-' + element.tags.wheelchair
		});
		const marker = L.marker([element.lat, element.lon], { icon: icon });

		this.layer.addLayer(marker);
	}

	_addWayMarker(element, elementMap) {
		const latLons = element.nodes
			.map(node => elementMap[node])
			.map(waypoint => [waypoint.lat, waypoint.lon])
			.reduce((last, current) => [last[0]+current[0], last[1]+current[1]]);

		const latLon = [latLons[0] / element.nodes.length, latLons[1] / element.nodes.length];
		element.lat = latLon[0];
		element.lon = latLon[1];
		this._addLatLonMarker(element);
	}
}
