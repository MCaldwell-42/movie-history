import firebase from 'firebase/app';
import 'firebase/auth';

const moviesDiv = document.getElementById('movies');
const watchDiv = document.getElementById('watchlist');

const navbarEvents = () => {
  const navLinks = document.getElementsByClassName('nav-link');
  for (let i = 0; i < navLinks.length; i += 1) {
    navLinks[i].addEventListener('click', (e) => {
      if (e.target.id === 'navbar-button-logout') {
        firebase.auth().signOut()
          .then(() => {
            console.error('bye');
          })
          .catch(err => console.error('you still logged in!', err));
      } else if (e.target.id === 'navbar-button-watch') {
        moviesDiv.classList.add('hide');
        watchDiv.classList.remove('hide');
      } else if (e.target.id === 'navbar-button-movies') {
        moviesDiv.classList.remove('hide');
        watchDiv.classList.add('hide');
      }
    });
  }
};

export default { navbarEvents };
