"use strict";

var cvvInput = document.querySelector('#cvv');
var unhideBtn = document.querySelector('.pay-card-data__to-unhide');
unhideBtn.addEventListener('click', function () {
  cvvInput.setAttribute('type', 'text');
  setTimeout(function () {
    cvvInput.setAttribute('type', 'password');
  }, 2000);
});
//# sourceMappingURL=payment.js.map
