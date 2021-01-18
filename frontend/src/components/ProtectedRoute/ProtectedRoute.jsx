import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './style/ProtectedRoute.module.css';

function ProtectedRoute({ Component, ...rest }) {
  const { isLoggedIn } = useSelector((state) => state.loggedUser);

  return (
    <Route
      {...rest}
      // return a Route
      // which conditionally renders on of the following
      render={(props) => {
        if (isLoggedIn) {
          // if authenticate token exists, return component (which would then send a reguest to the server with that token)
          return <Component />;
        } else {
          // if authenticate token does not exist, return an "error" user interface
          return (
            <main>
              <h1 className={styles.error}>You must be logged in to view this page!</h1>
            </main>
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
