"use strict";

// Обработка открытия контента dropdownlist способом
function addDDL(element) {
  element.querySelector('.ddl').addEventListener('click', function () {
    var arrow = element.querySelector(".ddl__icon");
    var content = element.querySelector(".ddl__content");
    if (content.style.maxHeight) {
      closeContent(content, arrow);
    } else {
      openContent(content, arrow);
    }
  });
}
function openContent(contentBlock, arrowIcon) {
  contentBlock.style.maxHeight = contentBlock.scrollHeight + 'px';
  contentBlock.style.opacity = 1;
  arrowIcon.classList.add('__js-opened');
}
function closeContent(contentBlock, arrowIcon) {
  contentBlock.style.maxHeight = null;
  contentBlock.style.opacity = null;
  arrowIcon.classList.remove('__js-opened');
}
function ableBtn(btn) {
  document.querySelector("".concat(btn)).removeAttribute('disabled');
}
function disableBtn(btn) {
  document.querySelector("".concat(btn)).setAttribute('disabled', true);
}
function cutter(text, subheader) {
  var cutText;
  if (text.length > 28) {
    cutText = text.slice(0, 27) + '...';
  } else {
    cutText = text;
  }
  subheader.innerText = cutText;
}
var contactsData = {
  userName: '',
  userPhone: '',
  userEmail: '',
  headerText: document.querySelector('#user-contacts-text')
};

//order
// сначала делаем стили для первого блока выбора адреса, 
// так как он по умолчанию открыт сразу
var addressSection = document.querySelector('.address-choice'),
  addressContent = addressSection.querySelector('.ddl__content'),
  addressArrow = addressSection.querySelector('.ddl__icon'),
  addressIputs = document.querySelectorAll('[name="user-address"]');
disableBtn('#address-btn');
openContent(addressContent, addressArrow);
addDDL(addressSection);
addressIputs.forEach(function (el) {
  el.addEventListener('change', function () {
    ableBtn('#address-btn');
  });
});

// блоки, которые требуют выполнения определённых условий для открытия
var validElements = document.querySelectorAll('.valid-el');
if (validElements) {
  validElements.forEach(function (el) {
    el.classList.add('_js-disabled');
  });
}

// Обработчик события клика на кнопки Продолжить
var continueBtns = document.querySelectorAll('.btn-contain');
var _loop = function _loop(i) {
  // исключение для кнопки "Продолжить" блока комментария
  if (i == continueBtns.length - 1) {
    continueBtns[i].addEventListener('click', function () {
      document.querySelector('#accept-order-btn').classList.remove('_disabled');
      var commentContent = validElements[i - 1].querySelector('.ddl__content');
      var commentArrow = validElements[i - 1].querySelector('.ddl__icon');
      var text = document.querySelector('#comment-area').value;
      cutter(text, document.querySelector('#comment-p'));
      closeContent(commentContent, commentArrow);
    });
    return 1; // break
  }
  var validBLock = validElements[i];
  var nextContent = validBLock.querySelector('.ddl__content');
  var arrow = validBLock.querySelector('.ddl__icon');
  var currentBlock = validBLock.previousElementSibling;
  var currentBlockContent = currentBlock.querySelector('.ddl__content');
  var currentBlockArrow = currentBlock.querySelector('.ddl__icon');
  continueBtns[i].addEventListener('click', function () {
    if (currentBlock.classList.contains('user-data')) {
      cutter("".concat(contactsData.userName, " ").concat(contactsData.userPhone, " ").concat(contactsData.userEmail), contactsData.headerText);
    }
    closeContent(currentBlockContent, currentBlockArrow);
    validBLock.classList.remove('_js-disabled');
    nextContent.style.maxHeight = nextContent.scrollHeight + 'px';
    nextContent.style.opacity = 1;
    arrow.classList.add('__js-opened');
    addDDL(validBLock);
  });
};
for (var i = 0; i < continueBtns.length; i++) {
  if (_loop(i)) break;
}

// обработчик инпута адреса на странице Оформления заказа
var userAddressInput = document.querySelector('[name="user-address"]');
userAddressInput.addEventListener('change', function () {
  document.querySelector('#address-choice__current').innerText = userAddressInput.value;
});

