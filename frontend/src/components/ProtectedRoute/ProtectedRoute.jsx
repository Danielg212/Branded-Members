import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Button } from './../Buttons/Buttons';

function ProtectedRoute({ isAuth, Component, ...rest }) {
  const history = useHistory();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component />;
        } else {
          return (
            <>
              <h2>You must be logged in to view this page!</h2>
              <Button
                onClick={() => {
                  history.push('/');
                }}>
                Home
              </Button>
            </>
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
