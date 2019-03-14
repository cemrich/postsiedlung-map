import geoData from './../data/geodata.json';
import outlineData from './../data/outline.json';
import Category from './Category';
import Popup from './Popup';

export default class Map {

	constructor() {
		var map = new L.map('map');
		map.setView([49.85672, 8.63896], 16);

		var osm = new L.StamenTileLayer('toner');
		map.addLayer(osm);

		function onPopupOpen(feature) {
			infoPanel.querySelector(".title").innerHTML = feature.properties.name;
			infoPanel.style.display = "block"
		}

		function onPopupClose() {
			infoPanel.style.display = "none"
		}

		var infoPanel = document.querySelector("#info .wrapper");
		onPopupClose();

		map.on('popupopen', args => onPopupOpen(args.popup.feature));
		map.on('popupclose', onPopupClose);

		function onEachFeature(feature, layer) {
			new Popup(feature, layer);
		}

		function pointToLayer(feature, latlng) {
			var category = Category.getForFeature(feature);
			return L.marker(latlng, { icon: category.icon });
		}

		function onGeodataLoaded(json) {
			function style(feature) {
				var category = Category.getForFeature(feature);
		    return {
			    color: category.color,
			    weight: 1,
					opacity: 1,
					fillOpacity: 0.2
		    };
			}

			function categoryFilter(feature, layer) {
				return feature.properties.category === category.id;
			}

			var layerControl = {};

			for (var category of Object.values(Category.all)) {
				var dataLayer = L.geoJSON(json, {
					onEachFeature: onEachFeature,
					pointToLayer: pointToLayer,
					style: style,
					filter: categoryFilter
				});

				layerControl[category.name] = dataLayer;
				dataLayer.addTo(map);
			}

			L.control.layers(null, layerControl, {
				collapsed: false
			}).addTo(map);
		}

		function onOutlineLoaded(json) {
			var style = {
			    "color": "#000000",
			    "weight": 0
			};

			var dataLayer = L.geoJSON(json, {
				invert: true,
			 	style: style
			});
			dataLayer.addTo(map);
		}

		onOutlineLoaded(outlineData);
		onGeodataLoaded(geoData);
	}
}
