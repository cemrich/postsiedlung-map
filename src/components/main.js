import './style.css';

import Map from './Map';
import InfoPanel from './InfoPanel';

const map = new Map();
const infoPanel = new InfoPanel();

function onFeatureChanged(feature) {
	console.log('onFeatureChanged', feature);

	if (feature === null) {
		infoPanel.hideFeature();
	} else if (feature.featureType === 'history') {
		infoPanel.showFeature(feature);
	}
}

map.on('feature-changed', onFeatureChanged);
