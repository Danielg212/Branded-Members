import axios from 'axios';

const url = 'http://localhost:4000/branded';

export const fetchUsers = () => axios.get(`${url}/users`);
export const addUser = (newUser) => axios.post(`${url}/users`, newUser);
