const proxy = 'https://cors-anywhere.herokuapp.com/';
const key = process.env.API_KEY_FOOD2FORK;

const displayAlert =  (msg) => {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";
  x.textContent = msg ;
  // After 3 seconds, remove the show class from DIV
  setTimeout(()=> { 
    x.className = x.className.replace("show", ""); 
  }, 7000);
}

module.exports = { proxy, key , displayAlert}; 