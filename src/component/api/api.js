import axios from 'axios';
const api = axios.create({
 baseURL:process.env.REACT_APP_API_URL,
  //baseURL: 'https://backend.fayah.app',
  headers: {
    'Content-type': 'application/json',
    

},// Replace with your API base URL
});

export default api;