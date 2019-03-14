import 'leaflet.snogylop';

import outlineData from './../data/outline.json';

export default class OutlineLayer extends L.geoJSON {
	constructor() {
		const style = {
				"color": "#000000",
				"weight": 0
		};

		const config = {
			invert: true,
			style: style
		};

		const dataLayer = L.geoJSON(outlineData, {
			invert: true,
			style: style
		});

		super(outlineData, config);
	}
}
