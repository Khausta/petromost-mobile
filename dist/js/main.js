"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var state = {
  path: [],
  openedPopups: {
    search: false,
    menu: false,
    profile: false,
    profileData: false,
    myCard: false,
    address: false,
    delivertAddress: false,
    selfdeliveryAddress: false,
    catalog: false,
    login: false
  }
};
var headerElements = {
  header: document.querySelector('.header'),
  logo: document.querySelector('.__js-logo'),
  openMenuOrCloseAllBtn: document.querySelector('.menu-btn'),
  toFixHeader: function toFixHeader() {
    if (!headerElements.header.classList.contains('__js-fixed')) {
      headerElements.header.classList.add('__js-fixed');
    }
    if (document.body.style.overflow !== 'hidden') {
      document.body.style.overflow = 'hidden';
    }
  },
  removeFixHeader: function removeFixHeader() {
    document.body.style.overflow = 'auto';
    headerElements.header.classList.remove('__js-fixed');
  }
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
  openPreviousPopup: function openPreviousPopup() {
    state.path.pop();
    if (state.path.length) {
      openAnyPopup(state.path[state.path.length - 1]);
    } else {
      popups.closeAllPopups();
      headerElements.openMenuOrCloseAllBtn.classList.remove('__js_active');
      headerElements.openMenuOrCloseAllBtn.removeEventListener('click', closePopup);
    }
  },
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
  },
  'address': {
    trigger: document.querySelector('#address'),
    overlay: document.querySelector('#address-overlay'),
    content: document.querySelector('#address-popup')
  },
  'card': {
    trigger: document.querySelector('#card-magnifier'),
    overlay: document.querySelector('#show-card-overlay'),
    content: document.querySelector('#show-card-popup')
  },
  'deliveryAddress': {
    trigger: document.querySelector('#delivery-address'),
    overlay: document.querySelector('#delivery-address-overlay'),
    content: document.querySelector('#delivery-address-popup')
  },
  'selfdeliveryAddress': {
    trigger: document.querySelector('#selfdelivery-address'),
    overlay: document.querySelector('#selfdelivery-address-overlay'),
    content: document.querySelector('#selfdelivery-address-popup')
  },
  'order': {
    trigger: document.querySelector('#order'),
    overlay: document.querySelector('#order-overlay'),
    content: document.querySelector('#order-popup')
  },
  'catalog': {
    trigger: document.querySelector('#catalog'),
    overlay: document.querySelector('#catalog-overlay'),
    content: document.querySelector('#catalog-popup')
  },
  'login': {
    trigger: document.querySelector('#login'),
    overlay: document.querySelector('#login-overlay_1'),
    content: document.querySelector('#login-popup_1')
  }
};

//собитие на фокус инпута поиска
popups.search.input.addEventListener('focus', function () {
  openSearchPopup();
});

//логика открытия поиска отличчается, поэтому создана отдельная функция
function openSearchPopup() {
  popups.search.open();
  headerElements.toFixHeader();
  popups.search.input.classList.add('__js-searchInput_active');
  popups.search.input.parentElement.classList.add('__js-headerSearch_active');
  headerElements.openMenuOrCloseAllBtn.classList.add('__js_active');
  headerElements.openMenuOrCloseAllBtn.addEventListener('click', closePopup);
}

