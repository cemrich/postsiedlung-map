import EventEmitter from 'event-emitter-es6';

import 'leaflet';
import './../../deps/stamen/tile.stamen.js';
import './style.css';
import 'leaflet_css';

import geoData from './data/geodata.json';
import historicMapsData from './data/historic-maps.json';

import Category from './Category';
import OutlineLayer from './layers/OutlineLayer';
import CategoryLayer from './layers/CategoryLayer';
import LayerControl from './LayerControl';

export default class Map extends EventEmitter {

	constructor() {
		super();

		const stamenLayer = new L.StamenTileLayer('toner');
		const outlineLayer = new OutlineLayer();
		const center = [49.85672, 8.63896];
		const panRadius = 0.01;

		const wikimediaLayer = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
			attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>'
		});

		this.map = new L.map('map');
		this.map.setView(center, 16);
		this.map.setMinZoom(14);
		this.map.setMaxBounds([
			[center[0] - panRadius, center[1] - panRadius],
			[center[0] + panRadius, center[1] + panRadius]
		]);

		const dataPointsLayer = this._getDataPoints();
		const todayLayerGroup = L.layerGroup([stamenLayer, outlineLayer]);

		this.layerControl = new LayerControl();
		this.layerControl.addBaseLayer(todayLayerGroup, 'Heute');
		this.layerControl.addOverlay(dataPointsLayer, 'Orte');
		this.layerControl.addToMap(this.map);

		this.map.addLayer(todayLayerGroup);
		this.map.addLayer(dataPointsLayer);

		for (let historicMap of historicMapsData) {
			const map = L.imageOverlay('img/maps/' + historicMap.fileName, historicMap.bounds, { attribution: historicMap.attribution });
			const layerGroup = L.layerGroup([stamenLayer, map, outlineLayer]);
			this.layerControl.addBaseLayer(layerGroup, historicMap.title);
		}

		this.map.on('popupopen', e => this.emit('feature-changed', e.popup.feature));
		this.map.on('popupclose', () => this.emit('feature-changed', null));
	}

	_getDataPoints() {
		const historyLayer = L.layerGroup();

		for (let category of Object.values(Category.all)) {
			const categoryLayer = new CategoryLayer(geoData, category);
			historyLayer.addLayer(categoryLayer.layer);
		}

		return historyLayer;
	}
}
