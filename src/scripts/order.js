
// Обработка открытия контента dropdownlist способом
function addDDL(element) {
    element.querySelector('.ddl').addEventListener('click', () => {
        const arrow = element.querySelector(`.ddl__icon`);
        const content = element.querySelector(`.ddl__content`);
   
        if (content.style.maxHeight) {
          closeContent(content, arrow);
        } else {
          openContent(content, arrow);
        }
      })
  
    
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
    document.querySelector(`${btn}`).removeAttribute('disabled');

  }
  function disableBtn(btn) {
    document.querySelector(`${btn}`).setAttribute('disabled', true);
  }

  function cutter(text, subheader) {
    let cutText;
    if (text.length > 28) {
      cutText = text.slice(0, 27)  + '...';
    } else {
      cutText = text;
    }
      subheader.innerText =  cutText;
  }

  const contactsData = {
    userName: '',
    userPhone: '',
    userEmail: '',
    headerText: document.querySelector('#user-contacts-text'),
  }



  //order
  // сначала делаем стили для первого блока выбора адреса, 
  // так как он по умолчанию открыт сразу
  const addressSection = document.querySelector('.address-choice'),
        addressContent = addressSection.querySelector('.ddl__content'),
        addressArrow = addressSection.querySelector('.ddl__icon'),
   
        addressIputs = document.querySelectorAll('[name="user-address"]');
  
  disableBtn('#address-btn');
  openContent(addressContent, addressArrow);
  addDDL(addressSection);
  addressIputs.forEach(el => {
    el.addEventListener('change', () => {
      ableBtn('#address-btn');
    })
  })



