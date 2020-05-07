"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var key = '-V-yTOcwDt6CT-UEuernJ8sQiibfyRKoKw8YvpU1mP0';
var searchForm = document.querySelector('.search-form');
var image = document.querySelector('.image'); // step three

var getPhoto = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchRequest) {
    var base, query, response, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            base = 'https://api.unsplash.com/photos/random/'; // const query = `?query=${searchRequest}&client_id=${key}`;
            // const query = `?client_id=${key}&query=${searchRequest}&orientation=landscape`;

            query = "?client_id=".concat(key, "&query=").concat(searchRequest);
            _context.next = 4;
            return fetch(base + query);

          case 4:
            response = _context.sent;
            _context.next = 7;
            return response.json();

          case 7:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getPhoto(_x) {
    return _ref.apply(this, arguments);
  };
}();

var author = null;
var altDesc = null;
var description = null;
var thumbPhoto = null;
var regularPhoto = null;
var photoId = null; // step two

var updateImage = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(search) {
    var searchDets;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getPhoto(search);

          case 2:
            searchDets = _context2.sent;
            author = searchDets.user.name;
            altDesc = searchDets.alt_description;
            thumbPhoto = searchDets.urls.thumb;
            regularPhoto = searchDets.urls.regular;
            photoId = searchDets.id; // console.log(searchDets); // this has been replaced by the .then .catch in eventListener

            image.innerHTML = "\n\t<img src=".concat(searchDets.urls.regular, " alt=").concat(searchDets.description, " class=\"image-size responsive-img center-block\">\n\t<p class='center-align'>Photo by: ").concat(searchDets.user.name, "</p>\n\t<p class='center-align'>Title: ").concat(searchDets.alt_description, "</p>\n\t");
            return _context2.abrupt("return", searchDets);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updateImage(_x2) {
    return _ref2.apply(this, arguments);
  };
}(); // step one


searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var searchRequest = searchForm.search.value.trim();
  searchForm.reset();
  updateImage(searchRequest).then(function (data) {
    return console.log(data);
  })["catch"](function (err) {
    return console.log(err);
  });
}); //
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
