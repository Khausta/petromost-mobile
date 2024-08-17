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
var closeWeeks = document.querySelector('.close-promotions-week');
closeWeeks.addEventListener('click', function () {
  storyPopupSwiper1.autoplay.stop();
  // storyPopupSwiper1.slideTo(0);
});
var closeCashback = document.querySelector('.close-promotions-cashback');
closeCashback.addEventListener('click', function () {
  // storyPopupSwiper2.slideTo(0);
  storyPopupSwiper2.autoplay.stop();
});
var storyPopupSwiper1 = new Swiper('.story-swiper-1', {
  init: false,
  spaceBetween: '4%',
  slidesPerView: 'auto',
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: ".story-pagination-1",
    clickable: true
  }
});
var storyPopupSwiper2 = new Swiper('.story-swiper-2', {
  init: false,
  spaceBetween: '4%',
  slidesPerView: 'auto',
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: ".story-pagination-2",
    clickable: true
  }
});
var weeksBtn = document.querySelector('.weeksBtn');
weeksBtn.addEventListener('click', function () {
  storyPopupSwiper1.init();
  storyPopupSwiper1.slideTo(0);
  storyPopupSwiper1.autoplay.start();
  storyPopupSwiper1.on('slideChange', function () {
    if (storyPopupSwiper1.isBeginning) {
      closeWeeks.click();
    }
  });
});
var cashbackBtn = document.querySelector('.cashbackBtn');
cashbackBtn.addEventListener('click', function () {
  storyPopupSwiper2.init();
  storyPopupSwiper2.slideTo(0);
  storyPopupSwiper2.autoplay.start();
  storyPopupSwiper2.on('slideChange', function () {
    if (storyPopupSwiper2.isBeginning) {
      closeCashback.click();
    }
  });
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
