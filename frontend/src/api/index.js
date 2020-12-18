import axios from 'axios';

const url = 'http://localhost:4000/branded';

export const fetchUsers = () => axios.get(`${url}/users`);
export const register = (form) => axios.post(`${url}/register`, form);
export const login = (form) => axios.post(`${url}/login`, form);
