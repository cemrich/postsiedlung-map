import './style.css';

const url = "https://overpass-api.de/api/interpreter?data=[out:json][timeout:25][bbox:49.846119189527,8.6337089538574,49.863439787456,8.6450386047363];(node[wheelchair][name];way[wheelchair][name];);out;>;out skel qt;";

export default class WheelchairLayer {

	constructor(map) {
		this.map = map;
		this.layer = L.layerGroup(null, {
			attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		});

		fetch(url)
		  .then(response => response.json())
			.then(json => this._addMarkers(json));
	}

	_addMarkers(json) {
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
		const marker = L.circleMarker([element.lat, element.lon], {
			className: 'wheelchair-icon wheelchair-' + element.tags.wheelchair,
			radius: 8,
			weight: 2
		});

		var content = '<span class="name">' + element.tags.name + '</span>';
		content += '<div class="category"><span class="icon">' +
			this._getCategoryIcon(element) + '</span>' +
			this._getCategoryDescription(element) + '</div>';

		marker.bindTooltip(content, {
			className: 'wheelchair-tooltip wheelchair-' + element.tags.wheelchair,
			opacity: 0.95
		});

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

	_getCategoryDescription(element) {
		switch (element.tags.wheelchair) {
			case 'yes': return 'Voll rollstuhlgerecht.'
			case 'no': return 'Nicht rollstuhlgerecht.'
			default: return 'Teilweise rollstuhlgerecht.'
		}
	}

	_getCategoryIcon(element) {
		switch (element.tags.wheelchair) {
			case 'yes': return '✓'
			case 'no': return '✕'
			default: return '!'
		}
	}
}
