import firebase from 'firebase/app';
import 'firebase/auth';
import watchlist from '../../components/watchList/watchlist';

const authDiv = document.getElementById('auth');
// const moviesDiv = document.getElementById('movies');
const moviesNavbar = document.getElementById('navbar-button-movies');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');
const watchlistNavbar = document.getElementById('navbar-button-watch');


const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.classList.add('hide');
      // moviesDiv.classList.remove('hide');
      moviesNavbar.classList.remove('hide');
      authNavbar.classList.add('hide');
      logoutNavbar.classList.remove('hide');
      watchlistNavbar.classList.remove('hide');
      watchlist.makeUniqueMovieList(user.uid);
    } else {
      authDiv.classList.remove('hide');
      moviesNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
      watchlistNavbar.classList.add('hide');
    }
  });
};


export default { checkLoginStatus };
