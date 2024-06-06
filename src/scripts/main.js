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



const headerElements = {
  header: document.querySelector('.header'),
  logo: document.querySelector('.__js-logo'),
  openMenuOrCloseAllBtn: document.querySelector('.menu-btn')
}

const popups = {
  search: {
    overlay: document.querySelector('#search-overlay'),
    input: document.querySelector('.__js-searchInput'),
    open: function() {
      popups.openedPopups.search = true;
      popups.search.overlay.classList.add('__js-active');
      
  
    },
    close: function() {
      popups.search.overlay.classList.remove('__js-active');
      
    }
  },
  menu: {
    overlay: document.querySelector('#menu-overlay'),
    menuContent: document.querySelector('#menu-popup'),
  },
  
  openedPopups: {
    search: false,
    menu: false,
  }
  
}



// popups 
// const searchInput = document.querySelector('.__js-searchInput');
// const searchOverlay = document.querySelector('#search-overlay');
// const header = document.querySelector('.header');
// const logo = document.querySelector('.__js-logo');
// const menuBtn = document.querySelector('.menu-btn');

popups.search.input.addEventListener('focus', () => {
  openSearchPopup();
})

function openSearchPopup () {
  popups.search.open();
  if (!headerElements.header.classList.contains('__js-fixed')) {
    headerElements.header.classList.add('__js-fixed');
  }
  if (document.body.style.overflow !== 'hidden') {
    document.body.style.overflow = 'hidden';
  } 

  popups.search.input.classList.add('__js-searchInput_active');
      popups.search.input.parentElement.classList.add('__js-headerSearch_active');
  
  headerElements.openMenuOrCloseAllBtn.classList.add('__js_active');
  headerElements.logo.classList.add('__js-logo_none');
  headerElements.openMenuOrCloseAllBtn.addEventListener('click', closePopup);
}

function closePopup() {
  document.body.style.overflow = 'auto';
  headerElements.header.classList.remove('__js-fixed');
  headerElements.logo.classList.remove('__js-logo_none');
  popups.search.input.classList.remove('__js-searchInput_active');
  popups.search.input.parentElement.classList.remove('__js-headerSearch_active');
  if (popups.openedPopups.search) {
    popups.search.close();
  }

  if (popups.openedPopups.menu) {
    popups.menu.overlay.classList.remove('__js-active');
    // popups.menu.menuContent.classList.remove('__js-active');
    
  }
  
  headerElements.openMenuOrCloseAllBtn.classList.remove('__js_active');
  headerElements.openMenuOrCloseAllBtn.removeEventListener('click', closePopup);
  popups.openedPopups.search = false;
  popups.openedPopups.menu = false;
}

headerElements.openMenuOrCloseAllBtn.addEventListener('click', () => {
  if (popups.openedPopups.search) {
    return;
  }

  popups.openedPopups.menu = true;
  if (!headerElements.header.classList.contains('__js-fixed')) {
    headerElements.header.classList.add('__js-fixed');
  }
  if (document.body.style.overflow !== 'hidden') {
    document.body.style.overflow = 'hidden';
  } 
  popups.search.input.classList.add('__js-searchInput_active');
  popups.search.input.parentElement.classList.add('__js-headerSearch_active');
  popups.menu.overlay.classList.add('__js-active');
  headerElements.openMenuOrCloseAllBtn.classList.add('__js_active');
  headerElements.logo.classList.add('__js-logo_none');
  headerElements.openMenuOrCloseAllBtn.addEventListener('click', closePopup);
})