import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUsers } from './actions/users';
import './style/style.css';
import BrandedLogo from './img/logo.png';
import LinkBtn from './components/LinkBtn';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
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
              <LinkBtn to='/login' text='Login' />
              <LinkBtn to='/register' text='Register' />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/register'>
              <Register />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
