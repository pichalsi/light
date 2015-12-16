(function() {
    document.addEventListener('DOMContentLoaded', onLoad);

    function onLoad() {
        document.getElementById('switch').addEventListener('click', switchClicked);
    }

    function switchFinished(response) {
        var switchElem = document.getElementById('switch');
        switchElem.innerText = "Switch";
        switchElem.classList.remove('disabled')
        if(response.success) {
            switchElem.classList.add('success');
        }
    }

    function switchClicked() {
        var switchElem = document.getElementById('switch');
        switchElem.innerText = "...";
        switchElem.classList.add('disabled')
        switchElem.classList.remove('success');

        loadUrl('/api/switch', switchFinished, function() {
            switchElem.classList.remove('disabled')
        });
    }

    function loadUrl(url, cb, err) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function handleResponse() {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    cb(JSON.parse(httpRequest.response));
                } else {
                    alert('Error loading: \'' + url + '\'');
                    err();
                }
            }
        };
        httpRequest.open('GET', url);
        httpRequest.send();
    }
}());
