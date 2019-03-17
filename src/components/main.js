import './style.css';

import Map from './Map';
import InfoPanel from './InfoPanel';

const map = new Map();
const infoPanel = new InfoPanel();

function onFeatureChanged(feature) {
	infoPanel.showFeature(feature);
}

map.on('feature-changed', onFeatureChanged);
