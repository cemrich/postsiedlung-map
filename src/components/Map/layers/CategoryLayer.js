import Category from './../Category';
import Popup from './../Popup';

export default class CategoryLayer {

	constructor(geodata, category) {
		const style = {
			color: category.color,
			weight: 1,
			opacity: 1,
			fillOpacity: 0.2
		};

		const config = {
			onEachFeature: this._onEachFeature,
			pointToLayer: this._pointToLayer.bind(this),
			style: style,
			filter: this._categoryFilter.bind(this)
		};

		this.category = category;
		this.layer = L.geoJSON(geodata, config);
	}

	_onEachFeature(feature, layer) {
		feature.featureType = 'history';
		new Popup(feature, layer);
	}

	_pointToLayer(feature, latlng) {
		return L.marker(latlng, { icon: this.category.icon });
	}

	_categoryFilter(feature, layer) {
		return !feature.properties.hide &&
			feature.properties.category === this.category.id;
	}
}
