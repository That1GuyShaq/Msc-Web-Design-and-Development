
const studentModal = document.getElementById('studentModal');
if (studentModal) {
    studentModal.addEventListener('show.bs.modal', event => {
    const button  = event.relatedTarget;
    const title   = button.getAttribute('data-bs-title');

    const modalBodyTextArea = studentModal.querySelector('.modal-body textarea');
    const modalBodyInput    = studentModal.querySelectorAll('.modal-body input');
    const modalBodySelect   = studentModal.querySelector('.modal-body select');
    const modalBodyForm     = studentModal.querySelector('.modal-body form');
    const modalTitle        = studentModal.querySelector('.modal-title');
    const modalSubmit       = studentModal.querySelector('#submit');

    modalTitle.textContent = title
    
    if (title === 'View Student') {
        const data    = button.getAttribute('data-bs-student');
        const student = JSON.parse(data);

        modalBodyInput.forEach(input => {
            input.disabled = true;
        })
        
        modalBodyInput[0].value = '';

        modalBodyInput[1].value = student.firstName;
        modalBodyInput[2].value = student.lastName;
        modalBodyInput[3].value = student.dateOfBirth;
        modalBodyInput[4].value = student.phoneNumber;
        modalBodyInput[5].value = student.email;
        modalBodyInput[6].value = student.state;
        
        modalBodySelect.value = student.gender;

        modalBodyTextArea.disabled  = true;
        modalBodyTextArea.innerHTML = student.address;

        modalBodySelect.disabled = true;
        modalSubmit.classList.add('d-none');
    } else if (title === 'Update Student') { 
        const data    = button.getAttribute('data-bs-student');
        const student = JSON.parse(data);

        modalBodyInput.forEach(input => {
            input.disabled = false;
        })
        
        modalBodyInput[0].name  = 'userId';
        modalBodyInput[0].value = student.userId;

        modalBodyInput[1].value = student.firstName;
        modalBodyInput[2].value = student.lastName;
        modalBodyInput[3].value = student.dateOfBirth;
        modalBodyInput[4].value = student.phoneNumber;
        modalBodyInput[5].value = student.email;
        modalBodyInput[6].value = student.state;
        
        modalBodySelect.value = student.gender;

        modalBodyTextArea.disabled  = true;
        modalBodyTextArea.innerHTML = student.address;
        
        modalBodySelect.disabled = false;
        modalSubmit.textContent  = 'Update';
        modalBodyForm.action     = button.getAttribute('data-bs-appUrl') + '/App/Process/studentUpdate.php';

        modalSubmit.classList.remove('d-none');
    } else if (title === 'Delete Student') {
        const modalBody       = studentModal.querySelector('.modal-body');
        const modalFooter     = studentModal.querySelector('.modal-footer');
        const data            = button.getAttribute('data-bs-student');
        const modalSubmitLink = document.createElement('a');
        const student         = JSON.parse(data);

        modalBody.textContent       = 'Are you sure you want to delete the Bio Data of the student ' + student.firstName + ' ' + student.lastName + '?';
        modalSubmitLink.href        = button.getAttribute('data-bs-appUrl') + '/App/Process/studentDelete.php?id=' + student.id;
        modalSubmitLink.textContent = 'Delete';

        modalSubmitLink.classList.add('btn', 'btn-danger');
        modalFooter.appendChild(modalSubmitLink);

        modalSubmit.remove();
        
    }else {
        const id = button.getAttribute('data-bs-created-by');
        console.log(id);
        
        modalBodyInput.forEach(input => {
            input.disabled = false;
            input.value = '';
        })
        modalBodyInput[0].name   = 'createdBy';
        modalBodyInput[0].value  = id;
        modalBodySelect.disabled = false;
        modalBodySelect.value    = '';
        modalSubmit.textContent  = 'Create';
        modalSubmit.classList.remove('d-none');
    }
})
}
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()
