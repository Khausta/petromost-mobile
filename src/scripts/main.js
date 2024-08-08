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
    login: false,
  }
}
const headerElements = {
  header: document.querySelector('.header'),
  logo: document.querySelector('.__js-logo'),
  burger: document.querySelector('[data-modal="menu"]'),
  openMenuOrCloseAllBtn: document.querySelector('.menu-btn'),
  toFixHeader: function() {
    if (!headerElements.header.classList.contains('__js-fixed')) {
      headerElements.header.classList.add('__js-fixed');
    }
    if (document.body.style.overflow !== 'hidden') {
      document.body.style.overflow = 'hidden';
    } 
  },
  removeFixHeader() {
    document.body.style.overflow = 'auto';
    headerElements.header.classList.remove('__js-fixed');
  },
  makeBurgerActive() {
    headerElements.burger.classList.add('__js_active');
    headerElements.burger.addEventListener('click', closePopup);
    headerElements.burger.removeEventListener('click', openMenu);
  },
  removeBurgerActive() {
    headerElements.burger.classList.remove('__js_active');
    headerElements.burger.removeEventListener('click', closePopup);
    headerElements.burger.addEventListener('click', openMenu);
  },
}


const popups = {
  showModalBtns: document.querySelectorAll('.js-show-modal'),
  allPopups: document.querySelectorAll('.overlay'),
  closeAllPopups() {
    popups.allPopups.forEach(el => {
      el.classList.remove('__js-active');
    });
    for (let el in state.openedPopups) {
      state.openedPopups[el] = false;
    }  
  },
  openSearchPopup () {  //логика открытия поиска отличчается, поэтому создана отдельная функция
    popups.search.open();
    headerElements.toFixHeader();
    popups.search.input.classList.add('__js-searchInput_active');
    popups.search.input.parentElement.classList.add('__js-headerSearch_active');
    headerElements.makeBurgerActive();
  },
  'search': {
    // overlay: document.querySelector('#search-overlay_______2'),
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
  'card': {
    trigger: document.querySelector('#card-magnifier'),
    overlay: document.querySelector('#show-card-overlay'),
    content: document.querySelector('#show-card-popup'),
  },
  'manageCard': {
    trigger: document.querySelector('#manage-my-card-btn'),
    overlay: document.querySelector('#my-card'),
    content: document.querySelector('#my-card-popup'),
  },
  'cardLogin': {
    trigger: document.querySelector('#card-login-btn'),
    overlay: document.querySelector('#login-overlay_12'),
    content: document.querySelector('#login-popup'),
  },
  'product': {
       trigger: document.querySelector('#product'),
       overlay: document.querySelector('#product-overlay'),
       content: document.querySelector('#product-popup')
   }
}




headerElements.burger.addEventListener('click', openMenu); // собитие на кнопке меню-бургер
popups.search.input.addEventListener('focus', () => {   //собитие на фокус инпута поиска
  popups.openSearchPopup();
})

function openMenu ()  {  //отдельная функция для открытия меню 
  if (state.openedPopups.search) return;
  state.path.push('menu');
  state.openedPopups.menu = true;
  headerElements.toFixHeader(); 
  openAnyModal('menu');
  headerElements.makeBurgerActive();
}


function closePopup() {          // закрытие попапа
  headerElements.removeFixHeader();
  if (state.openedPopups.search) {
    popups.search.close();
    state.openedPopups.search = false;
  }
  popups.closeAllPopups();
  state.path = []; 
  headerElements.removeBurgerActive();
  removeAllActivesMenuPanel();
}


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

function toPrevModal() {
  state.path.pop();
  if(state.path.length) {
    openAnyModal(state.path.at(-1));
  } else {
    popups.closeAllPopups();
    headerElements.burger.classList.remove('__js_active');
    headerElements.burger.removeEventListener('click', closePopup);
    headerElements.removeFixHeader();
    headerElements.burger.addEventListener('click', openMenu);
  }

}

function openMenuListModal(modalName) {
  openAnyModal(modalName);
  // openPrevModal(modalName);
  const modalOverlay = document.querySelector(`#${modalName}`);
  const returnBtn = modalOverlay.querySelector('.return-btn');
  if (returnBtn) returnBtn.addEventListener('click', toPrevModal);
}


function openAnyModal(modalName) {
  popups.closeAllPopups();
  state.openedPopups[modalName] = true;
  headerElements.toFixHeader();
  const modalOverlay = document.querySelector(`#${modalName}`);
  const modalContent = modalOverlay.querySelector('.popup');
  // const returnBtn = modalOverlay.querySelector('.return-btn');
  modalOverlay.classList.add('__js-active');
  modalContent.addEventListener('scroll', () => {
    modalContent.style.height = 
    document.querySelector('.menu-panel').offsetTop - 
    headerElements.header.offsetHeight + 5 + "px";
    });
  // if (returnBtn) returnBtn.addEventListener('click', toPrevModal);
  if(modalName != 'search' && modalName != 'menu' && state.path.at(-1) != modalName) {
    state.path.push(`${modalName}`);
  }
}


// навешивание события открытия модалок на кнопки
popups.showModalBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    const id = this.getAttribute('data-modal');
    openMenuListModal(id);
  })
})

