import util from '../../helpers/util';
import movieData from '../../helpers/data/moviesData';

const movieStringBuilder = () => {
  movieData.getMovies().then((movieResp) => {
    console.error(movieResp);
    let domString = '';
    domString += '<div class="container d-flex">';
    domString += '<div class="row">';
    movieResp.forEach((movie) => {
      domString += '<div class="card">';
      domString += `<h1 class="cardTitle">${movie.name}</h1>`;
      domString += `<img src=${movie.imageUrl} width="300" height="400" alt="movie image" />`;
      domString += `<h6> Directed by: ${movie.director}</h6>`;
      // domString += `<h3>${movie.description}</h3>`;
      // domString += `<h5>${movie.genre}</h5>`;
      domString += `<h5>${movie.movieRating}</h5>`;
      domString += '</div>';
    });
    domString += '</div>';
    domString += '</div>';
    util.printToDom('movies', domString);
  }).catch(err => console.error('could not get movies', err));
};

export default { movieStringBuilder };