// блоки, которые требуют выполнения определённых условий для открытия
  const validElements = document.querySelectorAll('.valid-el');

  if(validElements) {
    validElements.forEach(el => {
      el.classList.add('_js-disabled');
    })
  }
  
  // Обработчик события клика на кнопки Продолжить
  const continueBtns = document.querySelectorAll('.btn-contain');

  for (let i = 0; i < continueBtns.length; i++) {
    // исключение для кнопки "Продолжить" блока комментария
    if(i == continueBtns.length - 1) {
      continueBtns[i].addEventListener('click', () => {
        document.querySelector('#accept-order-btn').classList.remove('_disabled');
        const commentContent = validElements[i-1].querySelector('.ddl__content');
        const commentArrow = validElements[i-1].querySelector('.ddl__icon');
        const text = document.querySelector('#comment-area').value;
        cutter(text, document.querySelector('#comment-p'));
        closeContent(commentContent, commentArrow);
      })
      break;
    }

    const validBLock = validElements[i];
    const nextContent = validBLock.querySelector('.ddl__content');
    const arrow =  validBLock.querySelector('.ddl__icon');
    const currentBlock = validBLock.previousElementSibling;
    const currentBlockContent = currentBlock.querySelector('.ddl__content');
    const currentBlockArrow =  currentBlock.querySelector('.ddl__icon');

    continueBtns[i].addEventListener('click', () => {
      if(currentBlock.classList.contains('user-data')) {
        cutter(`${contactsData.userName} ${contactsData.userPhone} ${contactsData.userEmail}`, contactsData.headerText);
      }
      closeContent(currentBlockContent, currentBlockArrow);

      validBLock.classList.remove('_js-disabled');
      nextContent.style.maxHeight = nextContent.scrollHeight + 'px';
      nextContent.style.opacity = 1;
      arrow.classList.add('__js-opened');
      addDDL(validBLock);
    })
  }
  
  // обработчик инпута адреса на странице Оформления заказа
  const userAddressInput = document.querySelector('[name="user-address"]');
  userAddressInput.addEventListener('change', () => {
    document.querySelector('#address-choice__current').innerText = userAddressInput.value;
  })
  
  // обработка изменений инпутов выбора времени страницы Оформление заказа
  const timeDeliveryData = {
    content:  document.querySelector('.time').querySelector('.ddl__content'),
    day: 'сегодня',
    time: '',
    footerText: 'Минимальная сумма заказа для БЕСПЛАТНОЙ доставки составляет 250 рублей',
    expressFooterText: 'Стоимость - 249 рублей. Экспресс доставка - доставка от 30 минут в звисимости от объема заказа и адреса доставки',
    headerText: document.querySelector('#delivery-time'),
    footerTextElement: document.querySelector('#min-sum-text'),
    dayInputs: document.querySelectorAll('[name="day"]'),
    timeInputs: document.querySelectorAll('[name="time"]'),
    expressDeliveryHendler: function () {
      timeDeliveryData.headerText.innerText = 'Экспрес доставка от 30 минут - 249 рублей';
        timeDeliveryData.headerText.classList.add('_js-add-zipper-before');
        timeDeliveryData.footerTextElement.innerText = timeDeliveryData.expressFooterText;
        timeDeliveryData.content.style.maxHeight =  timeDeliveryData.content.scrollHeight + 'px';
    },
    changeTexts: function() {
      timeDeliveryData.headerText.innerText = `Ожидайте заказ ${timeDeliveryData.day} ${timeDeliveryData.time}`
      timeDeliveryData.footerTextElement.innerText = timeDeliveryData.footerText;
      timeDeliveryData.content.style.maxHeight =  timeDeliveryData.content.scrollHeight + 'px';
    }

  }
  
  const expressBlock = document.querySelector('._js-express-block');

  timeDeliveryData.dayInputs.forEach(el => {
    el.addEventListener('change', () => {
     
      if(expressBlock && el.value == 'сегодня') {
          expressBlock.classList.add('_visible');
      } else {
        if (expressBlock)  expressBlock.classList.remove('_visible');
         
      }
      if(el.classList.contains('_js-express-delivery')) {
        timeDeliveryData.expressDeliveryHendler();
        return;
      }
      timeDeliveryData.day = el.value;
      timeDeliveryData.headerText.classList.remove('_js-add-zipper-before'); 

      if(timeDeliveryData.day && timeDeliveryData.time) {
        timeDeliveryData.changeTexts();
      }
      
    })
  })
  
  timeDeliveryData.timeInputs.forEach(el => {
    el.addEventListener('change', () => {
      ableBtn('#time-btn');
      if(el.classList.contains('_js-express-delivery')) {
        timeDeliveryData.expressDeliveryHendler();
        return;
      }
      timeDeliveryData.time = el.value;
      timeDeliveryData.headerText.classList.remove('_js-add-zipper-before');
      if(timeDeliveryData.day && timeDeliveryData.time) {
        timeDeliveryData.changeTexts();
      }
    })
  })

  //Обработка изменений инпутов при выборе способа оплаты
  const payMethodInputs = document.querySelectorAll('[name="pay-method"]');
  const paySubheader = document.querySelector('#pay-subheader');

  payMethodInputs.forEach(el => {
    el.addEventListener('change', () => {
      ableBtn('#pay-btn');
      paySubheader.innerText = el.nextElementSibling.innerText;
    })
  })
  
  
  // Обработка изменнений инпутов контактных данных польхователя
  // Валидация полей Имени пользователя и Номера телефона
 
  const contactsInputs = document.querySelectorAll('.white-box__user-input ');
  contactsInputs.forEach(el => {
    el.addEventListener('input', () => {
      if (el == document.querySelector('[name="user-name"]')) {
        contactsData.userName = el.value;
      }
      if (el == document.querySelector('[name="user-phone"]')) {
        contactsData.userPhone = el.value;
      }
      if (el == document.querySelector('[name="user-email"]')) {
        contactsData.userEmail = el.value;
      }
    })
  })
  
  
  const validOptions = {
    
    validatePhone(phone) {
      const re = /\+7\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/;
      if (!re.test(String(phone.value))) {
        this.addErrorStyle(phone);
        return false;
      } else {
        return true;
      }
    },
  
    validateName(inputName) {
          if (inputName.value === "") {
            this.addErrorStyle(inputName);
            return false;
          } 
          return true;
    },
  
    addErrorStyle(element) {
      element.classList.add('js-error');
      setTimeout(() => {
        element.classList.remove('js-error');
      }, 3000);
    },
  
    addPhoneMask(input) {
      new IMask(input, {
        mask: "+{7} (000) 000-00-00"
      });
    }
  }
  


  const validatedInputs = document.querySelectorAll('._js-input-required');
  validOptions.addPhoneMask(validatedInputs[1]);
  validatedInputs.forEach(el => {
    const commentBlock = document.querySelector('.comment');
    let isValid = false;
    el.addEventListener('input', () => {
      isValid = validOptions.validateName(validatedInputs[0]) 
              && validOptions.validatePhone(validatedInputs[1]);

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
  })
