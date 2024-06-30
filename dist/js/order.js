"use strict";

// Обработка открытия контента dropdownlist способом
function addDDL(element) {
  element.querySelector('.ddl').addEventListener('click', function () {
    var arrow = element.querySelector(".ddl__icon");
    var content = element.querySelector(".ddl__content");
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      content.style.opacity = null;
      arrow.classList.remove('__js-opened');
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.opacity = 1;
      arrow.classList.add('__js-opened');
    }
  });
}

//order
var addressSection = document.querySelector('.address-choice');
addDDL(addressSection);
var validElements = document.querySelectorAll('.valid-el');
if (validElements) {
  validElements.forEach(function (el) {
    el.classList.add('_js-desabled');
  });
}

// Обработчик события клика на кнопки Продолжить
var continueBtns = document.querySelectorAll('.btn-contain');
var _loop = function _loop() {
  var validBLock = validElements[i];
  var nextContent = validBLock.querySelector('.ddl__content');
  var arrow = validBLock.querySelector('.ddl__icon');
  continueBtns[i].addEventListener('click', function () {
    validBLock.classList.remove('_js-desabled');
    nextContent.style.maxHeight = nextContent.scrollHeight + 'px';
    nextContent.style.opacity = 1;
    arrow.classList.add('__js-opened');
    addDDL(validBLock);
  });
};
for (var i = 0; i < continueBtns.length - 1; i++) {
  _loop();
}

// обработчик инпута адреса на странице Оформления заказа
var userAddressInput = document.querySelector('[name="user-address"]');
userAddressInput.addEventListener('change', function () {
  document.querySelector('#address-choice__current').innerText = userAddressInput.value;
});

// обработка изменений инпутов выбора времени страницы Оформление заказа
var timeDeliveryData = {
  content: document.querySelector('.time').querySelector('.ddl__content'),
  day: '',
  time: '',
  footerText: 'Минимальная сумма заказа для БЕСПЛАТНОЙ доставки составляет 250 рублей',
  expressFooterText: 'Стоимость - 249 рублей. Экспресс доставка - доставка от 30 минут в звисимости от объема заказа и адреса доставки',
  headerText: document.querySelector('#delivery-time'),
  footerTextElement: document.querySelector('#min-sum-text'),
  dayInputs: document.querySelectorAll('[name="day"]'),
  timeInputs: document.querySelectorAll('[name="time"]')
};
timeDeliveryData.dayInputs.forEach(function (el) {
  el.addEventListener('change', function () {
    if (el.classList.contains('_js-express-delivery')) {
      timeDeliveryData.headerText.innerText = 'Экспрес доставка от 30 минут - 249 рублей';
      timeDeliveryData.headerText.classList.add('_js-add-zipper-before');
      timeDeliveryData.footerTextElement.innerText = timeDeliveryData.expressFooterText;
      timeDeliveryData.content.style.maxHeight = timeDeliveryData.content.scrollHeight + 'px';
      return;
    }
    timeDeliveryData.day = el.value;
    timeDeliveryData.headerText.classList.remove('_js-add-zipper-before');
    timeDeliveryData.headerText.innerText = 'Выберите удобное время получения заказа';
    if (timeDeliveryData.day && timeDeliveryData.time) {
      timeDeliveryData.headerText.innerText = "\u041E\u0436\u0438\u0434\u0430\u0439\u0442\u0435 \u0437\u0430\u043A\u0430\u0437 ".concat(timeDeliveryData.day, " ").concat(timeDeliveryData.time);
      timeDeliveryData.footerTextElement.innerText = timeDeliveryData.footerText;
      timeDeliveryData.content.style.maxHeight = timeDeliveryData.content.scrollHeight + 'px';
    }
  });
});
timeDeliveryData.timeInputs.forEach(function (el) {
  el.addEventListener('change', function () {
    if (el.classList.contains('_js-express-delivery')) {
      timeDeliveryData.headerText.innerText = 'Экспрес доставка от 30 минут - 249 рублей';
      timeDeliveryData.headerText.classList.add('_js-add-zipper-before');
      timeDeliveryData.footerTextElement.innerText = timeDeliveryData.expressFooterText;
      timeDeliveryData.content.style.maxHeight = timeDeliveryData.content.scrollHeight + 'px';
      return;
    }
    timeDeliveryData.time = el.value;
    timeDeliveryData.headerText.classList.remove('_js-add-zipper-before');
    timeDeliveryData.headerText.innerText = 'Выберите удобное время получения заказа';
    if (timeDeliveryData.day && timeDeliveryData.time) {
      timeDeliveryData.headerText.innerText = "\u041E\u0436\u0438\u0434\u0430\u0439\u0442\u0435 \u0437\u0430\u043A\u0430\u0437 ".concat(timeDeliveryData.day, " ").concat(timeDeliveryData.time);
      timeDeliveryData.footerTextElement.innerText = timeDeliveryData.footerText;
      timeDeliveryData.content.style.maxHeight = timeDeliveryData.content.scrollHeight + 'px';
    }
  });
});

// Обработка изменнений инпутов контактных данных польхователя
// Валидация полей Имени пользователя и Номера телефона
var contactsData = {
  userName: '',
  userPhone: '',
  userEmail: '',
  headerText: document.querySelector('#user-contacts-text')
};
var contactsInputs = document.querySelectorAll('.white-box__user-input ');
contactsInputs.forEach(function (el) {
  el.addEventListener('input', function () {
    if (el == document.querySelector('[name="user-name"]')) {
      contactsData.userName = el.value;
      console.log(el.value);
      console.log(contactsData);
    }
    if (el == document.querySelector('[name="user-phone"]')) {
      contactsData.userPhone = el.value;
      console.log(contactsData);
    }
    if (el == document.querySelector('[name="user-email"]')) {
      contactsData.userEmail = el.value;
      console.log(contactsData);
    }
    if (contactsData.userName && contactsData.userPhone) {
      contactsData.headerText.innerText = "".concat(contactsData.userName, " ").concat(contactsData.userPhone, " ").concat(contactsData.userEmail);
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
  var isValid = false;
  el.addEventListener('input', function () {
    isValid = validOptions.validateName(validatedInputs[0]) && validOptions.validatePhone(validatedInputs[1]);
    if (isValid) {
      document.querySelector('._js-btn-valid').removeAttribute('desabled');
    } else {
      document.querySelector('._js-btn-valid').setAttribute('desabled', true);
    }
  });
});
//# sourceMappingURL=order.js.map
