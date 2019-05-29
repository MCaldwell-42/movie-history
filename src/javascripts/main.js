import firebase from 'firebase/app';
import 'bootstrap';
import '../styles/main.scss';
import auth from './components/auth/auth';
import apiKeys from './helpers/apiKeys.json';
import navBar from './components/myNavBar/myNavBar';
import authData from './helpers/data/authData';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navBar.navbarEvents();
  authData.checkLoginStatus();
  auth.authStringBuilder();
};

init();
