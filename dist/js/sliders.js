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
  storyPopupSwiper1.slideTo(0);
});
var closeCashback = document.querySelector('.close-promotions-cashback');
closeCashback.addEventListener('click', function () {
  storyPopupSwiper2.slideTo(0);
});
var storyPopupSwiper1 = new Swiper('.story-swiper-1', {
  spaceBetween: '4%',
  slidesPerView: 'auto',
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: ".story-pagination-1",
    clickable: true
  },
  on: {
    reachBeginning: function reachBeginning() {
      closeWeeks.click();
    }
  }
});
var storyPopupSwiper2 = new Swiper('.story-swiper-2', {
  spaceBetween: '4%',
  slidesPerView: 'auto',
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: ".story-pagination-2",
    clickable: true
  },
  on: {
    reachBeginning: function reachBeginning() {
      closeCashback.click();
    }
  }
});
var weeksBtn = document.querySelector('.weeksBtn');
weeksBtn.addEventListener('click', function () {
  storyPopupSwiper1.slideTo(0);
});
var cashbackBtn = document.querySelector('.cashbackBtn');
cashbackBtn.addEventListener('click', function () {
  storyPopupSwiper2.slideTo(0);
  console.log("cashback is opened");
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
