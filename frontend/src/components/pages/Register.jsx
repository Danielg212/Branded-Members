import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signUp } from './../../api';
import { InputGroup } from '../InputGroup/InputGroup';
import { Button, LinkButton } from './../Buttons/Buttons';
import DatePicker from 'react-date-picker';

export default function Register() {
  const history = useHistory(); // used for redirecting
  const [birthDate, setBirthDate] = React.useState(new Date());
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (values) => {
    try {
      await signUp({ ...values, birthDate })
        .then((response) => console.log(`✅ ${response.status} ${response.statusText}`, response.data))
        .then(window.alert('Registered succesfully! :)'))
        .then(history.push('/login'));
    } catch (error) {
      console.warn(`❌ ${error}`, error.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup
        name='firstName'
        placeholder='First name:'
        formHook={register({ required: true, pattern: { value: /^[a-z ,.'-]+$/i, message: 'Invalid name' } })}>
        {errors.firstName && errors.firstName.message}
      </InputGroup>
      <InputGroup
        name='lastName'
        placeholder='Last name:'
        formHook={register({ required: true, pattern: { value: /^[a-z ,.'-]+$/i, message: 'Invalid name' } })}>
        {errors.lastName && errors.lastName.message}
      </InputGroup>
      <InputGroup
        name='email'
        type='email'
        placeholder='Email:'
        formHook={register({
          required: true,
          pattern: {
            // eslint-disable-next-line no-useless-escape
            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Invalid email',
          },
        })}>
        {errors.email && errors.email.message}
      </InputGroup>
      <InputGroup
        name='password'
        type='password'
        placeholder='Create a password:'
        formHook={register({ required: true, minLength: { value: 7, message: 'Must be at least 7 characters' } })}>
        {errors.password && errors.password.message}
      </InputGroup>
      <InputGroup
        name='confirmPassword'
        type='password'
        placeholder='Confirm password:'
        formHook={register({ required: true, minLength: { value: 7, message: 'Must be at least 7 characters' } })}>
        {errors.confirmPassword && errors.confirmPassword.message}
      </InputGroup>
      <div className='date-group'>
        <DatePicker name='birthDate' value={birthDate} onChange={setBirthDate} />
      </div>

      <div className='controls'>
        <Button type='submit'>Register!</Button>
        <LinkButton to='/'>Home</LinkButton>
      </div>
    </form>
  );
}
