import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { InputGroup } from '../InputGroup/InputGroup';
import { Button, LinkButton } from './../Buttons/Buttons';
import BrandedMembers from './BrandedMembers';

export default function Login() {
  const usersData = useSelector((state) => state.users);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // if user is found by input email, then return it to 'user'
    let [user] = usersData.filter((item) => item.email === form.email && item);

    // if user exists
    if (user) {
      // & password is correct,
      if (user.password === form.password) {
        // set 'logged in' state, this will update the UI completely
        setLoggedIn(user);
        // and reset input fileds
        setForm({ email: '', password: '' });
      } else {
        window.alert('Password is incorrect.');
      }
    } else {
      window.alert('Cannot find user by that email.');
    }
  };

  return loggedIn ? (
    // if the user is logged in (state updated from false), then access will be granted to the following
    <BrandedMembers loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
  ) : (
    // if the user is not logged in (state is false), then apply the following UI to login
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
