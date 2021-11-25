window.onload = function() {
    document.getElementById('form').addEventListener('click', submitForm);
}

function submitForm(event) {
    event.preventDefault();
    chrome.runtime.getBackgroundPage((background) => {
        background.setKey(document.getElementById('apiKey').value);
    });
}