function removeAllActivesMenuPanel() {
  showMenuPanelModalsBtns.forEach(el => removeActiveMenuPanelItem(el));
}

const showMenuPanelModalsBtns = document.querySelectorAll('.js-show-menu-panel-modal');
showMenuPanelModalsBtns.forEach(el => {       // навешивание события открытия модалок на кнопки в menu-panel 
  el.addEventListener('click', e => {
    removeAllActivesMenuPanel();
    const id = e.currentTarget.getAttribute('data-modal');
    showMenuPanelModal(id);
    // showMenuPanelModal(e.currentTarget);
    makeActiveMenuPanelItem(e.currentTarget);
  });
})

function makeActiveMenuPanelItem(item) {
  item.classList.add('menu-panel_active');
}

function removeActiveMenuPanelItem(item) {
  item.classList.remove('menu-panel_active');
}

function toPrevMenuPanelModal() {
  state.path.pop();
  if(state.path.length) {
    openAnyModal(state.path.at(-1));
  } else {
    popups.closeAllPopups();
    headerElements.burger.classList.remove('__js_active');
    headerElements.burger.removeEventListener('click', closePopup);
    headerElements.removeFixHeader();
    headerElements.burger.addEventListener('click', openMenu);
    removeAllActivesMenuPanel();
  }

}

function showMenuPanelModal(modalName) {   //отдельная функция для айтемов панели миню, фиксированной в нижней части экрана. Отличие в изменении массива 
  state.path = [];
  openAnyModal(modalName);
  headerElements.makeBurgerActive();
  const modalOverlay = document.querySelector(`#${modalName}`);
  const returnBtn = modalOverlay.querySelector('.return-btn');
  if (returnBtn) returnBtn.addEventListener('click', toPrevMenuPanelModal);
}

const showOrderDetailsBlocks = document.querySelectorAll('.js-show-order-details');

showOrderDetailsBlocks.forEach(el => {
  el.addEventListener('click', e => {
    const payOrderBtn = e.currentTarget.querySelector('.js-pay-btn');
    const cancelOrderBtn = e.currentTarget.querySelector('.js-cancel-order-btn');
    if(e.target === payOrderBtn) {
      console.log('Оплатить заказ');
      return;
    }
    if(e.target === cancelOrderBtn) {
      console.log('Отменить заказ');
      return;
    } 
    showOrderDetailsModal(e.currentTarget); 
});
})

function showOrderDetailsModal(orderBlock) {   //отдельная функция для айтемов панели миню, фиксированной в нижней части экрана. Отличие в изменении массива 
  state.path = [];
  const id = orderBlock.getAttribute('data-order');
  openAnyModal(id);
  headerElements.makeBurgerActive();
}

