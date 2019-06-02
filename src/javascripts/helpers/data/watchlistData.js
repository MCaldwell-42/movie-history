import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getWatchlist = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/userMovie.json`)
    .then((results) => {
      const { watchlistResults } = results.data;
      const myId = firebase.auth().currentUser.uid;
      console.error(myId);
      const myWatchlist = [];
      Object.keys(watchlistResults).forEach((watchlistResult) => {
        if (watchlistResults[watchlistResult].userId === myId) {
          myWatchlist.push(watchlistResults[watchlistResult]);
        }
      // const myWatchlist = watchlistResults.filter(watchlist => watchlist.userId === myId);
      });
      console.error(myWatchlist);
      resolve(myWatchlist);
    })
    .catch(err => reject(err));
});

const addToWatchlist = watchObject => axios.post(`${firebaseUrl}/userMovie.json`, watchObject);

export default { addToWatchlist, getWatchlist };
