import axios, { AxiosResponse } from 'axios';
import baseURL from './config';
import errorResponse from '../utils/reponse';

const storeURL = `${baseURL}/store`;

async function getTrendingStore() {
  try {
    const response: AxiosResponse = await axios.get(`${storeURL}/trending`);
    return response.data;
  } catch (error) {
    return errorResponse(Error.toString(), 'api.store.getTrendingStore');
  }
}

export default getTrendingStore;
