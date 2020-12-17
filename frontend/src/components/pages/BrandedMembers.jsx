import React from 'react';
import { useHistory } from 'react-router-dom';
import MembersTable from './../MembersTable/MembersTable';
import { Button } from './../Buttons/Buttons';

export default function BrandedMembers({ loggedIn, setLoggedIn }) {
  const history = useHistory();

  return (
    <>
      <h2>Welcome {loggedIn.firstName}!</h2>
      <MembersTable />
      <Button
        onClick={() => {
          history.push('/');
        }}>
        Signout!
      </Button>
    </>
  );
}
