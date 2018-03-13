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