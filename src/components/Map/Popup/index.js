export default class Popup {

	constructor(feature, layer) {
		const title = "<h1>" + feature.properties.name + "</h1>";
		const popupOptions = { keepInView: true };

		const popup = L.popup(popupOptions, layer);
		popup.setContent(title);
		popup.feature = feature;

		layer.bindPopup(popup);
	}

}
