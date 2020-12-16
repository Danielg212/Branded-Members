import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import InputGroup from './InputGroup';
import LinkBtn from './LinkBtn';
import BrandedMembers from './BrandedMembers';

function Login() {
  const usersData = useSelector((state) => state.users);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // if user is found by input email, then return it to 'user'
    let [user] = usersData.filter((item) => item.email === form.email && item);

    // if user exists & password is correct, set 'logged in' state, and reset input fileds
    if (user) {
      if (user.password === form.password) {
        setLoggedIn(user);
        setForm({ email: '', password: '' });
      } else {
        window.alert('Password is incorrect.');
      }
    } else {
      window.alert('Cannot find user by that email.');
    }
  };

  return loggedIn ? (
    <BrandedMembers usersData={usersData} loggedIn={loggedIn} />
  ) : (
    <form onSubmit={handleSubmit}>
      <InputGroup name='email' type='email' placeholder='Email:' formState={[form, setForm]}>
        johndoe@example.com
      </InputGroup>
      <InputGroup name='password' type='password' placeholder='Password:' formState={[form, setForm]}>
        Your password
      </InputGroup>

      <div className='controls'>
        <button type='submit' className='btn'>
          Login!
        </button>
        <LinkBtn to='/' text='Home' />
      </div>
    </form>
  );
}

export default Login;
