(function(){
  const $ = jQuery;
  const myForm = document.getElementById('emailForm');
  const submitButton = document.getElementById('submitButton');

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const hiddenInput = document.getElementById('hiddenInput');
  const maxCharacters = document.getElementById('maxCharacters');

  messageInput.textContent = '';

  nameInput.addEventListener('blur', function(event){
    const myName = nameInput.value;
    const validName = /^[0-9a-zA-Z\s]+$/.test(myName);
    if(myName && !validName){
      nameInput.classList.add('danger');
      submitButton.disabled = true;
    } else {
      nameInput.classList.remove('danger');
      submitButton.disabled = false;
    }
  });

  emailInput.addEventListener('blur', function(event){
    const myEmail = emailInput.value;
    const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(myEmail);
    if(!validEmail){
      emailInput.classList.add('danger');
      submitButton.disabled = true;
    } else {
      emailInput.classList.remove('danger');
      submitButton.disabled = false;
    }
  });

  messageInput.addEventListener('keydown', function(event){
    maxCharacters.classList.add('entry');
    maxCharacters.textContent = (messageInput.attributes.maxLength.value - messageInput.value.length);
  });

  messageInput.addEventListener('focusout', function(event){
    maxCharacters.classList.remove('entry');
    maxCharacters.textContent = (messageInput.attributes.maxLength.value - messageInput.value.length);
  });



  myForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if(!hiddenInput.value) {
      $.ajax({
        url: 'http://107.170.216.104:3000/register',
        method: 'POST',
        data: {
          email: emailInput.value.trim(),
          name: nameInput.value.trim(),
          message: messageInput.value.trim()
        }
      })
      .done(res => {
        clearForm(res.name);
      })
      .fail((err, status, errorData) => {
        if(err.responseJSON.err.code === 11000){
          alert(`${emailInput.value.trim()} is already registered in the database. Please try again with a different email.`);
        }
      });
    } else {
      // Hidden input field was filled ignore the request
      clearForm();
    }
  });

  function clearForm(name) {
    emailInput.value = '';
    nameInput.value = '';
    messageInput.value = '';

    if(name) {
      // Mark open model here
    }
  }
}());