import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://tourism-26bdf-default-rtdb.firebaseio.com/',
});

export default instance;
