import EventEmitter from 'event-emitter-es6';

import 'leaflet';
import './../../deps/stamen/tile.stamen.js';
import './style.css';
import 'leaflet_css';

import geoData from './data/geodata.json';

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

		const historicMap1906 = L.imageOverlay('img/maps/map_1906_railway.jpg', [[49.9049487, 8.6132276], [49.8439883, 8.6885816]]);
		const historicMap1927 = L.imageOverlay('img/maps/Sp_Da1927_0001.jpg',
			[[49.9015316, 8.6070371], [49.8436596, 8.7044227]],
			{
				attribution: 'Karte von <a href="http://tudigit.ulb.tu-darmstadt.de/show/Sp_Da1927/0001">Universitäts- und Landesbibliothek Darmstadt</a>, unter <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0</a>'
			});

		const dataPointsLayer = this._getDataPoints();
		const todayLayerGroup = L.layerGroup([stamenLayer, outlineLayer]);
		const historyLayerGroup1906 = L.layerGroup([stamenLayer, historicMap1906, outlineLayer]);
		const historyLayerGroup1927 = L.layerGroup([stamenLayer, historicMap1927, outlineLayer]);

		this.map.addLayer(todayLayerGroup);
		this.map.addLayer(dataPointsLayer);

		this.layerControl = new LayerControl();
		this.layerControl.addBaseLayer(todayLayerGroup, 'Heute');
		this.layerControl.addBaseLayer(historyLayerGroup1906, '1906');
		this.layerControl.addBaseLayer(historyLayerGroup1927, '1927');
		this.layerControl.addOverlay(dataPointsLayer, 'Orte');
		this.layerControl.addToMap(this.map);

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
