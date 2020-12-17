import axios from 'axios';

const url = 'http://localhost:4000/branded-members';

export const fetchUsers = () => axios.get(url);
export const addUser = (newUser) => axios.post(`${url}/register`, newUser);
