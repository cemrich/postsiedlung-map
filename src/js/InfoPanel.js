export default class InfoPanel {
	constructor() {
		this._infoPanel = document.querySelector("#info .wrapper");
		this.showFeature(null);
	}

	showFeature(feature) {
		if (feature === null) {
			this._hideFeature();
		} else {
			this._showFeature(feature);
		}
	}

	_showFeature(feature) {
		this._infoPanel.querySelector(".title").innerHTML = feature.properties.name;
		this._infoPanel.style.display = "block"
	}

	_hideFeature() {
		this._infoPanel.style.display = "none";
	}
}
