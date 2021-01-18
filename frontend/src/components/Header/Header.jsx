import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../redux/actions';
import styles from './style/Header.module.css';
import BrandedLogo from './img/logo.png';
import { Button, LinkButton } from '../Buttons/Buttons';

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.loggedUser);

  return (
    <header className={styles.Header}>
      <img
        className={styles.BrandedLogo}
        src={BrandedLogo}
        alt='logo'
        onClick={() => history.push('/')}
      />

      <div className={styles.Controls}>
        {isLoggedIn ? (
          <Button onClick={() => dispatch(signOut())}>Logout</Button>
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
