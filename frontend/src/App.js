import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { LinkButton } from './components/Buttons/Buttons';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import BrandedMembers from './components/pages/BrandedMembers/BrandedMembers';
import BrandedLogo from './img/logo.png';
import './style/style.css';

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
              <LinkButton to='/signin'>Sign-in</LinkButton>
              <LinkButton to='/signup'>Sign-up</LinkButton>
            </Route>
            <Route exact path='/signin'>
              <SignIn />
            </Route>
            <Route exact path='/signup'>
              <SignUp />
            </Route>
            <ProtectedRoute exact path='/members' Component={BrandedMembers} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
