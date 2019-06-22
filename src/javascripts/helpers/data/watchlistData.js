import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const addToWatchlist = watchObject => axios.post(`${firebaseUrl}/userMovie.json`, watchObject);

const getWatchlistByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/userMovie.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const watchlistResults = results.data;
      const watchlist = [];
      Object.keys(watchlistResults).forEach((watchlistId) => {
        watchlistResults[watchlistId].id = watchlistId;
        watchlist.push(watchlistResults[watchlistId]);
      });
      resolve(watchlist);
    })
    .catch(err => reject(err));
});

const deleteWatchlist = movieId => axios.delete(`${firebaseUrl}/userMovie/${movieId}.json`);


export default { addToWatchlist, getWatchlistByUid, deleteWatchlist };
