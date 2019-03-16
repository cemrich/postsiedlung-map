export default class InfoPanel {
	constructor() {
		this._infoPanel = document.querySelector("#info .wrapper");
		this._title = this._infoPanel.querySelector(".title");
		this._text = this._infoPanel.querySelector(".text");
		this._textCitation = this._infoPanel.querySelector(".text-citation");
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
		this._setText(this._title, feature.properties.name);
		this._setText(this._text, feature.properties.text);
		this._setText(this._textCitation, feature.properties.textCitation);

		this._infoPanel.style.display = "block"
	}

	_hideFeature() {
		this._infoPanel.style.display = "none";
	}

	_setText(htmlElement, text) {
		if (text) {
			htmlElement.innerHTML = text;
			htmlElement.style.display = "block";
		} else {
			htmlElement.style.display = "none";
		}
	}
}