// закрытие попапов
function closePopup() {
  headerElements.removeFixHeader();
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
  headerElements.toFixHeader();
  popups.menu.overlay.classList.add('__js-active');
  headerElements.openMenuOrCloseAllBtn.classList.add('__js_active');
  headerElements.openMenuOrCloseAllBtn.addEventListener('click', closePopup);
});
function openAnyPopup(popupName) {
  popups.closeAllPopups();
  state.openedPopups[popupName] = true;
  headerElements.toFixHeader();
  popups[popupName].overlay.classList.add('__js-active');
  if (popups[popupName].content) {
    popups[popupName].content.addEventListener('scroll', function () {
      popups[popupName].content.style.height = document.querySelector('.menu-panel').offsetTop - headerElements.header.offsetHeight + 5 + "px";
    });
  }
  popups.returnBtns.forEach(function (btn) {
    btn.addEventListener('click', popups.openPreviousPopup);
  });
  if (popupName != 'search' && popupName != 'menu' && state.path[state.path.length - 1] != popupName) {
    state.path.push("".concat(popupName));
  }
}
if (popups.profile.trigger) {
  popups.profile.trigger.addEventListener('click', function () {
    openAnyPopup('profile');
  });
}
if (popups.profileData.trigger) {
  popups.profileData.trigger.addEventListener('click', function () {
    openAnyPopup('profileData');
  });
}
if (popups.myCard.trigger) {
  popups.myCard.trigger.addEventListener('click', function () {
    openAnyPopup('myCard');
  });
}
if (popups.address.trigger) {
  popups.address.trigger.addEventListener('click', function () {
    openAnyPopup('address');
  });
}
if (popups.deliveryAddress.trigger) {
  popups.deliveryAddress.trigger.addEventListener('click', function () {
    openAnyPopup('deliveryAddress');
  });
}
if (popups.selfdeliveryAddress.trigger) {
  popups.selfdeliveryAddress.trigger.addEventListener('click', function () {
    openAnyPopup('selfdeliveryAddress');
  });
}
if (popups.order.trigger) {
  popups.order.trigger.addEventListener('click', function () {
    openAnyPopup('order');
  });
}
if (popups.catalog.trigger) {
  popups.catalog.trigger.addEventListener('click', function () {
    headerElements.toFixHeader();
    openAnyPopup('catalog');
    headerElements.openMenuOrCloseAllBtn.classList.add('__js_active');
    headerElements.openMenuOrCloseAllBtn.addEventListener('click', closePopup);
  });
}
if (popups.login.trigger) {
  popups.login.trigger.addEventListener('click', function () {
    headerElements.toFixHeader();
    openAnyPopup('login');
    headerElements.openMenuOrCloseAllBtn.classList.add('__js_active');
    headerElements.openMenuOrCloseAllBtn.addEventListener('click', closePopup);
  });
}

// открытие и закрытие карты участника бонусной программы
function closeCard() {
  document.body.style.overflow = 'auto';
  popups.card.overlay.classList.remove('__js-active');
  popups.card.overlay.removeEventListener('click', closeCard);
}
if (popups.card.trigger) {
  popups.card.trigger.addEventListener('click', function () {
    if (document.body.style.overflow !== 'hidden') {
      document.body.style.overflow = 'hidden';
    }
    popups.card.overlay.classList.add('__js-active');
    popups.card.overlay.addEventListener('click', closeCard);
  });
}

// для инпутов Данных профиля
document.querySelectorAll('.input-box__input').forEach(function (input) {
  input.addEventListener('input', function () {
    if (input.value) {
      input.nextElementSibling.classList.add('__js-active');
      input.nextElementSibling.addEventListener('click', function () {
        input.value = "";
        input.nextElementSibling.classList.remove('__js-active');
      });
    } else {
      input.nextElementSibling.classList.remove('__js-active');
    }
  });
});
document.querySelector('.card__bonus').addEventListener('click', function () {
  document.querySelector('.card__bonus-count').classList.toggle('__js-blur');
});

// Обработка открытия контента dropdown способом
function dnd(triggerElement, animatedIcon, hiddenContent) {
  document.querySelectorAll(".".concat(triggerElement)).forEach(function (el) {
    el.addEventListener('click', function () {
      var arrow = el.querySelector(".".concat(animatedIcon));
      var content = el.nextElementSibling;
      if (content.style.maxHeight) {
        document.querySelectorAll(".".concat(hiddenContent)).forEach(function (item) {
          item.style.maxHeight = null;
          item.style.opacity = null;
        });
        document.querySelectorAll(".".concat(animatedIcon)).forEach(function (item) {
          item.classList.remove('__js-opened');
        });
      } else {
        document.querySelectorAll(".".concat(hiddenContent)).forEach(function (item) {
          item.style.maxHeight = null;
          item.style.opacity = null;
        });
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = 1;
        document.querySelectorAll(".".concat(animatedIcon)).forEach(function (item) {
          item.classList.remove('__js-opened');
        });
        arrow.classList.add('__js-opened');
      }
    });
  });
}

