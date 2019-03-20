import "./style.css";

export default class LayerControl {

	constructor() {
		const config = {
			collapsed: false
		};

		this._layer = L.control.layers(null, null, config);
	}

	addBaseLayer(layer, name) {
		this._layer.addBaseLayer(layer, name);
	}

	addOverlay(layer, name) {
		this._layer.addOverlay(layer, name);
	}

	addToMap(map) {
		this._layer.addTo(map);
	}
}
