

//------------------------------------------------------------------
//helpers.js

const loadProducts = products => {
  const prodMap = new Map();
  products.groups.forEach(product => {
    let productObj = new ProductModel(
      product.name,
      product.priceRange,
      product.thumbnail.href,
      product.hero.href,
      product.messages,
      product.flags
    );
    
    prodMap.set(product.id, productObj);
  });

  return prodMap;
};

const initDetailsHtml = prodMap => {
  //Initialize details HTML as first product
  let detailHtml = getProdDetHtml(productsMap.get('gemini-rug-multi-t4401'));
  document.querySelector('.details-wrapper').innerHTML = detailHtml;
};

const initCarouselListHtml = prodMap => {
  //Set up slides HTML
  prodMap.forEach((product, key) => {
    let slides = document.createElement('div');
    slides.classList.add('slides');
    slides.classList.add('hidden');

    let slideImg = document.createElement('img');
    slideImg.setAttribute('src', product.hero);
    slides.appendChild(slideImg);

    let slideId = document.createElement('input');
    slideId.setAttribute('type', 'hidden'); 
    slideId.setAttribute('name', 'product-id');
    slideId.setAttribute('value', key);
    slides.appendChild(slideId);

    document.querySelector('.carousel-content').appendChild(slides);
  });

  //Add next and prev arrows, and dot buttons
  let next = document.createElement('a');
  next.id = 'next';
  next.classList.add('next');
  next.appendChild(document.createTextNode('>'));
  let prev = document.createElement('a');
  prev.id = 'prev';
  prev.classList.add('prev');
  prev.appendChild(document.createTextNode('<'));

  document.querySelector('.carousel-content').appendChild(next);
  document.querySelector('.carousel-content').appendChild(prev);

  let dotsWrapper = document.createElement('div');
  dotsWrapper.classList.add('dots-wrapper');
  for(let i = 0; i < prodMap.size; i++) {
    let dots = document.createElement('span');
    dots.classList.add('dots');
    dots.onclick = function() { currentSlide(i) };
    dotsWrapper.appendChild(dots);
  }
  document.querySelector('.carousel-content').appendChild(dotsWrapper);

  //Set carousel to first item
  document.querySelector('.slides').classList.remove('hidden');
  document.querySelector('.dots').classList.add('active');
}

const openCarousel = () => document.querySelector('.carousel-content').style.display = 'block';

const closeCarousel = () => {
  document.querySelector('.carousel-content').style.display = 'none';
  slideIndex = 0;
}

// Next/previous controls
function changeSlide(evt) {
  let n = 1;
  //Get target: prev or next??
  if(evt.target.id == 'prev') {
    n = -1;
  }

  showSlide(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlide(slideIndex = n);
}

function showSlide(n) {
  let slides = document.getElementsByClassName('slides');
  let dots = document.getElementsByClassName('dots');

  if (n > slides.length - 1) {
    slideIndex = 0
  } 
  if (n < 0) {
    slideIndex = slides.length - 1;
  }

  for (let i = 0; i < slides.length; i++) {
      slides[i].classList.add('hidden');
  }
  for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
  }

  slides[slideIndex].classList.remove('hidden');
  dots[slideIndex].classList.add('active');
}

//------------------------------------------------------------------
//ProductCtrl.js
'use strict';

let productsMap;
let slideIndex = 0;

document.addEventListener("DOMContentLoaded", function() {
  //First make Fetch call to load JSON data file
  fetch('data/products.json')
    .then(function(response) {
      return response.json()
    }).then(function(products) {
      //Use a Map to store each data object so they can be referenced by the ID
      productsMap = loadProducts(products);
      initDetailsHtml(productsMap);
      initCarouselListHtml(productsMap);

      showSlide(slideIndex);

      //Set up events
      document.querySelector('.details-img-wrapper img').addEventListener('click', openCarousel, false);

      document.querySelector('.carousel-close').addEventListener('click', closeCarousel, false);

      document.querySelector('.next').addEventListener('click', changeSlide, false);
      document.querySelector('.prev').addEventListener('click', changeSlide, false);
    });
}); 

//------------------------------------------------------------------
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

//------------------------------------------------------------------
//ProductViewDetail.js

const getProdDetHtml = (product) => {

  const flagsArr = product.getFlags();
  let flagsStr = '';
  flagsArr.forEach(flag => {
    flagsStr += '<span class="product-flag">' + flag + '</span>';
  });

  let messagesStr = '';
  product.messages.forEach(message => {
    messagesStr += message + '<br>'
  });

  let prodDetHtml = `
    <div class="details-img-wrapper">
      <img src="${product.hero}"> 
    </div>

    <div class="details-txt-wrapper">
      <div class="txt-justifier">
        <div class="product-title">
            <h2>${product.name}</h2>
        </div>

        <div class="product-flags-list">
          ${flagsStr}
        </div>

        <div class="price-range-list">
          <div class="price-range-regular">
            ${product.getPriceRangeRegular()}
          </div>

          <div class="price-range-selling">
            ${product.getPriceRangeSelling()}
          </div>
        </div>

        <div class="product-messages">
          ${messagesStr}
        </div>
      </div>
    </div>
  `;

  return prodDetHtml;
}