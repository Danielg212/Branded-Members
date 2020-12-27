import axios from 'axios';

const url = 'http://localhost:8080/users';

export const signUp = (form) => axios.post(`${url}/register`, form);
export const signIn = (form) => axios.post(`${url}/login`, form);
export const getUsers = (token) =>
  axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
