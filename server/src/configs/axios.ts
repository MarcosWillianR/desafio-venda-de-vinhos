import axios from 'axios';

const externalAPI = axios.create({
  baseURL: 'http://www.mocky.io/v2',
});

export default externalAPI;
