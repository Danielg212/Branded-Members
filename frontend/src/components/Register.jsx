import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from './../actions/users';
import { useHistory } from 'react-router-dom';
import InputGroup from './InputGroup';
import LinkBtn from './LinkBtn';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Register() {
  const usersData = useSelector((state) => state.users);
  const history = useHistory();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    birthDate: new Date(),
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // verify inputs here (email is verified on server)
    if (verifyName(form.firstName) && verifyName(form.lastName) && verifyPassword(form.password) && verifyPasswordConfirmation(form.password, form.confirmPassword)) {
      dispatch(createUser(form)); // send form to server
      window.alert('Registered succesfully! :)'); // display success
      history.push('/login'); // then redirect
    } else {
      window.alert('one or more credentials are invalid, please submit form again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup name='firstName' validate={verifyName} placeholder='First name:' formState={[form, setForm]}>
        {verifyName(form.firstName) ? '' : 'Must be a valid name'}
      </InputGroup>
      <InputGroup name='lastName' validate={verifyName} placeholder='Last name:' formState={[form, setForm]}>
        {verifyName(form.lastName) ? '' : 'Must be a valid name'}
      </InputGroup>
      <InputGroup name='email' type='email' placeholder='Email:' formState={[form, setForm]}>
        {verifyEmail(form.email, usersData) ? '' : 'That email is already used!'}
      </InputGroup>
      <InputGroup name='password' validate={verifyPassword} type='password' placeholder='Create a password:' formState={[form, setForm]}>
        {verifyPassword(form.password) ? '' : 'At least 7 characters'}
      </InputGroup>
      <InputGroup name='confirmPassword' type='password' placeholder='Confirm password:' formState={[form, setForm]}>
        {verifyPasswordConfirmation(form.confirmPassword, form.password) ? '' : 'Must match your password'}
      </InputGroup>
      <div className='inp-group'>
        <DatePicker selected={form.birthDate} onChange={(date) => setForm({ ...form, birthDate: date })} />
        <label>Date of Birth</label>
      </div>

      <div className='controls'>
        <button type='submit' className='btn'>
          Signup!
        </button>
        <LinkBtn to='/' text='Home' />
      </div>
    </form>
  );
}

export default Register;

const verifyName = (name) => {
  let isValid = false;
  // checks that 'name' is not empty
  if (name !== '') {
    isValid = true;
    // checks that all characters are alphabetical letters
    for (let i = 0; i < name.length; i++) {
      let char = name.charAt(i);
      if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
        continue;
      } else {
        isValid = false;
        break;
      }
    }
  }
  // returns 'true' if valid, 'false' otherwise
  return isValid;
};

const verifyEmail = (email, users) => {
  let isValid = true;
  // check that no one use already using that mail address
  users.forEach((user) => {
    if (user.email === email) {
      isValid = false;
    }
  });
  return isValid;
};

const verifyPassword = (pass) => {
  let isValid = false;
  // checks that password is over 7 characters
  if (pass.length >= 7) {
    isValid = true;
  }
  // returns 'true' if valid, 'false' otherwise
  return isValid;
};

const verifyPasswordConfirmation = (passConfirm, passOriginal) => {
  let isValid = false;
  // checks that confirmed password is equal to previous typed password
  if (passOriginal === passConfirm) {
    isValid = true;
  }
  // returns 'true' if valid, 'false' otherwise
  return isValid;
};
