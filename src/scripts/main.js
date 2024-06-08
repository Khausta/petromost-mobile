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
  path: [],
  allPopups: document.querySelectorAll('.overlay'),
  closeAllPopups() {
    popups.allPopups.forEach(el => {
      el.classList.remove('__js-active');
    });
    for (let el in popups.openedPopups) {
      popups.openedPopups[el] = false;
    }  
  },
  search: {
    overlay: document.querySelector('#search-overlay'),
    input: document.querySelector('.__js-searchInput'),
    open: function() {
      popups.closeAllPopups();
      popups.openedPopups.search = true;
      popups.search.overlay.classList.add('__js-active');
      headerElements.logo.classList.add('__js-logo_none');
  
    },
    close: function() {
      popups.search.overlay.classList.remove('__js-active');
      headerElements.logo.classList.remove('__js-logo_none');
      popups.search.input.classList.remove('__js-searchInput_active');
      popups.search.input.parentElement.classList.remove('__js-headerSearch_active');
    }
  },
  menu: {
    overlay: document.querySelector('#menu-overlay'),
    menuContent: document.querySelector('#menu-popup'),
  },
  profile: {
    trigger: document.querySelector('.menu__profile'),
    overlay: document.querySelector('#profile-overlay'),
    content: document.querySelector('#profile-popup'),
  },
  profileData: {
    trigger: document.querySelector('#profile-data'),
    overlay: document.querySelector('#profile-data-overlay'),
    content: document.querySelector('#profile-data-popup'),
  },
  
  openedPopups: {
    search: false,
    menu: false,
    profile: false,
    profileData: false,
  }
  
}

//собитие на фокус инпута поиска
popups.search.input.addEventListener('focus', () => {
  openSearchPopup();
})

//логика открытия поиска отличчается, поэтому создана отдельная функция
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
  headerElements.openMenuOrCloseAllBtn.addEventListener('click', closePopup);
}

// закрытие попапов
function closePopup() {
  document.body.style.overflow = 'auto';
  headerElements.header.classList.remove('__js-fixed');
  if (popups.openedPopups.search) {
    popups.search.close();
    popups.openedPopups.search = false;
  }
  popups.closeAllPopups();
  headerElements.openMenuOrCloseAllBtn.classList.remove('__js_active');
  headerElements.openMenuOrCloseAllBtn.removeEventListener('click', closePopup);
}

// собитие на клик по кнопке меню
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
  popups.menu.overlay.classList.add('__js-active');
  headerElements.openMenuOrCloseAllBtn.classList.add('__js_active');
  headerElements.openMenuOrCloseAllBtn.addEventListener('click', closePopup);
});

popups.profile.trigger.addEventListener('click', () => {
  popups.closeAllPopups();
  popups.openedPopups.profile = true;
  popups.profile.overlay.classList.add('__js-active');

});

popups.profileData.trigger.addEventListener('click', () => {
  popups.closeAllPopups();
  popups.openedPopups.profileData = true;
  popups.profileData.overlay.classList.add('__js-active');

});




//открытие Центра уведомлений
document.querySelectorAll('.menu__li-with-content').forEach(el => {
  el.addEventListener('click', () => {
    const arrow = el.querySelector('.menu-link__icon');
    const content = el.querySelector('.menu__content');

    if (content.style.maxHeight) {
      document.querySelectorAll('.menu__content').forEach( item => {
        item.style.maxHeight = null;
        item.style.opacity = null;
        }) 
      document.querySelectorAll('.menu-link__icon').forEach(item => {
        item.classList.remove('__js-opened');
      })
    } else {
      document.querySelectorAll('.menu__content').forEach( item => {
        item.style.maxHeight = null;
        item.style.opacity = null;  
      })
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.opacity = 1;
      
      document.querySelectorAll('.menu-link__icon').forEach(item => {
        item.classList.remove('__js-opened');
      })
      arrow.classList.add('__js-opened');
    }
  })
})

