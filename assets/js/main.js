//self invocking function which will be invoked once dom is ready.
(function () {
  init();
})();

//initialize game and setup everything that needs
function init() {
  let gameManager = GameManager.getInstance();
  let submitButtons = document.querySelectorAll('.btn-submit');

  for (let i = 0; i < submitButtons.length; ++i) {
    submitButtons[i].addEventListener('click', ajaxSubmit);
  }

  return;
}

//restarts the game
function restart() {
  return GameManager.getInstance().restart();
}

//loads register form
function loadRegisterForm(willDisplay) {
  let registerForm = document.querySelector('#register-form');
  if (willDisplay) {
    registerForm.style.left = '0%';
  } else {
    registerForm.style.left = '100%';
  }
}

//ajax submit
function ajaxSubmit() {
  event.preventDefault();
  event.stopPropagation();

  let form = event.target.form;
  let isDataValid = form.checkValidity();
  let actionUrl = form.getAttribute('action');
  const FD = new FormData();
  
  //data is not valid
  if (!isDataValid) {
    form.reportValidity();
    return;
  }

  let data = form.querySelectorAll('input');
  for (let i = 0; i < data.length; ++i) {
    FD[data[i].getAttribute('name')] = data[i].value;
  }

  fetch(baseUrl + actionUrl, {
    method: 'post',
    body: FD,
  }).then(function(response) {
    
  }).then(function(text) {

  }).catch(function(error) {
    //onerror
    let messages = document.querySelector('#messages');
    messages.style.bottom = '10px';
    messages.style.opacity = 1;
    //again hide the message
    setTimeout(function() {
      messages.style.bottom = '-100px';
      messages.style.opacity = 0;
    }, 4000);
  });
}