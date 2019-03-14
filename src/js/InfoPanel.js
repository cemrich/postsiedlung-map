export default class InfoPanel {
	constructor() {
		this.infoPanel = document.querySelector("#info .wrapper");
		this.showFeature(null);
	}

	showFeature(feature) {
		console.log(feature);
		if (feature === null) {
			this.infoPanel.style.display = "none";
		} else {
			this.infoPanel.querySelector(".title").innerHTML = feature.properties.name;
			this.infoPanel.style.display = "block"
		}
	}
}
