//get cookie from browsers
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
}

//set cookie  in your browsers
function setCookie(cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//post form data on specific url
//This Function is compiled using babel to provide support in IE11, Safari etc.
// async function postData(url = '', data = {}, onsuccess, onerror, onvalidation = false, onfinally = false) {
//   //post data on api url
//   let response = await fetch(url, {
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     mode: 'cors',
//     cache: 'no-cache',
//     redirect: 'follow',
//     referrerPolicy: 'no-referrer',
//     method: 'POST',
//     body: JSON.stringify(data),
//   }).finally(function() {
//     if (onfinally) {
//       onfinally();
//     }
//   });
  
//   if (response.status == STATUS.SUCCESS) {
//     onsuccess(await response.json());
//   } else if (onvalidation && response.status == STATUS.VALIDATION_ERROR) {
//     onvalidation(await response.json());
//   } else {
//     onerror(await response.json());
//   }
// }

/**Compiled with babel */
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

function postData() {
  return _postData.apply(this, arguments);
}

function _postData() {
  _postData = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
      var url,
        data,
        onsuccess,
        onerror,
        onvalidation,
        onfinally,
        response,
        _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              url = _args.length > 0 && _args[0] !== undefined ? _args[0] : "";
              data = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              onsuccess = _args.length > 2 ? _args[2] : undefined;
              onerror = _args.length > 3 ? _args[3] : undefined;
              onvalidation =
                _args.length > 4 && _args[4] !== undefined ? _args[4] : false;
              onfinally =
                _args.length > 5 && _args[5] !== undefined ? _args[5] : false;
              _context.next = 8;
              return fetch(url, {
                headers: {
                  "Content-Type": "application/json"
                },
                mode: "cors",
                cache: "no-cache",
                redirect: "follow",
                referrerPolicy: "no-referrer",
                method: "POST",
                body: JSON.stringify(data)
              }).finally(function() {
                if (onfinally) {
                  onfinally();
                }
              });

            case 8:
              response = _context.sent;

              if (!(response.status == STATUS.SUCCESS)) {
                _context.next = 17;
                break;
              }

              _context.t0 = onsuccess;
              _context.next = 13;
              return response.json();

            case 13:
              _context.t1 = _context.sent;
              (0, _context.t0)(_context.t1);
              _context.next = 30;
              break;

            case 17:
              if (
                !(onvalidation && response.status == STATUS.VALIDATION_ERROR)
              ) {
                _context.next = 25;
                break;
              }

              _context.t2 = onvalidation;
              _context.next = 21;
              return response.json();

            case 21:
              _context.t3 = _context.sent;
              (0, _context.t2)(_context.t3);
              _context.next = 30;
              break;

            case 25:
              _context.t4 = onerror;
              _context.next = 28;
              return response.json();

            case 28:
              _context.t5 = _context.sent;
              (0, _context.t4)(_context.t5);

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })
  );
  return _postData.apply(this, arguments);
}
/**End of compiled code */

//show error notification
function showError(response) {
  NOTIFICATION_NODE.style.bottom = '10px';
  NOTIFICATION_NODE.style.opacity = 1;
  //again hide the message
  setTimeout(function() {
    NOTIFICATION_NODE.style.bottom = '-100px';
    NOTIFICATION_NODE.style.opacity = 0;
  }, 4000);
}

//check if given string is json or not
function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}