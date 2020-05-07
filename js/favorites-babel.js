"use strict";

var loginMsg = document.querySelector('#login-conf-msg');
var loginForm = document.querySelector('#login-form');
var logout = document.querySelector('#logout');
var savedFavorites = document.querySelector('.favorites');
var activeUser = localStorage.getItem('user');
var filteredResults = null;

if (localStorage.getItem('favorites') === null) {
  var _favorites = [];
  localStorage.setItem('favorites', JSON.stringify(_favorites));
} else {
  console.log('favorites exist in local storage already');
}

var favorites = JSON.parse(localStorage.getItem('favorites')); // user login

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var html = "";
  savedFavorites.innerHTML = html;
  var email = loginForm.email.value.trim();
  localStorage.setItem('user', email);
  loginMsg.innerText = "Welcome ".concat(email);
  var modal = document.querySelector('#modal-login');
  M.Modal.getInstance(modal).close();
  loginForm.reset();
  getFavorites();
  setTimeout(function () {
    return loginMsg.innerText = '';
  }, 3000); // console.log('user logged in');
}); // user logout

var userLogout = logout.addEventListener('click', function (e) {
  e.preventDefault();
  localStorage.setItem('user', '');
  console.log('user logged out');
  localStorage.removeItem('user');
  location.reload();
}); // callback function to update favorites array for the active user

var getFavorites = function getFavorites() {
  if (localStorage.getItem('user')) {
    activeUser = localStorage.getItem('user');
    console.log('on page load - user logged in =', activeUser); // return an array of the users favorites

    filteredResults = favorites.filter(function (arr) {
      return arr.email == activeUser;
    });
    filteredResults.forEach(function (doc) {
      // console.log('doc', doc);
      outputToHTML(doc);
    });
  } else {
    console.log('on page load - user logged in =', 'null');
    filteredResults = null; // filteredResults = favorites.filter(arr => arr.email == activeUser);

    console.log(filteredResults);
  }
}; // iterate through the filteredResults and output to browser


var outputToHTML = function outputToHTML(user) {
  // output user.email to user userList
  var html = "\n  <li class=\"output\">\n    <img class=\"savedImages\" src=\"".concat(user.regular, "\" alt=\"").concat(user.description, "\">\n  </li>\n\t"); // userList.innerHTML = '';

  savedFavorites.innerHTML += html;
}; // check if user logged in and display content


if (localStorage.getItem('user')) {
  activeUser = localStorage.getItem('user');
  console.log('on page load - user logged in =', activeUser); // return an array of the users favorites

  filteredResults = favorites.filter(function (arr) {
    return arr.email == activeUser;
  });
  filteredResults.forEach(function (doc) {
    // console.log('doc', doc);
    outputToHTML(doc);
  });
} else {
  console.log('on page load - user logged in =', 'null');
  filteredResults = null; // console.log(filteredResults);
} // favorite button


var faveBtn = document.querySelector('#favorite-btn');
faveBtn.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('fave btn clicked');
  favorites.push({
    email: activeUser,
    author: author,
    description: altDesc,
    thumb: thumbPhoto,
    regular: regularPhoto,
    id: photoId
  });
  localStorage.setItem('favorites', JSON.stringify(favorites));
  location.reload();
  getFavorites();
}); // Display favorite image when clicked

var savedImages = document.querySelector('.favorites');
savedImages.addEventListener('click', function (e) {
  e.preventDefault();
  var x = e.target.src; // const x = document.querySelector('.savedImages').src;

  image.innerHTML = "\n\t<img src=".concat(x, " class=\"image responsive-img center-block\">\n\t");
});
