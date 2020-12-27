import React from 'react';
import { TokenContext } from './../../ContextAPI';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signIn } from './../../api';
import { InputGroup } from '../InputGroup/InputGroup';
import { Button, LinkButton } from './../Buttons/Buttons';

export default function Login() {
  // eslint-disable-next-line
  const [token, setToken] = React.useContext(TokenContext);
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async (values) => {
    try {
      let response = await signIn(values);
      setToken(response.data.token);
      console.log(`✅ ${response.status} ${response.statusText}`, response.data);
      window.alert('Logged in succesfully! :)');
      history.push('/members');
    } catch (error) {
      console.warn(`❌ ${error}`);
    }
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
