import CustomIcon from './../CustomIcon';

export default class Category {
  static getForFeature(feature) {
    return Category.all[feature.properties.category];
  }

  constructor(id, name, color) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.icon = CustomIcon.getIcon(this.id);
  }
}

Category.all = {
  //"playground": new Category("playground", "Spielplatz", "#000000"),
  //"school": new Category("school", "Schule", "#fdcc31"),
  "building": new Category("building", "Gebäude", "#291e6e"),
  "park": new Category("park", "Park", "#77b756")
};
