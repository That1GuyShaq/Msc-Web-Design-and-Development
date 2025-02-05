
(() => { 'use strict'
  const forms = document.querySelectorAll('.needs-validation')

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


const csModal = document.getElementById('createStudentModal');
const vsModal = document.getElementById('viewStudentModal');
const usModal = document.getElementById('updateStudentModal');
const dsModal = document.getElementById('deleteStudentModal');

/**
 * Create studnet Modal logic
 */
csModal.addEventListener('show.bs.modal', event => {
  const button = event.relatedTarget;
  const input  = csModal.querySelector('#createdBy');
  const appUrl = button.getAttribute('data-bs-app-url');
  const id     = button.getAttribute('data-bs-created-by');
  const form   = csModal.querySelector('#createStudentForm');

  input.value  = id;
  form.action = appUrl + '/App/Process/studentCreate.php';
});

/**
 * View Student Modal Logic
 */
vsModal.addEventListener('show.bs.modal', event => {
  const button  = event.relatedTarget;
  const inputs  = vsModal.querySelectorAll('input');
  const data    = button.getAttribute('data-bs-student');

  const student = JSON.parse(data);
  
  inputs[0].value = student.firstName;
  inputs[1].value = student.lastName;
  inputs[2].value = student.dateOfBirth;
  inputs[3].value = student.gender;
  inputs[4].value = student.phoneNumber;
  inputs[5].value = student.email;
  inputs[6].value = student.state;
  inputs[7].value = student.address;
});

/**
 * Update Student Modal Logic
 */
usModal.addEventListener('show.bs.modal', event => {
    
  const button  = event.relatedTarget;
  const select  = usModal.querySelector('select');
  const inputs  = usModal.querySelectorAll('input');
  const appUrl  = button.getAttribute('data-bs-app-url');
  const data    = button.getAttribute('data-bs-student');
  const form    = usModal.querySelector('#updateStudentForm');

  const student = JSON.parse(data);
  
  inputs[0].value = student.userId;
  inputs[1].value = student.firstName;
  inputs[2].value = student.lastName;
  inputs[3].value = student.dateOfBirth;
  inputs[4].value = student.phoneNumber;
  inputs[5].value = student.email;
  inputs[6].value = student.state;
  inputs[7].value = student.address;
  
  select.value = student.gender;
  form.action  = appUrl + '/App/Process/studentUpdate.php';
});

/**
 * Delete Student Modal Logic
 */
dsModal.addEventListener('show.bs.modal', event => { 
  const button  = event.relatedTarget;
  const name    = dsModal.querySelector('#studentName');
  const appUrl  = button.getAttribute('data-bs-app-url');
  const data    = button.getAttribute('data-bs-student');
  const link    = dsModal.querySelector('#deleteStudentConfirm');

  const student = JSON.parse(data);
  
  name.innerHTML = student.firstName + ' ' + student.lastName;
  link.href      = appUrl + '/App/Process/studentDelete.php?id=' + student.userId;
});

