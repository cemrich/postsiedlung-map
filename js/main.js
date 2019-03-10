(function () {

	var map = new L.map('map');
	map.setView([49.85672, 8.63896], 16);

	var osm = new L.StamenTileLayer('toner');
	map.addLayer(osm);

	var CustomIcon = L.Icon.Default.extend({
		options: {
			imagePath: '../../../img/',
			shadowUrl: 'marker-shadow.png'
		}
	});
	var customIcon = new CustomIcon({ iconUrl: 'marker-icon.png' });
	var customIconPlayground = new CustomIcon({ iconUrl: 'marker-icon-playground.png' });
	var customIconBuilding = new CustomIcon({ iconUrl: 'marker-icon-building.png' });

	function onEachFeature(feature, layer) {
		// does this feature have a property named popupContent?
		if (feature.properties && feature.properties.name) {
			layer.bindPopup(feature.properties.name);
		}
	}

	function getIcon(feature) {
		switch (feature.properties.catergory) {
			case "playground": return customIconPlayground;
			case "building": return customIconBuilding;
			default: return customIcon;
		}
	}

	function getColor(feature) {
		switch (feature.properties.catergory) {
			case "park": return "#77b756";
			case "school": return "#fdcc31";
			default: return "#000000";
		}
	}

	function pointToLayer(feature, latlng) {
		return L.marker(latlng, { icon: getIcon(feature) });
	}

	function onGeodataLoaded(json) {
		function style(feature) {
	    return {
		    color: getColor(feature),
		    weight: 1,
				opacity: 1,
				fillOpacity: 0.2
	    };
		}

		var dataLayer = L.geoJSON(json, {
			onEachFeature: onEachFeature,
			pointToLayer: pointToLayer,
			style: style
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
