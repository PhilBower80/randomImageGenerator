const loginMsg = document.querySelector('#login-conf-msg');
const loginForm = document.querySelector('#login-form');
const logout = document.querySelector('#logout');
const savedFavorites = document.querySelector('.favorites');
let activeUser = localStorage.getItem('user');
let filteredResults = null;

if (localStorage.getItem('favorites') === null) {
	const favorites = [];

	localStorage.setItem('favorites', JSON.stringify(favorites));
} else {
	console.log('favorites exist in local storage already');
}

let favorites = JSON.parse(localStorage.getItem('favorites'));

// user login
loginForm.addEventListener('submit', (e) => {
	e.preventDefault();

	let html = ``;
	savedFavorites.innerHTML = html;

	const email = loginForm.email.value.trim();
	localStorage.setItem('user', email);
	loginMsg.innerText = `Welcome ${email}`;
	const modal = document.querySelector('#modal-login');
	M.Modal.getInstance(modal).close();
	loginForm.reset();
	getFavorites();
	setTimeout(() => (loginMsg.innerText = ''), 3000);
	// console.log('user logged in');
});

// user logout
const userLogout = logout.addEventListener('click', (e) => {
	e.preventDefault();
	localStorage.setItem('user', '');
	console.log('user logged out');
	localStorage.removeItem('user');
	location.reload();
});

// callback function to update favorites array for the active user
const getFavorites = () => {
	if (localStorage.getItem('user')) {
		activeUser = localStorage.getItem('user');
		console.log('on page load - user logged in =', activeUser);
		// return an array of the users favorites
		filteredResults = favorites.filter((arr) => arr.email == activeUser);
		filteredResults.forEach((doc) => {
			// console.log('doc', doc);
			outputToHTML(doc);
		});
	} else {
		console.log('on page load - user logged in =', 'null');
		filteredResults = null;
		// filteredResults = favorites.filter(arr => arr.email == activeUser);
		console.log(filteredResults);
	}
};

// iterate through the filteredResults and output to browser
const outputToHTML = (user) => {
	// output user.email to user userList

	let html = `
  <li class="output">
    <img class="savedImages" src="${user.regular}" alt="${user.description}">
  </li>
	`;
	// userList.innerHTML = '';
	savedFavorites.innerHTML += html;
};

// check if user logged in and display content
if (localStorage.getItem('user')) {
	activeUser = localStorage.getItem('user');
	console.log('on page load - user logged in =', activeUser);
	// return an array of the users favorites
	filteredResults = favorites.filter((arr) => arr.email == activeUser);
	filteredResults.forEach((doc) => {
		// console.log('doc', doc);
		outputToHTML(doc);
	});
} else {
	console.log('on page load - user logged in =', 'null');
	filteredResults = null;
	// console.log(filteredResults);
}

// favorite button
const faveBtn = document.querySelector('#favorite-btn');
faveBtn.addEventListener('click', (e) => {
	e.preventDefault();
	console.log('fave btn clicked');

	favorites.push({
		email: activeUser,
		author: author,
		description: altDesc,
		thumb: thumbPhoto,
		regular: regularPhoto,
		id: photoId,
	});

	localStorage.setItem('favorites', JSON.stringify(favorites));
	location.reload();
	getFavorites();
});

// Display favorite image when clicked
const savedImages = document.querySelector('.favorites');
savedImages.addEventListener('click', (e) => {
	e.preventDefault();

	const x = e.target.src;
	// const x = document.querySelector('.savedImages').src;
	image.innerHTML = `
	<img src=${x} class="image responsive-img center-block">
	`;
});
