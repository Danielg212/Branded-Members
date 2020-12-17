import React from 'react';
import MembersTable from './../MembersTable';

export default function BrandedMembers({ loggedIn, setLoggedIn }) {
  return (
    <>
      <h2>Welcome {loggedIn.firstName}!</h2>
      <MembersTable />
      <button
        className='btn'
        onClick={() => {
          setLoggedIn(false);
        }}>
        Signout!
      </button>
    </>
  );
}
