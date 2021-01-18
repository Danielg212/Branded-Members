import { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { signUp } from '../../redux/actions';
import styles from './style/Form.module.css';
import { InputGroup } from '../InputGroup/InputGroup';
import { Button } from '../Buttons/Buttons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Register({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const { register, handleSubmit, errors, watch } = useForm({});
  const password = useRef({}); // used so I can compare the password and confirmed password
  password.current = watch('password', '');
  const [birthDate, setBirthDate] = useState('');

  const onSubmit = async (values) => {
    dispatch(signUp({ ...values, birthDate }));
  };

  // redirect when email has been received from the server,
  // meaning register success
  useEffect(() => {
    if (user?.email) history.push(`/login`);
  }, [user?.email, history]);

  return (
    <main>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <InputGroup
          name='firstName'
          placeholder='First name:'
          formHook={register({
            required: true,
            pattern: { value: /^[a-z ,.'-]+$/i, message: 'Invalid name' },
          })}>
          {errors.firstName && errors.firstName.message}
        </InputGroup>

        <InputGroup
          name='lastName'
          placeholder='Last name:'
          formHook={register({
            required: true,
            pattern: { value: /^[a-z ,.'-]+$/i, message: 'Invalid name' },
          })}>
          {errors.lastName && errors.lastName.message}
        </InputGroup>

        <InputGroup
          name='email'
          type='email'
          placeholder='Email:'
          formHook={register({
            required: true,
            pattern: {
              // eslint-disable-next-line
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
          formHook={register({
            required: true,
            minLength: { value: 7, message: 'Must be at least 7 characters' },
          })}>
          {errors.password && errors.password.message}
        </InputGroup>

        <InputGroup
          name='confirmPassword'
          type='password'
          placeholder='Confirm password:'
          formHook={register({
            required: true,
            validate: (value) => value === password.current || 'Passwords do not match',
          })}>
          {errors.confirmPassword && errors.confirmPassword.message}
        </InputGroup>

        <div className={styles.dateGroup}>
          <DatePicker
            placeholderText='Birth date:'
            selected={birthDate}
            onChange={(date) => setBirthDate(date)}
          />
        </div>

        <Button type='submit'>Register</Button>
      </form>
    </main>
  );
}
