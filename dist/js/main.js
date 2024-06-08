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
var infoSwiper = new Swiper('.info-swiper', {
  spaceBetween: '2%',
  slidesPerView: 'auto',
  loop: true,
  loopFillGroupWithBlank: true
});
var chanceSwiper = new Swiper('.chance-swiper', {
  loop: true,
  slidesPerView: 2,
  spaceBetween: '6%',
  navigation: {
    nextEl: '.chance-button-next'
  }
});
var state = {
  path: [],
  openedPopups: {
    search: false,
    menu: false,
    profile: false,
    profileData: false,
    myCard: false
  }
};
var headerElements = {
  header: document.querySelector('.header'),
  logo: document.querySelector('.__js-logo'),
  openMenuOrCloseAllBtn: document.querySelector('.menu-btn')
};
var popups = {
  allPopups: document.querySelectorAll('.overlay'),
  closeAllPopups: function closeAllPopups() {
    popups.allPopups.forEach(function (el) {
      el.classList.remove('__js-active');
    });
    for (var el in state.openedPopups) {
      state.openedPopups[el] = false;
    }
  },
  returnBtns: document.querySelectorAll('.return-btn'),
  'search': {
    overlay: document.querySelector('#search-overlay'),
    input: document.querySelector('.__js-searchInput'),
    open: function open() {
      popups.closeAllPopups();
      state.openedPopups.search = true;
      popups.search.overlay.classList.add('__js-active');
      headerElements.logo.classList.add('__js-logo_none');
    },
    close: function close() {
      popups.search.overlay.classList.remove('__js-active');
      headerElements.logo.classList.remove('__js-logo_none');
      popups.search.input.classList.remove('__js-searchInput_active');
      popups.search.input.parentElement.classList.remove('__js-headerSearch_active');
    }
  },
  'menu': {
    overlay: document.querySelector('#menu-overlay'),
    menuContent: document.querySelector('#menu-popup')
  },
  'profile': {
    trigger: document.querySelector('.menu__profile'),
    overlay: document.querySelector('#profile-overlay'),
    content: document.querySelector('#profile-popup')
  },
  'profileData': {
    trigger: document.querySelector('#profile-data'),
    overlay: document.querySelector('#profile-data-overlay'),
    content: document.querySelector('#profile-data-popup')
  },
  'myCard': {
    trigger: document.querySelector('#my-card'),
    overlay: document.querySelector('#my-card-overlay'),
    content: document.querySelector('#my-card-popup')
  }
};

//собитие на фокус инпута поиска
popups.search.input.addEventListener('focus', function () {
  openSearchPopup();
});

//логика открытия поиска отличчается, поэтому создана отдельная функция
function openSearchPopup() {
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
  if (state.openedPopups.search) {
    popups.search.close();
    state.openedPopups.search = false;
  }
  popups.closeAllPopups();
  state.path = [];
  headerElements.openMenuOrCloseAllBtn.classList.remove('__js_active');
  headerElements.openMenuOrCloseAllBtn.removeEventListener('click', closePopup);
}

// собитие на клик по кнопке меню
headerElements.openMenuOrCloseAllBtn.addEventListener('click', function () {
  if (state.openedPopups.search) {
    return;
  }
  if (!state.path.find(function (el) {
    return el == 'menu';
  })) {
    console.log(true);
    state.path.push('menu');
  }
  state.openedPopups.menu = true;
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
function openAnyPopup(popupName) {
  popups.closeAllPopups();
  state.openedPopups[popupName] = true;
  popups[popupName].overlay.classList.add('__js-active');
  popups.returnBtns.forEach(function (btn) {
    btn.addEventListener('click', openPreviousPopup);
  });
  if (popupName != 'search' && popupName != 'menu' && state.path[state.path.length - 1] != popupName) {
    console.log('check');
    state.path.push("".concat(popupName));
  }
  console.log(state.path);
}
popups.profile.trigger.addEventListener('click', function () {
  openAnyPopup('profile');
});
popups.profileData.trigger.addEventListener('click', function () {
  openAnyPopup('profileData');
});
popups.myCard.trigger.addEventListener('click', function () {
  openAnyPopup('myCard');
});
function openPreviousPopup() {
  state.path.pop();
  openAnyPopup(state.path[state.path.length - 1]);
}

//открытие скрытого контента, если есть
document.querySelectorAll('.menu__li-with-content').forEach(function (el) {
  el.addEventListener('click', function () {
    var arrow = el.querySelector('.menu-link__icon');
    var content = el.nextElementSibling;
    if (content.style.maxHeight) {
      document.querySelectorAll('.menu__content').forEach(function (item) {
        item.style.maxHeight = null;
        item.style.opacity = null;
      });
      document.querySelectorAll('.menu-link__icon').forEach(function (item) {
        item.classList.remove('__js-opened');
      });
    } else {
      document.querySelectorAll('.menu__content').forEach(function (item) {
        item.style.maxHeight = null;
        item.style.opacity = null;
      });
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.opacity = 1;
      document.querySelectorAll('.menu-link__icon').forEach(function (item) {
        item.classList.remove('__js-opened');
      });
      arrow.classList.add('__js-opened');
    }
  });
});

// для инпутов Данных профиля
document.querySelectorAll('.profile-data__input').forEach(function (input) {
  input.addEventListener('input', function () {
    console.log(input.value);
    if (input.value) {
      input.nextElementSibling.classList.add('__js-active');
      input.nextElementSibling.addEventListener('click', function () {
        input.value = "";
        input.nextElementSibling.classList.remove('__js-active');
      });
    }
  });
});
//# sourceMappingURL=main.js.map
