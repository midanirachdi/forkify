const proxy = 'https://cors-anywhere.herokuapp.com/';

var key = require('../../env.json').api_key;

const displayAlert = msg => {
  // Get the snackbar DIV
  var x = document.getElementById('snackbar');

  // Add the "show" class to DIV
  x.className = 'show';
  x.textContent = msg;
  // After 3 seconds, remove the show class from DIV
  setTimeout(() => {
    x.className = x.className.replace('show', '');
  }, 7000);
};

module.exports = { proxy, key, displayAlert };
