const state = {
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
  }
}
const headerElements = {
  header: document.querySelector('.header'),
  logo: document.querySelector('.__js-logo'),
  openMenuOrCloseAllBtn: document.querySelector('.menu-btn'),
  toFixHeader: function() {
    if (!headerElements.header.classList.contains('__js-fixed')) {
      headerElements.header.classList.add('__js-fixed');
    }
    if (document.body.style.overflow !== 'hidden') {
      document.body.style.overflow = 'hidden';
    } 
  },
  removeFixHeader: function() {
    document.body.style.overflow = 'auto';
    headerElements.header.classList.remove('__js-fixed');
  }
}


const popups = {
  allPopups: document.querySelectorAll('.overlay'),
  closeAllPopups() {
    popups.allPopups.forEach(el => {
      el.classList.remove('__js-active');
    });
    for (let el in state.openedPopups) {
      state.openedPopups[el] = false;
    }  
  },
  returnBtns: document.querySelectorAll('.return-btn'),
  openPreviousPopup: function () {
    state.path.pop();
    if(state.path.length) {
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
    open: function() {
      popups.closeAllPopups();
      state.openedPopups.search = true;
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
  'menu': {
    overlay: document.querySelector('#menu-overlay'),
    menuContent: document.querySelector('#menu-popup'),
  },
  'profile': {
    trigger: document.querySelector('.menu__profile'),
    overlay: document.querySelector('#profile-overlay'),
    content: document.querySelector('#profile-popup'),
  },
  'profileData': {
    trigger: document.querySelector('#profile-data'),
    overlay: document.querySelector('#profile-data-overlay'),
    content: document.querySelector('#profile-data-popup'),
  },
  'myCard': {
    trigger: document.querySelector('#my-card'),
    overlay: document.querySelector('#my-card-overlay'),
    content: document.querySelector('#my-card-popup'),
  },
  'address': {
    trigger: document.querySelector('#address'),
    overlay: document.querySelector('#address-overlay'),
    content: document.querySelector('#address-popup'),
  },
  'card': {
    trigger: document.querySelector('#card-magnifier'),
    overlay: document.querySelector('#show-card-overlay'),
    content: document.querySelector('#show-card-popup'),
  },
  'deliveryAddress': {
    trigger: document.querySelector('#delivery-address'),
    overlay: document.querySelector('#delivery-address-overlay'),
    content: document.querySelector('#delivery-address-popup'),
  },
  'selfdeliveryAddress': {
    trigger: document.querySelector('#selfdelivery-address'),
    overlay: document.querySelector('#selfdelivery-address-overlay'),
    content: document.querySelector('#selfdelivery-address-popup'),
  },
  'order': {
    trigger: document.querySelector('#order'),
    overlay: document.querySelector('#order-overlay'),
    content: document.querySelector('#order-popup'),
  },
  'catalog': {
    trigger: document.querySelector('#catalog'),
    overlay: document.querySelector('#catalog-overlay'),
    content: document.querySelector('#catalog-popup'),
  },
}

//собитие на фокус инпута поиска
popups.search.input.addEventListener('focus', () => {
  openSearchPopup();
})

//логика открытия поиска отличчается, поэтому создана отдельная функция
function openSearchPopup () {
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
headerElements.openMenuOrCloseAllBtn.addEventListener('click', () => {
  if (state.openedPopups.search) {
    return;
  }
  if (!state.path.find(el => el == 'menu')) {
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
  if(popups[popupName].content) {
    popups[popupName].content.addEventListener('scroll', () => {
      popups[popupName].content.style.height = document.querySelector('.menu-panel').offsetTop - headerElements.header.offsetHeight + 5 + "px";
      });
  }
  popups.returnBtns.forEach(btn => {
    btn.addEventListener('click', popups.openPreviousPopup);
  })
  if(popupName != 'search' && popupName != 'menu' && state.path[state.path.length - 1] != popupName) {
    state.path.push(`${popupName}`);
  }
}

popups.profile.trigger.addEventListener('click', () => {
  openAnyPopup('profile');
});

popups.profileData.trigger.addEventListener('click', () => {
  openAnyPopup('profileData');
});

popups.myCard.trigger.addEventListener('click', () => {
  openAnyPopup('myCard');
});

popups.address.trigger.addEventListener('click', () => {
  openAnyPopup('address');
});

popups.deliveryAddress.trigger.addEventListener('click', () => {
  openAnyPopup('deliveryAddress');
});


popups.selfdeliveryAddress.trigger.addEventListener('click', () => {
  openAnyPopup('selfdeliveryAddress');
});

if ( popups.order.trigger) {
  popups.order.trigger.addEventListener('click', () => {
  openAnyPopup('order');
});
}

popups.catalog.trigger.addEventListener('click', () => {
  headerElements.toFixHeader();
  openAnyPopup('catalog');
  headerElements.openMenuOrCloseAllBtn.classList.add('__js_active');
  headerElements.openMenuOrCloseAllBtn.addEventListener('click', closePopup);
});


// открытие и закрытие карты участника бонусной программы
function closeCard() {
  document.body.style.overflow = 'auto';
  popups.card.overlay.classList.remove('__js-active');
  popups.card.overlay.removeEventListener('click', closeCard);
}

if (popups.card.trigger) {
  popups.card.trigger.addEventListener('click', () => {
    if (document.body.style.overflow !== 'hidden') {
      document.body.style.overflow = 'hidden';
    }
    popups.card.overlay.classList.add('__js-active');
    popups.card.overlay.addEventListener('click', closeCard);
  });
}








// для инпутов Данных профиля
document.querySelectorAll('.input-box__input').forEach(input => {
  input.addEventListener('input', () => {
    console.log(input.value);
    if (input.value) {
      input.nextElementSibling.classList.add('__js-active');
      input.nextElementSibling.addEventListener('click', () => {
        input.value = "";
        input.nextElementSibling.classList.remove('__js-active');
      })
    } else {
      input.nextElementSibling.classList.remove('__js-active');
    }
  })
});

document.querySelector('.card__bonus').addEventListener('click', () => {
  document.querySelector('.card__bonus-count').classList.toggle('__js-blur');
})




// Обработка открытия контента dropdown способом
function dnd(triggerElement, animatedIcon, hiddenContent) {
  document.querySelectorAll(`.${triggerElement}`).forEach(el => {
    el.addEventListener('click', () => {
      const arrow = el.querySelector(`.${animatedIcon}`);
      const content = el.nextElementSibling;
  
      if (content.style.maxHeight) {
        document.querySelectorAll(`.${hiddenContent}`).forEach( item => {
          item.style.maxHeight = null;
          item.style.opacity = null;
          }) 
        document.querySelectorAll(`.${animatedIcon}`).forEach(item => {
          item.classList.remove('__js-opened');
        })
      } else {
        document.querySelectorAll(`.${hiddenContent}`).forEach( item => {
          item.style.maxHeight = null;
          item.style.opacity = null;  
        })
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = 1;
        
        document.querySelectorAll(`.${animatedIcon}`).forEach(item => {
          item.classList.remove('__js-opened');
        })
        arrow.classList.add('__js-opened');
      }
    })
  });
  
}


// Открытие скрытого контента меню
dnd('menu__li-with-content', 'menu-link__icon', 'menu__content');
// Открытие списка магазинов
dnd('dnd', 'dnd__icon', 'dnd__content');
// Открытие внутреннего выпадающего списка для выбора адреса доставки 
dnd('inner-dnd', 'shops__city-box', 'inner-dnd__content');



class Tab {
  constructor(selector, options) {
      let defaultOptions = {
          isChanged: () => {

          }
      }
      this.options = Object.assign(defaultOptions, options); //совмезщение, перезапись
      this.selector = selector;
      this.tabs = document.querySelector(`[data-tabs="${selector}"]`); //нахождение табов
      if(this.tabs) {
          this.tabsList = this.tabs.querySelector('.tabs__nav');
          this.tabsButtons = this.tabs.querySelectorAll('.tabs__nav-btn');
          this.tabsPanels = this.tabs.querySelectorAll('.tabs__panel');

      } else {
          console.error(`Нет элемента со свойством data-tabs=${selector}`);
          return;
      }

      this.check();
      this.init();
      this.events();
  }

  check() {
      if (document.querySelectorAll(`[data-tabs="${this.selector}]`).length > 1) {
          console.error('Количество элементов с одинакомым data-tabs больше одного');
          return;
      }

      if (this.tabsButtons.length !== this.tabsPanels.length) {
          console.error('Количество табов и панелей не совпадает');
          return;
      }
   }

  init() {
      this.tabsList.setAttribute('role', 'tablist');

      this.tabsButtons.forEach((el, i) => {
          el.setAttribute('role', 'tab');
          el.setAttribute('tabindex', '-1');
          el.setAttribute('id', `${this.selector}${i + 1}`); //чтобы не пересекались id
          el.classList.remove('tabs__nav-btn_active');
      });
      this.tabsPanels.forEach((el, i) => {
          el.setAttribute('role', 'tabpanel');
          el.setAttribute('tabindex', '-1');
          //aria-labeledBy
          el.setAttribute('aria-labelledby', this.tabsButtons[i].id);
          el.classList.remove('tabs__panel_active');
      });

      this.tabsButtons[0].classList.add('tabs__nav-btn_active');
      this.tabsButtons[0].removeAttribute('tabindex');
      this.tabsButtons[0].setAttribute('aria-selected', 'true');
      this.tabsPanels[0].classList.add('tabs__panel_active');
      
  }

  events() {
      this.tabsButtons.forEach((el, i) => {
          el.addEventListener('click', e => {
              let currentTab = this.tabsList.querySelector('[aria-selected]');
              if (e.currentTarget !== currentTab) {
                  this.switchTabs(e.currentTarget, currentTab);
              }
          });

          el.addEventListener('keydown', e => {
              let index = Array.prototype.indexOf.call(this.tabsButtons, e.currentTarget);

              let direction = null;

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
                      this.tabsPanels[i].focus();
                  } else if (this.tabsButtons[direction]) {
                      this.switchTabs(this.tabsButtons[direction], e.currentTarget);
                  } else {
                  }
              }
          })
      });


  }

  switchTabs(newTab, oldTab = this.tabs.querySelector('[aria-selected]')) {
      newTab.focus();
      newTab.removeAttribute('tabindex');
      newTab.setAttribute('aria-selected', 'true');

      oldTab.removeAttribute('aria-selected');
      oldTab.setAttribute('tabindex', '-1');

      let index = Array.prototype.indexOf.call(this.tabsButtons, newTab);
      let oldIndex = Array.prototype.indexOf.call(this.tabsButtons, oldTab);
      this.tabsPanels[oldIndex].classList.remove('tabs__panel_active');
      this.tabsPanels[index].classList.add('tabs__panel_active');
      this.tabsButtons[oldIndex].classList.remove('tabs__nav-btn_active');
      this.tabsButtons[index].classList.add('tabs__nav-btn_active');

      this.options.isChanged(this);
  }
}


const tab1 = new Tab('tab', {
  //для примера
  // isChanged: (tabs) => { 
  //      console.log(tabs); 
  // }
});


//добавление фиксированной позиции блоку "Итого" в правой панели
// const totalStep = document.querySelector('.total');
// const rightPanelHeight = totalStep.offsetTop - 800;
// const rightPanel = document.querySelector('.order__right');
// rightPanel.style.height = rightPanelHeight + 'px';