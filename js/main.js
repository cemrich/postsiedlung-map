(function () {

	var map = new L.map('map');
	map.setView([49.85672, 8.63896], 16);

	var osm = new L.StamenTileLayer('terrain');
	map.addLayer(osm);

	var CustomIcon = L.Icon.Default.extend({
		options: {
			imagePath: '../../../img/',
			shadowUrl: 'marker-shadow.png'
		}
	});
	var customIconBlue = new CustomIcon({ iconUrl: 'marker-icon.png' });

	function onEachFeature(feature, layer) {
		// does this feature have a property named popupContent?
		if (feature.properties && feature.properties.name) {
			layer.bindPopup(feature.properties.name);
		}
	}

	function pointToLayer(feature, latlng) {
		return L.marker(latlng, { icon: customIconBlue });
	}

	function onGeodataLoaded(json) {
		var dataLayer = L.geoJSON(json, {
			onEachFeature: onEachFeature,
			pointToLayer: pointToLayer
		});
		dataLayer.addTo(map);
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

	// load outline
	fetch('data/outline.geojson')
		.then(response => response.json())
		.then(onOutlineLoaded);

	// load geo data
	fetch('data/geodata.json')
		.then(response => response.json())
		.then(onGeodataLoaded);

}());
