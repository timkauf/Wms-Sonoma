//ProductCtrl.js
'use strict';

let productsMap;
let keysArr = [];
let slideIndex = 0;
let initialProdKey = 'gemini-rug-multi-t4401';

document.addEventListener("DOMContentLoaded", function() {
  //First make Fetch call to load JSON data file
  fetch('data/products.json')
    .then(function(response) {
      return response.json()
    }).then(function(products) {
      //Use a Map to store each data object so they can be referenced by the ID
      productsMap = loadProducts(products, keysArr);
      loadDetailsHtml(initialProdKey);
      initCarouselListHtml(productsMap);

      showSlide(slideIndex);

      //Set up events

      //Open navigations carousel
      document.querySelector('.details-img-wrapper img').addEventListener('click', openCarousel, false);

      //Close carousel
      document.querySelector('.carousel-close').addEventListener('click', closeCarousel, false);

      //Prev & Next buttons in carousel
      document.querySelector('.next').addEventListener('click', changeSlide, false);
      document.querySelector('.prev').addEventListener('click', changeSlide, false);

      //Selecting item in carousel to load into main details page
      document.querySelector('.carousel-content').addEventListener('click', changeProductInDetails, false);

    });
}); 