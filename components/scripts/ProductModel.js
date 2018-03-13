//ProductModel.js

class ProductModel {
  constructor(name, priceRange, thumbnail, hero, messages, flags) {
    this.name = name;
    this.priceRange = priceRange;
    this.thumbnail = thumbnail;
    this.hero = hero;
    this.messages = messages;
    this.flags = flags;
  }

  getPriceRangeRegular() {
    return `$${this.priceRange.regular.low} - $${this.priceRange.regular.high}`;
  }
  
  getPriceRangeSelling() {
    return `Special $${this.priceRange.selling.low} - $${this.priceRange.selling.high}`;
  }

  getFlags() {
    const flagsArr = [];
    this.flags.forEach(flag => {
      flagsArr.push(flag.id);
    }); 
    return flagsArr;
  }
}