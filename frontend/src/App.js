import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUsers } from './actions/users';
import './style/style.css';
import BrandedLogo from './img/logo.png';
import { LinkButton } from './components/Buttons/Buttons';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import BrandedMembers from './components/pages/BrandedMembers';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // upon startup of application, this side effect will fetch the users from database,
    // and save them to the global state in Redux
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Router>
      <div className='BRANDED-MEMBERS'>
        <header>
          <img src={BrandedLogo} alt='logo' width='250' height='45' />
        </header>
        <main>
          <Switch>
            <Route exact path='/'>
              <LinkButton to='/login'>Login</LinkButton>
              <LinkButton to='/register'>Register</LinkButton>
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/register'>
              <Register />
            </Route>
            <Route exact path='/members'>
              <BrandedMembers />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
