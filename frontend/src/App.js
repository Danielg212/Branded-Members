import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/layout/Header/Header';
import BrandedMembers from './components/pages/BrandedMembers/BrandedMembers';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import './style/style.css';

function App() {
  return (
    <Router>
      <div className='BRANDED-MEMBERS'>
        <Header />
        <Switch>
          <ProtectedRoute exact path='/' Component={BrandedMembers} />
          <Route exact path='/login' component={Login} />
          <Route path='/login/:newemail' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
