import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { LinkButton } from './Buttons/Buttons';

function ProtectedRoute({ Component, ...rest }) {
  const authToken = useSelector((state) => state.authToken);

  return (
    <Route
      {...rest}
      // return a Route
      // which conditionally renders on of the following
      render={(props) => {
        if (authToken) {
          // if authenticate token exists, return component (which would then send a reguest to the server with that token)
          return <Component />;
        } else {
          // if authenticate token does not exist, return an "error" user interface
          return (
            <>
              <h2>You must be logged in to view this page!</h2>
              <LinkButton to='/'>Home</LinkButton>
            </>
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
