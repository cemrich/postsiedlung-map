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
			this._container.style.display = "flex";
	}

	_hideFeature() {
		this._container.style.display = "none";
	}

	_addImage(image) {
		const imageContainerDom = document.createElement('div');
		const imageDom = document.createElement('img');
		const infoText = document.createElement('span');

		imageContainerDom.className = "container";
		infoText.className = "info";
		infoText.innerHTML = image.credits + " (" + image.year + ")";
		imageDom.src = 'img/locations/' + image.name;

		imageContainerDom.appendChild(infoText);
		imageContainerDom.appendChild(imageDom);
		this._container.appendChild(imageContainerDom);
	}
}
