import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../../redux/actions';
import { Button, LinkButton } from '../../Buttons/Buttons';
import BrandedLogo from './img/logo.png';
import styles from './style/Header.module.css';

function Header() {
  const loggedUser = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <header className={styles.Header}>
      <img
        className={styles.BrandedLogo}
        src={BrandedLogo}
        alt='logo'
        onClick={() => history.push('/')}
      />

      <div className={styles.Controls}>
        {loggedUser.user ? (
          <Button onClick={() => dispatch(logout())}>Logout</Button>
        ) : (
          <>
            <LinkButton to='/login'>Login</LinkButton>
            <LinkButton to='/register'>Register</LinkButton>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
