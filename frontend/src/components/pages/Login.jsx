import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logIn from './../../actions/logIn';
import { InputGroup } from '../InputGroup/InputGroup';
import { Button, LinkButton } from './../Buttons/Buttons';

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    // if user is found by input email, then return it to 'user'
    let [user] = usersData.filter((item) => item.email === form.email && item);
    // note: this same verification is done on the server too!

    // if user exists
    if (user) {
      // & password is correct,
      if (user.password === form.password) {
        dispatch(logIn(form));
        history.push('/members');
      } else {
        window.alert('Password is incorrect.');
      }
    } else {
      window.alert('Cannot find user by that email.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup name='email' type='email' placeholder='Email:' formState={[form, setForm]}>
        johndoe@example.com
      </InputGroup>
      <InputGroup name='password' type='password' placeholder='Password:' formState={[form, setForm]}>
        Your password
      </InputGroup>

      <div className='controls'>
        <Button type='submit'>Login!</Button>
        <LinkButton to='/'>Home</LinkButton>
      </div>
    </form>
  );
}
