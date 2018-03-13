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
    if(!this.priceRange.hasOwnProperty('regular')) {
      return '';
    }
    if(this.priceRange.regular.hasOwnProperty('low')) {
      return `$${this.priceRange.regular.low} - $${this.priceRange.regular.high}`;
    }
    return `$${this.priceRange.regular}`;
  }
  
  getPriceRangeSelling() {
    if(!this.priceRange.hasOwnProperty('selling')) {
      return '';
    }
    if(this.priceRange.selling.hasOwnProperty('low')) {
      return `Special $${this.priceRange.selling.low} - $${this.priceRange.selling.high}`;
    }
    return `$${this.priceRange.selling}`;
  }

  getFlags() {
    const flagsArr = [];
    this.flags.forEach(flag => {
      flagsArr.push(flag.id);
    }); 
    return flagsArr;
  }
}