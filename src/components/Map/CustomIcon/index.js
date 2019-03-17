const CustomIcon = L.Icon.Default.extend({
	options: {
		imagePath: 'img/markers/',
		shadowUrl: 'marker-shadow.png'
	}
});

exports.getIcon = function(categoryId) {
	return new CustomIcon({
		iconUrl: 'marker-icon-' + categoryId + '.png'
	});
};
