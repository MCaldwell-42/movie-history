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
    domString += `<h6> Directed by: ${flick.director}</h6>`;
    domString += `<h5>${flick.movieRating}</h5>`;
    domString += ' <div class="custom-control custom-checkbox">';
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div>';
  domString += '</div>';
  util.printToDom('watchlist', domString);
};

const makeUniqueMovieList = (uid) => {
  movieData.getMovies()
    .then((movies) => {
      watchlistData.getWatchlistByUid(uid).then((watchResp) => {
        const syncedMovies = smash.uniqueMovieView(movies, watchResp);
        const filteredMovies = syncedMovies.filter(movie => movie.onWatchlist === true);
        console.error(filteredMovies);
        printWatchlist(filteredMovies);
      });
    })
    .catch(err => console.error('didnt make unique movie list', err));
};

export default { makeUniqueMovieList };
