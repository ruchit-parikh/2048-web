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
  
  //data is not valid
  if (!isDataValid) {
    form.reportValidity();
    return;
  }

  //create form data
  let data = form.querySelectorAll('input'), formData = {};
  for (let i = 0; i < data.length; ++i) {
    formData[data[i].getAttribute('name')] = data[i].value;
  }

  postData(baseUrl + actionUrl, formData, function(response) {
    //on success

  }, function(error) {
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

//post form data on specific url
async function postData(url = '', data = {}, onsuccess, onerror) {
  //post data on api url
  let response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'no-cache',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    method: 'POST',
    body: JSON.stringify(data),
  }).then(function(response) {
    if (!response.ok) {
      //some kind of error in request
      throw Error(response);
    } else {
      onsuccess(response);
    }
  }).catch(function(error) {
    onerror(error);
  });

  return await response.json();
}