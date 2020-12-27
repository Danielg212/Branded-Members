import React, { useState, useEffect } from 'react';
import { TokenContext } from './../../ContextAPI';
import { useHistory } from 'react-router-dom';
import { getUsers } from './../../api';
import { Button } from './../Buttons/Buttons';
import MembersTable from './../MembersTable/MembersTable';

export default function BrandedMembers() {
  const [token] = React.useContext(TokenContext);
  const [allUsers, setAllUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        let response = await getUsers(token);
        console.log(`✅ ${response.status} ${response.statusText}`, response.data);
        setAllUsers(response.data);
      } catch (error) {
        console.warn(`❌ ${error}`);
      }
    };

    getAllUsers();
  }, [token]);

  return (
    <>
      {allUsers.length ? (
        <>
          <MembersTable usersData={allUsers} />
        </>
      ) : (
        <h2>You must be logged in to view this page!</h2>
      )}

      <Button
        onClick={() => {
          history.push('/');
        }}>
        {allUsers.length ? 'Signout!' : 'Home'}
      </Button>
    </>
  );
}
