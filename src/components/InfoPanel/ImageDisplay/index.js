import "./style.css";

export default class ImageDisplay {
	constructor() {
		this._container = document.querySelector("#info .image-display");
	}

	showFeature(feature) {
		if (feature.properties.images) {
			this._showFeature(feature);
		} else {
			this._hideFeature();
		}
	}

	_showFeature(feature) {
		this._container.innerHTML = "";
		feature.properties.images.forEach(image => this._addImage(image));
		this._container.style.display = "block";
	}

	_hideFeature() {
		this._container.style.display = "none";
	}

	_addImage(image) {
		const imageDom = document.createElement('img');
		imageDom.src = 'img/locations/' + image.name;
		this._container.appendChild(imageDom);
	}
}
