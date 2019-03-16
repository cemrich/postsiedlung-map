import ImageDisplay from "./ImageDisplay";

export default class InfoPanel {
	constructor() {
		this._container = document.querySelector("#info .wrapper");
		this._imageDisplay = new ImageDisplay();
		this._title = this._container.querySelector(".title");
		this._text = this._container.querySelector(".text");
		this._textCitation = this._container.querySelector(".text-citation");
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
		this._imageDisplay.showFeature(feature);

		this._setText(this._title, feature.properties.name);
		this._setText(this._text, feature.properties.text);
		this._setText(this._textCitation, feature.properties.textCitation);

		this._container.style.display = "block"
	}

	_hideFeature() {
		this._container.style.display = "none";
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
