const cvvInput = document.querySelector('#cvv');
const unhideBtn = document.querySelector('.pay-card-data__to-unhide');
let cvvString = [];
let cvvStars = [];

cvvInput.addEventListener('input', (e) => {
    console.log(e);
    cvvString.push(cvvInput.value[cvvInput.value.length - 1]);
    cvvStars.push('*');
    cvvInput.value = cvvStars.join('');
});

unhideBtn.addEventListener('click', () => {
    cvvInput.value = cvvString.join('');
    setTimeout(()=> {
        cvvInput.value = cvvStars.join('');
    }, 2000);
});

cvvInput.innerText = '***'

