import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from './../../../redux/actions';
import { InputGroup } from './../../InputGroup/InputGroup';
import { Button } from './../../Buttons/Buttons';

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { newemail } = useParams();

  const loggedUser = useSelector((state) => state.loggedUser);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      email: newemail,
    },
  });

  // once the response came back from the server,
  // this useEffect will recognise the change in Redux and redirect the user automatically
  useEffect(() => {
    if (loggedUser.user) history.push('/');
  }, [history, loggedUser.user]);

  const onSubmit = (values) => {
    dispatch(login(values));
  };

  return (
    <main>
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
          formHook={register({
            required: true,
            minLength: { value: 7, message: 'Must be at least 7 characters' },
          })}>
          {errors.password && errors.password.message}
        </InputGroup>

        <Button type='submit'>Login</Button>
      </form>
    </main>
  );
}
