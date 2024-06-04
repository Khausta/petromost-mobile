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


// popups 
const searchInput = document.querySelector('.__js-searchInput');
const searchOverlay = document.querySelector('#search-overlay');
const header = document.querySelector('.header');
const logo = document.querySelector('.__js-logo');

searchInput.addEventListener('focus', () => {
  openPopup();
})

function openPopup () {
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