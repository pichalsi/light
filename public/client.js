(function() {
  var SWITCH_URL = '/api/switch';
  document.addEventListener('DOMContentLoaded', onLoad);

  function onLoad() {
    var buttons = document.getElementsByClassName('_button');
    for(var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', buttonClicked);
    }
  }

  function buttonClicked(event) {
      var switchElem = event.target;
      var id = switchElem.getAttribute('id');
      var parts = id.split('-');

      var textBefore = switchElem.innerText;
      switchElem.innerText = '...';
      switchElem.classList.add('disabled')
      switchElem.classList.remove('success');

      function switchFinished(response) {
          switchElem.innerText = textBefore;
          switchElem.classList.remove('disabled')
          if(response.success) {
              switchElem.classList.add('success');
          }
      }

      sendCommand(parts[0], parts[1], switchFinished, function() {
          switchElem.classList.remove('disabled');
          switchElem.innerText = textBefore;
      });
  }

  function sendCommand(command, device, success, err) {
      var httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = function handleResponse() {
          if (httpRequest.readyState === XMLHttpRequest.DONE) {
              if (httpRequest.status === 200) {
                  success(JSON.parse(httpRequest.response));
              } else {
                  alert('Error loading: \'' + SWITCH_URL + '\'');
                  err();
              }
          }
      };
      httpRequest.open('POST', SWITCH_URL);
      httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      httpRequest.send(JSON.stringify({
        device: device,
        command: command
      }));
  }
}());
