import axios from 'axios';

let env = process.env.NODE_ENV;
let baseURL = null;

if (!env || env === 'development') {
  baseURL = 'http://localhost:8888/';
} else if (env === 'production') {
  baseURL = 'https://e-schedule-banisaleh.herokuapp.com/'
} else {
  baseURL = 'http://localhost:8888/'
}

let API = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null
  }
})

export default API;