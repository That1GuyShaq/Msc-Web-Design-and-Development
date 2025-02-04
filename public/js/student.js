function enableForm(formElements) {
    for (let element of formElements) {
        element.disabled = false;
    }
}

function disableForm(formElements) {
    for (let element of formElements) {
        element.disabled = true;
    }
}

const usTrigger = document.getElementById('updateStudent');;
const sForm     = document.getElementById('studentForm');

usTrigger.addEventListener('click', () => {
    let elements = sForm.elements;
    if (usTrigger.textContent === 'Update My BioData') {
        enableForm(elements);
        usTrigger.textContent = 'Cancel';
        usTrigger.classList.add('btn-secondary');
        usTrigger.classList.remove('btn-primary');
    } else {
        disableForm(elements);
        usTrigger.textContent = 'Update My BioData';
        usTrigger.classList.add('btn-primary');
        usTrigger.classList.remove('btn-secondary');
    }
});

const upTrigger = document.getElementById('updatePassword')
const pForm     = document.getElementById('passwordForm');

upTrigger.addEventListener('click', () => {
    console.log('form', pForm);
    console.log('elements', pForm.elements);
    
    let elements = pForm.elements;
    if (upTrigger.textContent === 'Update Password') {
        enableForm(elements);
        upTrigger.textContent = 'Cancel';
        upTrigger.classList.add('btn-secondary');
        upTrigger.classList.remove('btn-primary');
    } else {
        disableForm(elements);
        upTrigger.textContent = 'Update Password';
        upTrigger.classList.add('btn-primary');
        upTrigger.classList.remove('btn-secondary');
    }
});
pForm.addEventListener('submit', (event) => {
    if (pForm.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    pForm.classList.add('was-validated');

    const password        = pForm.elements.password.value;
    const confirmPassword = pForm.elements.confirm_password.value;

    if (password !== confirmPassword) {
        event.preventDefault();
        event.stopPropagation();
        pForm.elements.confirm_password.setCustomValidity('Passwords do not match');
    } else {
        pForm.elements.confirm_password.setCustomValidity('');
    }
});
