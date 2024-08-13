const bannerSwiper = new Swiper('.banner-swiper', {
    spaceBetween: '2%',
    slidesPerView: 'auto',
    loop: true,
    pagination: {
      el: ".banner-pagination",
      clickable: true,
    },
  });

  const storyPopupSwiper = new Swiper('.story-swiper', {
    spaceBetween: '4%',
    slidesPerView: 'auto',
    loop: true,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: ".story-pagination",
      clickable: true,
    },
  });
  
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
  

