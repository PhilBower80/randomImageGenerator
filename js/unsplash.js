const key = '-V-yTOcwDt6CT-UEuernJ8sQiibfyRKoKw8YvpU1mP0';
const searchForm = document.querySelector('.search-form');
const image = document.querySelector('.image-container');

// step three
const getPhoto = async (searchRequest) => {
	const base = 'https://api.unsplash.com/photos/random/';
	// const query = `?query=${searchRequest}&client_id=${key}`;
	// const query = `?client_id=${key}&query=${searchRequest}&orientation=landscape`;
	const query = `?client_id=${key}&query=${searchRequest}`;

	const response = await fetch(base + query);
	const data = await response.json();

	return data;
};

// let author = null;
// let altDesc = null;
// let description = null;
// let thumbPhoto = null;
// let regularPhoto = null;
// let photoId = null;

// step two
const updateImage = async (search) => {
	const searchDets = await getPhoto(search);
	author = searchDets.user.name;
	altDesc = searchDets.alt_description;
	thumbPhoto = searchDets.urls.thumb;
	regularPhoto = searchDets.urls.regular;
	photoId = searchDets.id;

	image.innerHTML = `
	<img src=${searchDets.urls.regular} alt=${searchDets.description} class="image responsive-img center-block">
	<p class='center-align'>Photo by: ${searchDets.user.name}</p>
	<p class='center-align'>Title: ${searchDets.alt_description}</p>
	`;

	return searchDets;
};

// step one
searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const searchRequest = searchForm.search.value.trim();
	searchForm.reset();

	updateImage(searchRequest)
		.then((data) => console.log(data))
		.catch((err) => console.log(err));
});

//
// for testing

// getPhoto()
// 	.then(data => {
// 		return getPhoto(data);
// 	})
// 	.then(data => {
// 		console.log(data);
// 	})
// 	.catch(err => console.log(err));

// updateImage();
