import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SortIcon from './SortIcon';

function BrandedMembers({ usersData, loggedIn }) {
  const history = useHistory();
  // allUsers is an array of objects, each object is a user object from database, added an age property to said object
  const [allUsers, setAllUsers] = useState(usersData.map((user) => ({ ...user, age: calculateAge(user.birthDate, new Date()) })));
  const [sortByDirection, setSortByDirection] = useState(true);
  const [filterAge, setFilterAge] = useState(0);

  const sortByAge = () => {
    let copyOfAllUsers = [...allUsers];
    copyOfAllUsers.sort((a, b) => {
      if (sortByDirection) {
        // if direction is true, sort from small to big
        return a.age > b.age && 1;
      } else {
        // if direction is false, sort from big to small
        return a.age < b.age && 1;
      }
    });

    setAllUsers(copyOfAllUsers);
    setSortByDirection(!sortByDirection);
  };

  return (
    <>
      <h2>Welcome {loggedIn.firstName}!</h2>

      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>

            <th className='age-control'>
              <span onClick={sortByAge}>
                Age <SortIcon size='14' />
              </span>
              <input
                value={filterAge}
                onChange={(e) => {
                  setFilterAge(e.target.value);
                }}
              />
            </th>

            <th className='not-mobile'>Email</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map(
            (user) =>
              Number(user.age) >= Number(filterAge) && (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.age}</td>
                  <td className='not-mobile'>{user.email}</td>
                </tr>
              )
          )}
        </tbody>
      </table>

      <button
        className='btn'
        onClick={() => {
          history.push('/');
        }}>
        Signout
      </button>
    </>
  );
}

export default BrandedMembers;

const calculateAge = (birthDate, nowDate) => {
  let birthDateInMilliseconds = Date.parse(birthDate);
  let nowDateInMilliseconds = Date.parse(nowDate);
  let secondsInAYear = 3.154e10; // google formula for approximate result
  let age = (nowDateInMilliseconds - birthDateInMilliseconds) / secondsInAYear;
  return parseInt(age);
};
