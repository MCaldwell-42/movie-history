import firebase from 'firebase/app';
import 'firebase/auth';
import util from '../../helpers/util';
import googleImg from './signIn.png';
import watchlistData from '../../helpers/data/watchlistData';


const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
  const list = watchlistData.getWatchlist();
  console.error(list);
};

const authStringBuilder = () => {
  let domString = '<button id="google-auth" class="btn btn-info">';
  domString += `<img src=${googleImg}/>`;
  domString += '</button>';
  util.printToDom('auth', domString);
  document.getElementById('google-auth').addEventListener('click', signMeIn);
};

export default { authStringBuilder };
