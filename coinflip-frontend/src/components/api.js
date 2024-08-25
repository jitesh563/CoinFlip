import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Authorization': 'Token 3fa373924020aed12655538c66a01ab6a608cbe2',
    'Content-Type': 'application/json',
  }
});

export default api;