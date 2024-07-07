const cvvInput = document.querySelector('#cvv');
const unhideBtn = document.querySelector('.pay-card-data__to-unhide');
unhideBtn.addEventListener('click', () => {
    cvvInput.setAttribute('type', 'text');
    setTimeout(()=> {
        cvvInput.setAttribute('type', 'password');
    }, 2000);
})


