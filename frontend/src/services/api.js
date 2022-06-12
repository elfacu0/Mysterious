import axios from 'axios';

let BASE_URL = 'https://solar-heliotrope-protest.glitch.me/';
export const api = axios.create({
  baseURL: BASE_URL,
});

