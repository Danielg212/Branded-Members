import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/users';
import { InputGroup } from '../InputGroup/InputGroup';
import { Button, LinkButton } from './../Buttons/Buttons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Register() {
  const usersData = useSelector((state) => state.users); // all users from global state - fetched from database
  const history = useHistory(); // used for redirecting
  const dispatch = useDispatch(); // dispatch an action with Redux

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // verify inputs here (email is 'unique' on server too!)
    if (verifyName(form.firstName) && verifyName(form.lastName) && verifyPassword(form.password) && verifyPasswordConfirmation(form.password, form.confirmPassword)) {
      dispatch(register(form)); // send form to server
      window.alert('Registered succesfully! :)'); // display success
      history.push('/login'); // then redirect
    } else {
      window.alert('one or more credentials are invalid, please submit form again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup name='firstName' placeholder='First name:' formState={[form, setForm]}>
        {verifyName(form.firstName) ? '' : 'Must be a valid name'}
      </InputGroup>
      <InputGroup name='lastName' placeholder='Last name:' formState={[form, setForm]}>
        {verifyName(form.lastName) ? '' : 'Must be a valid name'}
      </InputGroup>
      <InputGroup name='email' type='email' placeholder='Email:' formState={[form, setForm]}>
        {verifyEmail(form.email, usersData) ? '' : 'That email is already used!'}
      </InputGroup>
      <InputGroup name='password' type='password' placeholder='Create a password:' formState={[form, setForm]}>
        {verifyPassword(form.password) ? '' : 'At least 7 characters'}
      </InputGroup>
      <InputGroup name='confirmPassword' type='password' placeholder='Confirm password:' formState={[form, setForm]}>
        {verifyPasswordConfirmation(form.confirmPassword, form.password) ? '' : 'Must match your password'}
      </InputGroup>
      <div className='date-group'>
        <DatePicker placeholderText='Date of Birth:' selected={form.birthDate} onChange={(date) => setForm({ ...form, birthDate: date })} />
      </div>

      <div className='controls'>
        <Button type='submit'>Register!</Button>
        <LinkButton to='/'>Home</LinkButton>
      </div>
    </form>
  );
}

const verifyName = (name) => {
  let isValid = false;
  // checks that 'name' is not empty
  if (name !== '') {
    isValid = true;
    // checks that all characters are alphabetical letters (can be mixed with CAPS & nonCAPS)
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
  let isValid;
  // checks that no one is already using that email address
  let found = users.find((user) => user.email === email);
  if (found) {
    isValid = false;
  } else {
    isValid = true;
  }
  // returns 'true' if valid, 'false' otherwise
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
