"use strict";

var bannerSwiper = new Swiper('.banner-swiper', {
  spaceBetween: '2%',
  slidesPerView: 'auto',
  loop: true,
  pagination: {
    el: ".banner-pagination",
    clickable: true
  }
});
var infoSwiper = new Swiper('.info-swiper', {
  spaceBetween: '2%',
  slidesPerView: 'auto',
  loop: true,
  loopFillGroupWithBlank: true
});
var chanceSwiper = new Swiper('.chance-swiper', {
  loop: true,
  slidesPerView: 2,
  spaceBetween: '6%',
  navigation: {
    nextEl: '.chance-button-next'
  }
});

// popups 
var searchInput = document.querySelector('.__js-searchInput');
var searchOverlay = document.querySelector('#search-overlay');
var header = document.querySelector('.header');
var logo = document.querySelector('.__js-logo');
searchInput.addEventListener('focus', function () {
  openPopup();
});
function openPopup() {
  searchOverlay.classList.add('__js-active');
  if (!header.classList.contains('__js-fixed')) {
    header.classList.add('__js-fixed');
  }
  if (document.body.style.overflow !== 'hidden') {
    document.body.style.overflow = 'hidden';
  }
  logo.classList.add('__js-logo_none');
  searchInput.classList.add('__js-searchInput_active');
  searchInput.parentElement.classList.add('__js-headerSearch_active');
}
//# sourceMappingURL=main.js.map
