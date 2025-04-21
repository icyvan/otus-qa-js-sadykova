import axios from 'axios';
import { config } from '../config/config';

export const instance = axios.create({
  baseURL: config.baseUrl,
  validateStatus: () => true
});
