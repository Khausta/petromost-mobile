"use strict";

var cvvInput = document.querySelector('#cvv');
var unhideBtn = document.querySelector('.pay-card-data__to-unhide');
var cvvString = [];
var cvvStars = [];
cvvInput.addEventListener('input', function (e) {
  console.log(e);
  cvvString.push(cvvInput.value[cvvInput.value.length - 1]);
  cvvStars.push('*');
  cvvInput.value = cvvStars.join('');
});
unhideBtn.addEventListener('click', function () {
  cvvInput.value = cvvString.join('');
  setTimeout(function () {
    cvvInput.value = cvvStars.join('');
  }, 2000);
});
cvvInput.innerText = '***';
//# sourceMappingURL=payment.js.map
