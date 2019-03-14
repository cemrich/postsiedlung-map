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

	addCategoryLayer(categoryLayer) {
		this._layer.addOverlay(categoryLayer.layer, categoryLayer.category.name);
	}

	addToMap(map) {
		this._layer.addTo(map);
	}
}
