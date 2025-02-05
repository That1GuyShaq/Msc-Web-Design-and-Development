
const form    = document.getElementById('studentForm');
const trigger = document.getElementById('updateStudent');

trigger.addEventListener('click', () => {
    const elements    = form.elements;
    const triggerText = trigger.textContent;

    if (triggerText === 'Update My BioData') {
        enableForm(elements);
        trigger.textContent = 'Cancel';
        trigger.classList.replace('btn-primary', 'btn-secondary');
    } else {
        disableForm(elements);
        trigger.textContent = 'Update My BioData';
        trigger.classList.replace('btn-secondary', 'btn-primary');
    }
});

function enableForm(elements) {
    elements.forEach(element => element.disabled = false);
};

function disableForm(elements) {
    elements.forEach(element => element.disabled = true);
};
