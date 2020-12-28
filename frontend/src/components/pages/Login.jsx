import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signIn } from './../../redux/actions';
import { InputGroup } from '../InputGroup/InputGroup';
import { Button, LinkButton } from '../Buttons/Buttons';

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const authToken = useSelector((state) => state.authToken);
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    if (authToken) history.push('/members');
  }, [authToken, history]);

  const onSubmit = (values) => {
    dispatch(signIn(values));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        placeholder='Password:'
        formHook={register({ required: true, minLength: { value: 7, message: 'Must be at least 7 characters' } })}>
        {errors.password && errors.password.message}
      </InputGroup>

      <div className='controls'>
        <Button type='submit'>Login!</Button>
        <LinkButton to='/'>Home</LinkButton>
      </div>
    </form>
  );
}
