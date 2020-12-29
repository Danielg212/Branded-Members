import axios from 'axios';

const url = 'http://localhost:8080/api/v1';

export const register = (form) => axios.post(url + '/users/register', form);
export const login = (form) => axios.post(url + '/users/login', form);
export const getUsers = (token) =>
  axios.get(url + '/users', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