// Открытие скрытого контента меню
dnd('menu__li-with-content', 'menu-link__icon', 'menu__content');
// Открытие списка магазинов
dnd('dnd', 'dnd__icon', 'dnd__content');
var Tab = /*#__PURE__*/function () {
  function Tab(selector, options) {
    _classCallCheck(this, Tab);
    var defaultOptions = {
      isChanged: function isChanged() {}
    };
    this.options = Object.assign(defaultOptions, options); //совмезщение, перезапись
    this.selector = selector;
    this.tabs = document.querySelector("[data-tabs=\"".concat(selector, "\"]")); //нахождение табов
    if (this.tabs) {
      this.tabsList = this.tabs.querySelector('.tabs__nav');
      this.tabsButtons = this.tabs.querySelectorAll('.tabs__nav-btn');
      this.tabsPanels = this.tabs.querySelectorAll('.tabs__panel');
    } else {
      console.error("\u041D\u0435\u0442 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 \u0441\u043E \u0441\u0432\u043E\u0439\u0441\u0442\u0432\u043E\u043C data-tabs=".concat(selector));
      return;
    }
    this.check();
    this.init();
    this.events();
  }
  return _createClass(Tab, [{
    key: "check",
    value: function check() {
      if (document.querySelectorAll("[data-tabs=\"".concat(this.selector, "]")).length > 1) {
        console.error('Количество элементов с одинакомым data-tabs больше одного');
        return;
      }
      if (this.tabsButtons.length !== this.tabsPanels.length) {
        console.error('Количество табов и панелей не совпадает');
        return;
      }
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;
      this.tabsList.setAttribute('role', 'tablist');
      this.tabsButtons.forEach(function (el, i) {
        el.setAttribute('role', 'tab');
        el.setAttribute('tabindex', '-1');
        el.setAttribute('id', "".concat(_this.selector).concat(i + 1)); //чтобы не пересекались id
        el.classList.remove('tabs__nav-btn_active');
      });
      this.tabsPanels.forEach(function (el, i) {
        el.setAttribute('role', 'tabpanel');
        el.setAttribute('tabindex', '-1');
        //aria-labeledBy
        el.setAttribute('aria-labelledby', _this.tabsButtons[i].id);
        el.classList.remove('tabs__panel_active');
      });
      this.tabsButtons[0].classList.add('tabs__nav-btn_active');
      this.tabsButtons[0].removeAttribute('tabindex');
      this.tabsButtons[0].setAttribute('aria-selected', 'true');
      this.tabsPanels[0].classList.add('tabs__panel_active');
    }
  }, {
    key: "events",
    value: function events() {
      var _this2 = this;
      this.tabsButtons.forEach(function (el, i) {
        el.addEventListener('click', function (e) {
          var currentTab = _this2.tabsList.querySelector('[aria-selected]');
          if (e.currentTarget !== currentTab) {
            _this2.switchTabs(e.currentTarget, currentTab);
          }
        });
        el.addEventListener('keydown', function (e) {
          var index = Array.prototype.indexOf.call(_this2.tabsButtons, e.currentTarget);
          var direction = null;
          if (e.which === 37) {
            direction = index - 1;
          } else if (e.which === 39) {
            direction = index + 1;
          } else if (e.which === 40) {
            direction = 'down';
          } else {
            direction = null;
          }
          if (direction !== null) {
            if (direction === 'down') {
              _this2.tabsPanels[i].focus();
            } else if (_this2.tabsButtons[direction]) {
              _this2.switchTabs(_this2.tabsButtons[direction], e.currentTarget);
            } else {}
          }
        });
      });
    }
  }, {
    key: "switchTabs",
    value: function switchTabs(newTab) {
      var oldTab = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.tabs.querySelector('[aria-selected]');
      newTab.focus();
      newTab.removeAttribute('tabindex');
      newTab.setAttribute('aria-selected', 'true');
      oldTab.removeAttribute('aria-selected');
      oldTab.setAttribute('tabindex', '-1');
      var index = Array.prototype.indexOf.call(this.tabsButtons, newTab);
      var oldIndex = Array.prototype.indexOf.call(this.tabsButtons, oldTab);
      this.tabsPanels[oldIndex].classList.remove('tabs__panel_active');
      this.tabsPanels[index].classList.add('tabs__panel_active');
      this.tabsButtons[oldIndex].classList.remove('tabs__nav-btn_active');
      this.tabsButtons[index].classList.add('tabs__nav-btn_active');
      this.options.isChanged(this);
    }
  }]);
}();
if (document.querySelector('.tabs')) {
  var tab1 = new Tab('tab', {});
}

