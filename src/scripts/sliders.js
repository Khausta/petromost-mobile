const bannerSwiper = new Swiper('.banner-swiper', {
    spaceBetween: '2%',
    slidesPerView: 'auto',
    loop: true,
    pagination: {
      el: ".banner-pagination",
      clickable: true,
    },
  });
  
  const infoSwiper = new Swiper('.info-swiper', {
    spaceBetween: '2%',
    slidesPerView: 'auto',
    loop: true,
    loopFillGroupWithBlank: true,
  });
  
  
  const chanceSwiper = new Swiper('.chance-swiper', {
      loop: true,
      slidesPerView: 2,
      spaceBetween: '6%',  
      navigation: {
        nextEl: '.chance-button-next',
      },
    });
  

