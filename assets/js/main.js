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
  if (willDisplay) {
    REGISTER_FORM_NODE.style.left = '0%';
  } else {
    REGISTER_FORM_NODE.style.left = '100%';
  }
}

//ajax submit for login and register form
function ajaxSubmit() {
  event.preventDefault();
  event.stopPropagation();

  let targetBtn = event.target, form = event.target.form, isDataValid = form.checkValidity(), actionUrl = form.getAttribute('action');
  
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

  //disable all the button while processing over api
  let buttons = form.querySelectorAll('button, a');
  for (let i in buttons) {
    buttons[i].disabled = true;
  }
  
  //set button loaders
  let targetBtnName = targetBtn.innerHTML;
  targetBtn.innerHTML = 'Processing...';

  postData(BASE_URL + actionUrl, formData, function(response) {
    //on success
    setCookie(AUTH_TOKEN, response.token, 1);
    AuthManager.getInstance().token = response.token;
    DataManager.getInstance().refreshLeaderBoard();
    return true;
  }, function(response) {
    //server errors
    showError(response);
    return false;  
  }, function(errors) {
    //validation errors
    //remove old messages
    let oldMessages = form.querySelectorAll('span.error-message'), i = 0;
    while (i < oldMessages.length) {
      oldMessages[i].parentNode.classList.remove('error-block');
      oldMessages[i].parentNode.removeChild(oldMessages[i]);
      i++;
    }

    for (let fieldName in errors) {
      //display errors on form
      let inputContainer = form.querySelector("input[name=" + fieldName + "]").closest('.form-group');
      let message = document.createElement('span');
      message.classList.add('error-message');
      message.innerHTML = errors[fieldName][0];
      inputContainer.classList.add('error-block');
      inputContainer.appendChild(message);
    }
  }, function() {
    //reenable the buttons
    targetBtn.innerHTML = targetBtnName;
    for (let i in buttons) {
      buttons[i].disabled = false;
    }  
  });
}