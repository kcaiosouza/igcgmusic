import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL ||  'http://192.168.1.14:3333/'
})
