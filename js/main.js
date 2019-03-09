var geodata = {
    "type": "Feature",
    "properties": {
        "name": "Name",
        "popupContent": "Popup Content"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [8.63896, 49.85672]
    }
};

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

// load geo data
L.geoJSON(geodata, {
	onEachFeature: onEachFeature
}).addTo(map);
