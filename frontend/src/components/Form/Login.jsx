import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { signIn } from '../../redux/actions';
import styles from './style/Form.module.css';
import { InputGroup } from '../InputGroup/InputGroup';
import { Button } from '../Buttons/Buttons';

export default function Login({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      email: user?.email,
    },
  });

  const onSubmit = (values) => {
    dispatch(signIn(values));
  };

  // once the user is logged in,
  // this useEffect will redirect the user to the homepage
  useEffect(() => {
    if (user?.firstName) history.push('/');
  }, [user?.firstName, history]);

  return (
    <main>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
