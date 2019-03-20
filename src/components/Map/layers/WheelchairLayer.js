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
		json.elements.forEach(marker => this._addMarker(marker));
	}

	_addMarker(element) {
		if (element.type === 'way' || !element.tags) {
			// this is a polygon or part of a polygon
			// TODO: implement ways/areas
			return;
		}

		const icon = L.divIcon({
			html: element.tags.name,
			className: 'wheelchair-icon wheelchair-' + element.tags.wheelchair
		});
		const marker = L.marker([element.lat, element.lon], { icon: icon });

		this.layer.addLayer(marker);
	}
}
