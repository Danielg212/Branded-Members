import axios from 'axios';

const url = 'http://localhost:4000/users';

export const postUser = (form) => axios.post(`${url}/register`, form);
export const getUser = (form) => axios.post(`${url}/login`, form);
export const getUsers = () => axios.get(url);
