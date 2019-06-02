// import firebase from 'firebase/app';
// import 'firebase/auth';
import util from '../../helpers/util';
import movieData from '../../helpers/data/moviesData';

const createNewMovie = (e) => {
  e.preventDefault();
  const newMovie = {
    id: document.getElementById('name').value,
    name: document.getElementById('name').value,
    genre: document.getElementById('genre').value,
    movieRating: document.getElementById('rating').value,
    director: document.getElementById('director').value,
    imageUrl: document.getElementById('picture').value,
    description: document.getElementById('description').value,
  };
  movieData.addNewMovie(newMovie)
    .then(() => {
      document.getElementById('name').value = '';
      document.getElementById('genre').value = '';
      document.getElementById('rating').value = '';
      document.getElementById('director').value = '';
      document.getElementById('picture').value = '';
      document.getElementById('description').value = '';
      document.getElementById('addNewMovie').classList.remove('hide');
      document.getElementById('movieForm').classList.add('hide');
    })
    .catch(err => console.error('no new movie for you', err));
};

const newMovieButton = (e) => {
  e.preventDefault();
  document.getElementById('addNewMovie').classList.add('hide');
  document.getElementById('movieForm').classList.remove('hide');
  document.getElementById('saveNewMovie').addEventListener('click', createNewMovie);
};

const movieStringBuilder = () => {
  movieData.getMovies().then((movieResp) => {
    console.error(movieResp);
    let domString = '';
    domString += '<div class="container d-flex">';
    domString += '<div class="row">';
    movieResp.forEach((movie) => {
      domString += '<div class="card">';
      // domString += `<h1 class="cardTitle">${movie.name}</h1>`;
      domString += `<img class="moviePic" src=${movie.imageUrl} alt="movie image" />`;
      domString += `<h6> Directed by: ${movie.director}</h6>`;
      // domString += `<h3>${movie.description}</h3>`;
      // domString += `<h5>${movie.genre}</h5>`;
      domString += `<h5>${movie.movieRating}</h5>`;
      domString += ' <div class="custom-control custom-checkbox">';
      domString += '<input type="checkbox" class="custom-control-input" id="defaultUnchecked">';
      domString += '<label class="custom-control-label" for="defaultUnchecked">Add To Watchlist</label>';
      domString += '</div>';
      domString += '</div>';
    });
    domString += '</div>';
    domString += '</div>';
    util.printToDom('movies', domString);
  }).catch(err => console.error('could not get movies', err));
};

const addMovieEvent = () => document.getElementById('addNewMovie').addEventListener('click', newMovieButton);


export default { movieStringBuilder, addMovieEvent };
