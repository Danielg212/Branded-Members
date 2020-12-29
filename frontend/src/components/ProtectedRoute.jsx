import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

function ProtectedRoute({ Component, ...rest }) {
  const loggedUser = useSelector((state) => state.loggedUser);

  return (
    <Route
      {...rest}
      // return a Route
      // which conditionally renders on of the following
      render={(props) => {
        if (loggedUser.user) {
          // if authenticate token exists, return component (which would then send a reguest to the server with that token)
          return <Component />;
        } else {
          // if authenticate token does not exist, return an "error" user interface
          return (
            <main>
              <h1>You must be logged in to view this page!</h1>
            </main>
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
