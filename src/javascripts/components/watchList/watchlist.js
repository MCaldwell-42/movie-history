import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import movieData from '../../helpers/data/moviesData';
import watchlistData from '../../helpers/data/watchlistData';
import smash from '../../helpers/smash';
import util from '../../helpers/util';


const printWatchlist = (flicks) => {
  let domString = '';
  domString += '<div class="container d-flex">';
  domString += '<div class="row">';
  flicks.forEach((flick) => {
    domString += '<div class="card">';
    domString += `<img class="moviePic" src=${flick.imageUrl} alt="movie image" />`;
    domString += ' <div class="custom-control custom-checkbox">';
    domString += '</div>';
    domString += `<button class="btn btn-danger deleteBtn" id="delete.${flick.id}">delete</button>`;
    domString += '</div>';
  });
  domString += '</div>';
  domString += '</div>';
  util.printToDom('watchlist', domString);
  $('.deleteBtn').click(deleteWatchEvent); // eslint-disable-line no-use-before-define
};

const deleteWatchEvent = (e) => {
  const { uid } = firebase.auth().currentUser;
  const movieId = e.target.id.split('.')[1];
  watchlistData.deleteWatchlist(movieId)
    .then(() => makeUniqueMovieList(uid)) // eslint-disable-line no-use-before-define
    .catch(err => console.error('no deletion', err));
};

const makeUniqueMovieList = (uid) => {
  movieData.getMovies()
    .then((movies) => {
      watchlistData.getWatchlistByUid(uid).then((watchResp) => {
        const syncedMovies = smash.uniqueMovieView(movies, watchResp);
        const filteredMovies = syncedMovies.filter(movie => movie.onWatchlist === true);
        printWatchlist(filteredMovies);
      });
    })
    .catch(err => console.error('didnt make unique movie list', err));
};

export default { makeUniqueMovieList };
