import axios from 'axios';

const url = 'http://localhost:8080/api/v1';

export const signUp = (form) => axios.post(url + '/users/signup', form);
export const signIn = (form) => axios.post(url + '/users/signin', form);
export const getUsers = (token) =>
  axios.get(url + '/users', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
