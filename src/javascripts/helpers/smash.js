const userMovies = (watchlistMovies, movies) => watchlistMovies.map((watchlistMovie) => {
  const w = watchlistMovie;
  const syncedMovie = movies.find(s => s.id === w.movieId);
  if (syncedMovie) {
    w.title = syncedMovie.title;
    w.imageUrl = syncedMovie.imageUrl;
    w.mpaaRating = syncedMovie.mpaaRating;
  }
  return w;
});

const uniqueMovieView = (movies, watchlistMovies) => watchlistMovies.map((userMovie) => {
  const a = userMovie;
  const syncedMovie = movies.find(movie => movie.id === a.movieId);
  if (syncedMovie) {
    a.imageUrl = syncedMovie.imageUrl;
    a.onWatchlist = true;
    a.isWatched = false;
    a.watchlistId = syncedMovie.id;
  }
  return a;
});

export default { uniqueMovieView, userMovies };
