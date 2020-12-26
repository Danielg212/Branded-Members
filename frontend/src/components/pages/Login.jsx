import React from 'react'; // , { useState }
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
import { signIn } from './../../api';
import { InputGroup } from '../InputGroup/InputGroup';
import { Button, LinkButton } from './../Buttons/Buttons';

export default function Login() {
  const history = useHistory();
  // const dispatch = useDispatch();
  // const usersData = useSelector((state) => state.users);
  // const [form, setForm] = useState({ email: '', password: '' });
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (values) => {
    // e.preventDefault();

    // if user is found by input email, then return it to 'user'
    // let [user] = usersData.filter((item) => item.email === form.email && item);
    // note: this same verification is done on the server too!

    // if user exists
    // if (user) {
    // & password is correct,
    // if (user.password === form.password) {
    // dispatch(logIn(form));
    try {
      await signIn(values).then((response) => console.log(`✅ ${response.status} ${response.statusText}`, response.data));
      // .then(window.alert('Logged in succesfully! :)'))
      // .then(history.push('/members'));
    } catch (error) {
      console.warn(`❌ ${error}`, error.errors);
    }
    // } else {
    // window.alert('Password is incorrect.');
    // }
    // } else {
    // window.alert('Cannot find user by that email.');
    // }
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
