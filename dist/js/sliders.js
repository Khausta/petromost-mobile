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
var storyPopupSwiper = new Swiper('.story-swiper', {
  spaceBetween: '4%',
  slidesPerView: 'auto',
  loop: true,
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: ".story-pagination",
    clickable: true
  }
});
var infoSwiper = new Swiper('.info-swiper', {
  spaceBetween: '2%',
  slidesPerView: 'auto',
  loop: true,
  loopFillGroupWithBlank: true
});
if (document.querySelector('.path-swiper')) {
  var pathSwiper = new Swiper('.path-swiper', {
    spaceBetween: '1%',
    slidesPerView: 'auto',
    centeredSlides: false
  });
  // Хлебные крошки показываются с последенего элемента
  var slidersCount = pathSwiper.slides.length;
  pathSwiper.slideTo(slidersCount);
}
var chanceSwiper = new Swiper('.chance-swiper', {
  loop: true,
  slidesPerView: 2,
  spaceBetween: '6%',
  navigation: {
    nextEl: '.chance-button-next'
  }
});
//# sourceMappingURL=sliders.js.map
