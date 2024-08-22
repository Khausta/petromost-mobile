const bannerSwiper = new Swiper('.banner-swiper', {
    spaceBetween: '2%',
    slidesPerView: 'auto',
    loop: true,
    pagination: {
      el: ".banner-pagination",
      clickable: true,
    },
  });

  const mainCardSwiper = new Swiper('.main-card-swiper', {
    spaceBetween: '2%',
    slidesPerView: 'auto',
  });

  const activeCardBlock = document.querySelector('.js-active-card-block');
  const disactiveCardInfo = document.querySelector('.js-disactive-card-info');
  //если будет много карт, можно изменить слушатель
  mainCardSwiper.on('slideChange', function () {
    if ((mainCardSwiper.slides[mainCardSwiper.activeIndex]).classList.contains('js-blocked-card')) {
      activeCardBlock.classList.add('js-hide-block');
      disactiveCardInfo.classList.remove('js-hide-block');
    } else {
      activeCardBlock.classList.remove('js-hide-block');
      disactiveCardInfo.classList.add('js-hide-block');
    }
  });

  
  let bullets1 = null;
  let bullets2 = null;
  let lastIndex1 = null;
  let lastIndex2 = null;
  
  let timerLastSlideId1 = null;  
  let timerLastSlideId2 = null;  
  let oldIndex1 = 0;
  let oldIndex2 = 0;

  const closeWeeks = document.querySelector('.close-promotions-week');
  const closeCashback = document.querySelector('.close-promotions-cashback');

  if (closeWeeks) {
    closeWeeks.addEventListener('click', () => {
      bullets1[storyPopupSwiper1.activeIndex].classList.remove('story-viewed');
      bullets1[storyPopupSwiper1.activeIndex].classList.remove('swiper-pagination-bullet-active');
      storyPopupSwiper1.autoplay.stop();
    })  
  }
  
  if (closeCashback) {
    closeCashback.addEventListener('click', () => {
      bullets2[storyPopupSwiper2.activeIndex].classList.remove('story-viewed');
      bullets2[storyPopupSwiper2.activeIndex].classList.remove('swiper-pagination-bullet-active');
      storyPopupSwiper2.autoplay.stop();
    })
  }


  const storyPopupSwiper1 = new Swiper('.story-swiper-1', {
    spaceBetween: '4%',
    slidesPerView: 'auto',
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: ".story-pagination-1",
      clickable: true,
    },
    on: {
      init: function () {
        lastIndex1 = this.slides.length - 1;
        this.autoplay.stop();
        bullets1 = this.pagination.bullets;
        bullets1[this.activeIndex].classList.remove('swiper-pagination-bullet-active');
      },
      slideChange: function () {
        checkProgress(this, this.pagination.bullets, oldIndex1);
        oldIndex1 = this.activeIndex;
        if (this.activeIndex == lastIndex1) {
          timerLastSlideId1 = setTimeout(closeStory1, 5000);
        } else if (this.activeIndex < lastIndex1 ){
          if (timerLastSlideId1) {
            clearTimeout(timerLastSlideId1);
            timerLastSlideId1 = null;
          }
        }
      }
    } 
  });



  const storyPopupSwiper2 = new Swiper('.story-swiper-2', {
    spaceBetween: '4%',
    slidesPerView: 'auto',
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: ".story-pagination-2",
      clickable: true,
    },
    on: {
      init: function () {
        lastIndex2 = this.slides.length - 1;
        this.autoplay.stop();
        bullets2 = this.pagination.bullets;
        bullets2[this.activeIndex].classList.remove('swiper-pagination-bullet-active');
      },
      slideChange: function () {
        checkProgress(this, this.pagination.bullets, oldIndex2);
        oldIndex2 = this.activeIndex;
        if (this.activeIndex == lastIndex2) {
          timerLastSlideId2 = setTimeout(closeStory2, 5000);
        } else if (this.activeIndex < lastIndex2 ){
          if (timerLastSlideId2) {
            clearTimeout(timerLastSlideId2);
            timerLastSlideId2= null;
          }
        }
      }
    }
    
  });
  
  function checkProgress(currentSwiper, currentBullets, oldIndex) {    
    if (currentSwiper.activeIndex > oldIndex) {
      //добавть классы просмотрено к предыдущим
        for (let i = oldIndex; i < currentSwiper.activeIndex; i++) {
          currentBullets[i].classList.add('story-viewed');
        }
      } else if (currentSwiper.activeIndex < oldIndex) {
        // убрать классы просмотрено у будущих
        for (let i = currentSwiper.activeIndex ; i <= oldIndex; i++) {
          currentBullets[i].classList.remove('story-viewed');
        }
    }
  }

function closeStory1() {
  storyPopupSwiper1.slideTo(0);
  for (let i = 0 ; i < lastIndex1; i ++) {
    bullets1[i].classList.remove('story-viewed');
  }
  closeWeeks.click();
 
}


function closeStory2() {
  storyPopupSwiper2.slideTo(0);
  for (let i = 0 ; i < lastIndex2; i ++) {
    bullets2[i].classList.remove('story-viewed');
  }
  closeCashback.click();
}

 
  const weeksBtn = document.querySelector('.weeksBtn');
  if (weeksBtn) {
    weeksBtn.addEventListener('click', () => {
      storyPopupSwiper1.autoplay.start();
      bullets1[storyPopupSwiper1.activeIndex].classList.add('swiper-pagination-bullet-active');
      
    })
  }
  
  const cashbackBtn = document.querySelector('.cashbackBtn');
  if (cashbackBtn) {
    cashbackBtn.addEventListener('click', () => {
      storyPopupSwiper2.autoplay.start();
      bullets2[storyPopupSwiper2.activeIndex].classList.add('swiper-pagination-bullet-active');
    })
  }
  
  
    
  
  const infoSwiper = new Swiper('.info-swiper', {
    spaceBetween: '2%',
    slidesPerView: 'auto',
    loop: true,
    loopFillGroupWithBlank: true,
  });

  if (document.querySelector('.path-swiper')) {
    const pathSwiper = new Swiper('.path-swiper', {
      spaceBetween: '1%',
      slidesPerView: 'auto',
      centeredSlides: false,
    });
    // Хлебные крошки показываются с последенего элемента
    const slidersCount = pathSwiper.slides.length;
    pathSwiper.slideTo(slidersCount);
  }
  
  
  const chanceSwiper = new Swiper('.chance-swiper', {
      loop: true,
      slidesPerView: 2,
      spaceBetween: '6%',  
      navigation: {
        nextEl: '.chance-button-next',
      },
    });
  

