import './style.css';

const url = "https://overpass-api.de/api/interpreter?data=[out:json][timeout:25][bbox:49.845486,8.631064,49.864687,8.64823];(node[name][wheelchair];node[name][amenity];node[name][shop];node[name][public_transport];node[name][leisure];way[name][wheelchair];way[name][shop];way[name][amenity];way[name][leisure];);out;>;out skel qt;";

export default class WheelchairLayer {

	constructor(map) {
		this.map = map;
		this.layer = L.layerGroup(null, {
			attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		});

		fetch(url)
		  .then(response => response.json())
			.then(json => { console.log(json); return json; })
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
		const category = this._getCategory(element);
		const marker = L.circleMarker([element.lat, element.lon], {
			className: 'wheelchair-icon wheelchair-' + category,
			radius: 8,
			weight: 2
		});

		let content = '<span class="name">' + element.tags.name + '</span>';
		content += '<div class="category"><span class="icon">' +
			this._getCategoryIcon(category) + '</span>' +
			this._getCategoryDescription(category) + '</div>';

		marker.bindTooltip(content, {
			className: 'wheelchair-tooltip wheelchair-' + category,
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

	_getCategory(element) {
		switch (element.tags.wheelchair) {
			case 'yes': return 'yes'
			case 'no': return 'no'
			case 'limited': return 'limited'
			default: return "unknown"
		}
	}

	_getCategoryDescription(category) {
		switch (category) {
			case 'yes': return 'Voll rollstuhlgerecht.'
			case 'no': return 'Nicht rollstuhlgerecht.'
			case 'limited': return 'Teilweise rollstuhlgerecht.'
			default: return 'Unbekannt'
		}
	}

	_getCategoryIcon(category) {
		switch (category) {
			case 'yes': return '✓'
			case 'no': return '✕'
			case 'limited': return '!'
			default: return '?'
		}
	}
}
