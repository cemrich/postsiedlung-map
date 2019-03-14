import EventEmitter from 'event-emitter-es6';

import 'leaflet';
import './../deps/stamen/tile.stamen.js';
import 'leaflet_css';

import geoData from './../data/geodata.json';

import Category from './Category';
import OutlineLayer from './OutlineLayer';
import CategoryLayer from './CategoryLayer';
import LayerControl from './LayerControl';

export default class Map extends EventEmitter {

	constructor() {
		super();

		const osm = new L.StamenTileLayer('toner');
		const outlineLayer = new OutlineLayer();

		this.map = new L.map('map');
		this.map.setView([49.85672, 8.63896], 16);
		this.map.addLayer(osm);
		this.map.addLayer(outlineLayer);

		this.layerControl = new LayerControl();
		this.layerControl.addBaseLayer(osm, 'Karte');
		this.layerControl.addToMap(this.map);

		this.map.on('popupopen', e => this.emit('feature-changed', e.popup.feature));
		this.map.on('popupclose', () => this.emit('feature-changed', null));

		this._addFeatures();
	}

	_addFeatures() {
		for (let category of Object.values(Category.all)) {
			const categoryLayer = new CategoryLayer(geoData, category);
			this.layerControl.addCategoryLayer(categoryLayer);
			this.map.addLayer(categoryLayer.layer);
		}
	}
}
