import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './style/style.css';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Header from './components/Header/Header';
import BrandedMembers from './components/BrandedMembers/BrandedMembers';
import Login from './components/Form/Login';
import Register from './components/Form/Register';

export default function App() {
  const { user } = useSelector((state) => state.loggedUser);

  return (
    <Router>
      <div className='BRANDED-MEMBERS'>
        <Header />
        <Switch>
          <ProtectedRoute exact path='/' Component={BrandedMembers} />
          <Route path='/register'>
            <Register user={user} />
          </Route>
          <Route path='/login'>
            <Login user={user} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
