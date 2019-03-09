(function () {

	var map = new L.map('map');
	map.setView([49.85672, 8.63896], 16);

	var osm = new L.StamenTileLayer("toner");
	map.addLayer(osm);

	function onEachFeature(feature, layer) {
		// does this feature have a property named popupContent?
		if (feature.properties && feature.properties.popupContent) {
			layer.bindPopup(feature.properties.name + "<br>" + feature.properties.popupContent);
		}
	}

	function onGeodataLoaded(json) {
		var dataLayer = L.geoJSON(json, { onEachFeature: onEachFeature });
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
