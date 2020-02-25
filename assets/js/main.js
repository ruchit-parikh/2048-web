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

  ajax({
    url: baseUrl + actionUrl, 
    method: 'POST', 
    formData: FD,
    onload: function(event) {
      //onload
      
    }, 
    onerror: function(event) {
      //onerror
      let messages = document.querySelector('#messages');
      messages.style.bottom = '10px';
      messages.style.opacity = 1;
      //again hide the message
      setTimeout(function() {
        messages.style.bottom = '-100px';
        messages.style.opacity = 0;
      }, 4000);
    }
  });
}

//common ajax method
let ajax = function(params) {
  const XHR = new XMLHttpRequest();
  XHR.open(params.method, params.url, true);
  XHR.setRequestHeader('X-PINGOTHER', 'PING');
  XHR.setRequestHeader('Content-Type', 'application/xml');// Define what happens on successful data submission
  XHR.addEventListener('load', params.onload);
  // Define what happens in case of error
  XHR.addEventListener('error', params.onerror);
  // Send our FormData object; HTTP headers are set automatically
  XHR.send(params.formData);
}