// manage-card
if (popups.manageCard.trigger) {
  popups.manageCard.trigger.addEventListener('click', () => {
    headerElements.toFixHeader();
    openAnyPopup('manageCard');
    headerElements.openMenuOrCloseAllBtn.classList.add('__js_active');
    headerElements.openMenuOrCloseAllBtn.addEventListener('click', closePopup);
  });
}

// открытие формы регистрации
if (popups.cardLogin.trigger) {
  popups.cardLogin.trigger.addEventListener('click', () => {
    headerElements.toFixHeader();
    openAnyPopup('cardLogin');
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
  popups.card.trigger.addEventListener('click', () => {
    if (document.body.style.overflow !== 'hidden') {
      document.body.style.overflow = 'hidden';
    }
    popups.card.overlay.classList.add('__js-active');
    popups.card.overlay.addEventListener('click', closeCard);
  });
}



// для инпутов Данных профиля
const profileDataInputs = document.querySelectorAll('.input-box__input');
if (profileDataInputs) {
  profileDataInputs.forEach(input => {
    input.addEventListener('input', () => {
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
}


const cardBonus = document.querySelector('.card__bonus');
if (cardBonus) {
  cardBonus.addEventListener('click', () => {
    document.querySelector('.card__bonus-count').classList.toggle('__js-blur');
  })
}

const mainCardBonus = document.querySelector('.main-card__to-hide');
if (mainCardBonus) {
  mainCardBonus.addEventListener('click', () => {
    document.querySelector('.main-card__bonus-number').classList.toggle('__js-blur');
  })
}







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

if (document.querySelector('.tabs')) {
  const tab1 = new Tab('tab', {});

}




// определяем все заголовки списков
if (document.querySelector('.list-header')) {
  listHendler();
}

function listHendler() {
  const listHeaders = document.querySelectorAll('.list-header');
  
// добавляем всем контентам класс _js-hidden
for (let i = 0; i < listHeaders.length; i++) {
  addHiddenStyle(listHeaders[i].nextElementSibling);
}

function addHiddenStyle(content) {
 
  // content.previousSiblingELement.classList.remove('._active');
  content.classList.add('_js-hidden'); 
  content.style.maxHeight = '0px';     // только так работает анимация изменения высоты
} 


let timerId;
// вешаем событие клика на заголовки каждого списка
listHeaders.forEach(header => {
  header.addEventListener('click', function () { 
      if(!timerId) {
          if (header.nextElementSibling.classList.contains('_js-hidden')) {
              showContent(this); // т.к. функция не стрелочная, то this будет именно тот header на который произошел клик 
              return;
          } 
          hideContent(this);
      }
  });
})

function showContent(element) {
  element.classList.add('_active');
  const hiddenContent = element.nextElementSibling;
  hiddenContent.classList.remove('_js-hidden');
  hiddenContent.style.maxHeight = hiddenContent.scrollHeight + 'px';

  function changeMaxHeight (element) {
      element.parentNode.parentNode.style.maxHeight = element.parentNode.parentNode.scrollHeight + hiddenContent.scrollHeight + 'px';
      if (element.parentNode.parentNode.closest('.list-content')) {
          changeMaxHeight(element.parentNode.parentNode.closest('.list-content'));
      }   else {
          return;
      }    
  }
  changeMaxHeight(hiddenContent);

  // таймер для того, чтобы каждое событие ожидало выполнения предыдущего
  timerId = setTimeout(() => {
      timerId = 0;
  },  300);
}

function hideContent(element) {
  element.classList.remove('_active');
  const openedContent = element.nextElementSibling;
  addHiddenStyle(openedContent);
  const allOpenedItems = openedContent.querySelectorAll('.list-content');
    allOpenedItems.forEach(el => {
        addHiddenStyle(el);
        el.previousElementSibling.classList.remove('_active');
    })
  }

}



// Выбор фильтра поиска
const filterRadioBtns = document.querySelectorAll('[name="filter"]');
if (filterRadioBtns) {
  filterRadioBtns.forEach(radioBtn => {
    radioBtn.addEventListener('change', () => {
      document.querySelector('#filter-type').innerText = `Фильтр / ${radioBtn.value}`;
    })
  })
}


const focusHendler = (element) => {
  element.classList.add('_active');

}

function blurHendler(element) {
  element.classList.remove('_active');

}


const cardCommentInputs = document.querySelectorAll('.good__comment-input');
if (cardCommentInputs) {
  cardCommentInputs.forEach(el => {
    el.addEventListener('focus', () => focusHendler(el));
    el.addEventListener('blur', () =>  blurHendler(el));
  });
}




//добавление и удаление лайков
const likes = document.querySelectorAll('.like');
likes.forEach(el => {
  el.addEventListener('click', () => {   
    el.classList.toggle('liked');
  })
})

const goodItemsList = document.querySelector('ul[data-temp');
const viewSelector = document.querySelector('button[data-view]');
if (viewSelector) {
  viewSelector.addEventListener('click', () => {
    const view =  viewSelector.dataset.view;
    if (view == 'list') {
      viewSelector.dataset.view = 'grid';
      goodItemsList.dataset.temp = 'list';
    } else {
      viewSelector.dataset.view = 'list';
      goodItemsList.dataset.temp = 'grid';
    }
  })
}


const activeFullScreenOverlay = document.querySelector(".overlay-full-screen.__js-active");

  if (activeFullScreenOverlay) {
    const closeBlocks = activeFullScreenOverlay.querySelectorAll('.js_close-overlay-full-screen');
    closeBlocks.forEach(block => {
      block.addEventListener('click', () => {
        activeFullScreenOverlay.classList.remove('__js-active');
        document.body.style.overflow = 'auto';
      })
    })
  }
 
const openFullScreenModalBtns = document.querySelectorAll(".js-openFullScreenModal");
if (openFullScreenModalBtns) {
openFullScreenModalBtns.forEach(b => {
  b.addEventListener('click', () => {
    const id = b.dataset.fullscreenmodal;
    openFullScreenModal(id);
    addClosingListeners(id);
  })
})

}

function openFullScreenModal(id) {
  document.querySelector(`#${id}`).classList.add('__js-active');
  document.body.style.overflow = 'hidden';
}

function closeFullScreenModal(id) {
  document.querySelector(`#${id}`).classList.remove('__js-active');
  document.body.style.overflow = 'auto';
}

function addClosingListeners(id) {
  const parentBlock = document.querySelector(`#${id}`);
  const allCloseBlocks = parentBlock.querySelectorAll('.js_close-overlay-full-screen');
  allCloseBlocks.forEach(block => {
    block.addEventListener('click', () => {
      closeFullScreenModal(id);
    })
  })
}


// проверка соответствия нового пароля
const profilePassEls = {
  newPassword: document.querySelector('input[name="new-password"]'),
  repeatedNewPassword: document.querySelector('input[name="repeated-new-password"]'),
  saveBtn: document.querySelector('#profile-data-save-btn'),
}

function compareNewPasswords() {
  let pass1 =  profilePassEls.newPassword.value;
  let pass2 = profilePassEls.repeatedNewPassword.value;
  if (pass1 !== pass2) {
    profilePassEls.repeatedNewPassword.classList.add('js-err');
    const parentBox = profilePassEls.repeatedNewPassword.parentElement;
    parentBox.nextElementSibling.classList.add('js-err');
    const menuContent = parentBox.closest('.menu__content');
    menuContent.style.maxHeight = menuContent.scrollHeight + 'px';
    profilePassEls.repeatedNewPassword.addEventListener('input', removeErr);
  }
}

function removeErr() {
  profilePassEls.repeatedNewPassword.classList.remove('js-err');
    const parentBox = profilePassEls.repeatedNewPassword.parentElement;
    parentBox.nextElementSibling.classList.remove('js-err');
    const menuContent = parentBox.closest('.menu__content');
    menuContent.style.maxHeight = menuContent.scrollHeight + 'px';
    profilePassEls.repeatedNewPassword.removeEventListener('input', removeErr);
}

if (profilePassEls.saveBtn) {
  profilePassEls.saveBtn.addEventListener('click', () => {
    compareNewPasswords();
  })
}