// обработка изменений инпутов выбора времени страницы Оформление заказа
var timeDeliveryData = {
  content: document.querySelector('.time').querySelector('.ddl__content'),
  day: 'сегодня',
  time: '',
  footerText: 'Минимальная сумма заказа для БЕСПЛАТНОЙ доставки составляет 250 рублей',
  expressFooterText: 'Стоимость - 249 рублей. Экспресс доставка - доставка от 30 минут в звисимости от объема заказа и адреса доставки',
  headerText: document.querySelector('#delivery-time'),
  footerTextElement: document.querySelector('#min-sum-text'),
  dayInputs: document.querySelectorAll('[name="day"]'),
  timeInputs: document.querySelectorAll('[name="time"]'),
  expressDeliveryHendler: function expressDeliveryHendler() {
    timeDeliveryData.headerText.innerText = 'Экспрес доставка от 30 минут - 249 рублей';
    timeDeliveryData.headerText.classList.add('_js-add-zipper-before');
    timeDeliveryData.footerTextElement.innerText = timeDeliveryData.expressFooterText;
    timeDeliveryData.content.style.maxHeight = timeDeliveryData.content.scrollHeight + 'px';
  },
  changeTexts: function changeTexts() {
    timeDeliveryData.headerText.innerText = "\u041E\u0436\u0438\u0434\u0430\u0439\u0442\u0435 \u0437\u0430\u043A\u0430\u0437 ".concat(timeDeliveryData.day, " ").concat(timeDeliveryData.time);
    timeDeliveryData.footerTextElement.innerText = timeDeliveryData.footerText;
    timeDeliveryData.content.style.maxHeight = timeDeliveryData.content.scrollHeight + 'px';
  }
};
var expressBlock = document.querySelector('._js-express-block');
timeDeliveryData.dayInputs.forEach(function (el) {
  el.addEventListener('change', function () {
    if (expressBlock && el.value == 'сегодня') {
      expressBlock.classList.add('_visible');
    } else {
      if (expressBlock) expressBlock.classList.remove('_visible');
    }
    if (el.classList.contains('_js-express-delivery')) {
      timeDeliveryData.expressDeliveryHendler();
      return;
    }
    timeDeliveryData.day = el.value;
    timeDeliveryData.headerText.classList.remove('_js-add-zipper-before');
    if (timeDeliveryData.day && timeDeliveryData.time) {
      timeDeliveryData.changeTexts();
    }
  });
});
timeDeliveryData.timeInputs.forEach(function (el) {
  el.addEventListener('change', function () {
    ableBtn('#time-btn');
    if (el.classList.contains('_js-express-delivery')) {
      timeDeliveryData.expressDeliveryHendler();
      return;
    }
    timeDeliveryData.time = el.value;
    timeDeliveryData.headerText.classList.remove('_js-add-zipper-before');
    if (timeDeliveryData.day && timeDeliveryData.time) {
      timeDeliveryData.changeTexts();
    }
  });
});

//Обработка изменений инпутов при выборе способа оплаты
var payMethodInputs = document.querySelectorAll('[name="pay-method"]');
var paySubheader = document.querySelector('#pay-subheader');
payMethodInputs.forEach(function (el) {
  el.addEventListener('change', function () {
    ableBtn('#pay-btn');
    paySubheader.innerText = el.nextElementSibling.innerText;
  });
});

// Обработка изменнений инпутов контактных данных польхователя
// Валидация полей Имени пользователя и Номера телефона

var contactsInputs = document.querySelectorAll('.white-box__user-input ');
contactsInputs.forEach(function (el) {
  el.addEventListener('input', function () {
    if (el == document.querySelector('[name="user-name"]')) {
      contactsData.userName = el.value;
    }
    if (el == document.querySelector('[name="user-phone"]')) {
      contactsData.userPhone = el.value;
    }
    if (el == document.querySelector('[name="user-email"]')) {
      contactsData.userEmail = el.value;
    }
  });
});
var validOptions = {
  validatePhone: function validatePhone(phone) {
    var re = /\+7\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/;
    if (!re.test(String(phone.value))) {
      this.addErrorStyle(phone);
      return false;
    } else {
      return true;
    }
  },
  validateName: function validateName(inputName) {
    if (inputName.value === "") {
      this.addErrorStyle(inputName);
      return false;
    }
    return true;
  },
  addErrorStyle: function addErrorStyle(element) {
    element.classList.add('js-error');
    setTimeout(function () {
      element.classList.remove('js-error');
    }, 3000);
  },
  addPhoneMask: function addPhoneMask(input) {
    new IMask(input, {
      mask: "+{7} (000) 000-00-00"
    });
  }
};
var validatedInputs = document.querySelectorAll('._js-input-required');
validOptions.addPhoneMask(validatedInputs[1]);
validatedInputs.forEach(function (el) {
  var commentBlock = document.querySelector('.comment');
  var isValid = false;
  el.addEventListener('input', function () {
    isValid = validOptions.validateName(validatedInputs[0]) && validOptions.validatePhone(validatedInputs[1]);
    if (isValid) {
      ableBtn('#contacts-btn');
      if (!commentBlock.classList.contains('_js-disabled')) {
        document.querySelector('#accept-order-btn').classList.remove('_disabled');
      }
    } else {
      document.querySelector('#accept-order-btn').classList.add('_disabled');
      disableBtn('#contacts-btn');
    }
  });
});
//# sourceMappingURL=order.js.map
