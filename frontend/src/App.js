import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { LinkButton } from './components/Buttons/Buttons';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import BrandedMembers from './components/BrandedMembers/BrandedMembers';
import './style/style.css';
import BrandedLogo from './img/logo.png';

function App() {
  return (
    <Router>
      <div className='BRANDED-MEMBERS'>
        <header>
          <img src={BrandedLogo} alt='logo' width='250' height='45' />
        </header>
        <main>
          <Switch>
            <Route exact path='/'>
              <LinkButton to='/members'>Members</LinkButton>
              <LinkButton to='/login'>Login</LinkButton>
              <LinkButton to='/register'>Register</LinkButton>
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/register'>
              <Register />
            </Route>
            <ProtectedRoute exact path='/members' Component={BrandedMembers} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