// определяем все заголовки списков
if (document.querySelector('.list-header')) {
  listHendler();
}
function listHendler() {
  var listHeaders = document.querySelectorAll('.list-header');

  // добавляем всем контентам класс _js-hidden
  for (var i = 0; i < listHeaders.length; i++) {
    addHiddenStyle(listHeaders[i].nextElementSibling);
  }
  function addHiddenStyle(content) {
    // content.previousSiblingELement.classList.remove('._active');
    content.classList.add('_js-hidden');
    content.style.maxHeight = '0px'; // только так работает анимация изменения высоты
  }
  var timerId;
  // вешаем событие клика на заголовки каждого списка
  listHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      if (!timerId) {
        if (header.nextElementSibling.classList.contains('_js-hidden')) {
          showContent(this); // т.к. функция не стрелочная, то this будет именно тот header на который произошел клик 
          return;
        }
        hideContent(this);
      }
    });
  });
  function showContent(element) {
    element.classList.add('_active');
    var hiddenContent = element.nextElementSibling;
    hiddenContent.classList.remove('_js-hidden');
    hiddenContent.style.maxHeight = hiddenContent.scrollHeight + 'px';
    function changeMaxHeight(element) {
      element.parentNode.parentNode.style.maxHeight = element.parentNode.parentNode.scrollHeight + hiddenContent.scrollHeight + 'px';
      if (element.parentNode.parentNode.closest('.list-content')) {
        changeMaxHeight(element.parentNode.parentNode.closest('.list-content'));
      } else {
        return;
      }
    }
    changeMaxHeight(hiddenContent);

    // таймер для того, чтобы каждое событие ожидало выполнения предыдущего
    timerId = setTimeout(function () {
      timerId = 0;
    }, 300);
  }
  function hideContent(element) {
    element.classList.remove('_active');
    var openedContent = element.nextElementSibling;
    addHiddenStyle(openedContent);
    var allOpenedItems = openedContent.querySelectorAll('.list-content');
    allOpenedItems.forEach(function (el) {
      addHiddenStyle(el);
      el.previousElementSibling.classList.remove('_active');
    });
  }
}

// Выбор фильтра поиска
var filterRadioBtns = document.querySelectorAll('[name="filter"]');
if (filterRadioBtns) {
  filterRadioBtns.forEach(function (radioBtn) {
    radioBtn.addEventListener('change', function () {
      document.querySelector('#filter-type').innerText = "\u0424\u0438\u043B\u044C\u0442\u0440 / ".concat(radioBtn.value);
    });
  });
}
var filterViewSelector = document.querySelector('.view-selector');
if (filterViewSelector) {
  filterViewSelector.addEventListener('click', function () {
    filterViewSelector.classList.toggle('view-selector_to-grid');
  });
}

//order
var validElements = document.querySelectorAll('.valid-el');
if (validElements) {
  validElements.forEach(function (el) {
    el.classList.add('_js-desabled');
  });
}
//# sourceMappingURL=main.js.map
