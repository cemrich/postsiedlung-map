export default class LinkPanel {
	constructor() {
		this._container = document.querySelector("#info .links");
		this._list = this._container.querySelector("ul");

		this._linkTypes = [
			{ id: "wikipedia", name: "Wikipedia" },
			{ id: "stadtlexikon", name: "Stadtlexikon Darmstadt" },
		];
	}

	showFeature(feature) {
		if (this._hasLinks(feature)) {
			this._showFeature(feature);
		} else {
			this._hideFeature();
		}
	}

	_hasLinks(feature) {
		return this._linkTypes.some(linkType => feature.properties[linkType.id]) ||
			feature.properties.links;
	}

	_showFeature(feature) {
		this._list.innerHTML = "";
		this._linkTypes
			.filter(linkType => feature.properties[linkType.id])
			.forEach(linkType => {
				this._showLinkType(feature.properties[linkType.id], linkType);
			});

		if (feature.properties.links) {
			feature.properties.links
				.forEach(link => {
					this._showLinkType(link.url, { name: link.title });
				});
		}

		this._container.style.display = "block"
	}

	_hideFeature() {
		this._container.style.display = "none";
	}

	_showLinkType(url, linkType) {
		const link = document.createElement("a");
		link.innerHTML = linkType.name;
		link.href = url;
		link.target = "_blank";

		const listItem = document.createElement("li");
		listItem.appendChild(link);

		this._list.appendChild(listItem);
	}
}
