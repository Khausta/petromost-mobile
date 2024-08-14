const bannerSwiper = new Swiper('.banner-swiper', {
    spaceBetween: '2%',
    slidesPerView: 'auto',
    loop: true,
    pagination: {
      el: ".banner-pagination",
      clickable: true,
    },
  });

  const closeWeeks = document.querySelector('.close-promotions-week');
  closeWeeks.addEventListener('click', () => {
    storyPopupSwiper1.slideTo(0);
  })

  const closeCashback = document.querySelector('.close-promotions-cashback');
  closeCashback.addEventListener('click', () => {
    storyPopupSwiper2.slideTo(0);
  })


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
      reachBeginning: function () {
        closeWeeks.click();
      },
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
      reachBeginning: function () {
        closeCashback.click();
      },
    }
  });
  

  const weeksBtn = document.querySelector('.weeksBtn');
  weeksBtn.addEventListener('click', () => {
    storyPopupSwiper1.slideTo(0);
    })

  const cashbackBtn = document.querySelector('.cashbackBtn');
  cashbackBtn.addEventListener('click', () => {
    storyPopupSwiper2.slideTo(0);
    console.log("cashback is opened");
    })
    
  
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
  

