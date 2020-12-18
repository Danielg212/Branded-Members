import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './../../actions/logged';
import MembersTable from './../MembersTable/MembersTable';
import { Button } from './../Buttons/Buttons';

export default function BrandedMembers() {
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedState = useSelector((state) => state.logged);

  return (
    <>
      {loggedState ? (
        <>
          <h2>Welcome {loggedState.firstName}!</h2>
          <MembersTable />
        </>
      ) : (
        <h2>You must be logged in to view this page!</h2>
      )}

      <Button
        onClick={() => {
          dispatch(logout());
          history.push('/');
        }}>
        {loggedState ? 'Signout!' : 'Home'}
      </Button>
    </>
  );
}
