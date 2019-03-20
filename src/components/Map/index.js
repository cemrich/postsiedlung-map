import EventEmitter from 'event-emitter-es6';

import 'leaflet';
import './../../deps/stamen/tile.stamen.js';
import './style.css';
import 'leaflet_css';

import geoData from './data/geodata.json';

import Category from './Category';
import OutlineLayer from './layers/OutlineLayer';
import CategoryLayer from './layers/CategoryLayer';
import WheelchairLayer from './layers/WheelchairLayer';
import LayerControl from './LayerControl';

export default class Map extends EventEmitter {

	constructor() {
		super();

		const osm = new L.StamenTileLayer('toner');
		const outlineLayer = new OutlineLayer();
		const center = [49.85672, 8.63896];
		const panRadius = 0.01;

		this.map = new L.map('map');
		this.map.setView(center, 16);
		this.map.setMinZoom(14);
		this.map.setMaxBounds([
			[center[0] - panRadius, center[1] - panRadius],
			[center[0] + panRadius, center[1] + panRadius]
		]);
		this.map.addLayer(osm);
		this.map.addLayer(outlineLayer);

		const wheelchairLayer = new WheelchairLayer(this.map);
		this.map.addLayer(wheelchairLayer.layer);

		this.layerControl = new LayerControl();
		this.layerControl.addBaseLayer(osm, 'Karte');
		this.layerControl.addOverlay(wheelchairLayer.layer, 'Zugänglichkeit');
		this.layerControl.addToMap(this.map);

		this.map.on('popupopen', e => this.emit('feature-changed', e.popup.feature));
		this.map.on('popupclose', () => this.emit('feature-changed', null));

		this._addFeatures();
	}

	_addFeatures() {
		const historyLayer = L.layerGroup();

		for (let category of Object.values(Category.all)) {
			const categoryLayer = new CategoryLayer(geoData, category);
			historyLayer.addLayer(categoryLayer.layer);
		}

		this.layerControl.addOverlay(historyLayer, 'Geschichte');
		historyLayer.addTo(this.map);
	}
}
