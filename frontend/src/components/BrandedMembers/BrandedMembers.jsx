import React, { useState, useEffect } from 'react';
import { TokenContext } from '../../ContextAPI';
import { getUsers } from '../../api';
import SortIcon from '../SortIcon';
import styles from './style/BrandedMembers.module.css';

export default function BrandedMembers() {
  // ----------
  // USERS FROM DB
  // ----------
  const [token] = React.useContext(TokenContext);
  console.log(atob(token.split('.')[1]));
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const calculateAge = (birthDate) => {
      birthDate = new Date(birthDate);
      const nowDate = new Date();
      const difference = nowDate - birthDate;
      const age = Math.floor(difference / 31557600000); // approx. 31557600000 ms in 1 year (to be exact -> 1.00068493151 year)
      return age;
    };

    const getAllUsers = async () => {
      try {
        const response = await getUsers(token);
        console.log(`✅ ${response.status} ${response.statusText}`, response.data);
        const allUsersWithCalculatedAge = response.data.map((user) => ({ ...user, age: calculateAge(user.birthDate) }));
        setAllUsers(allUsersWithCalculatedAge);
      } catch (error) {
        console.warn(`❌ ${error}`);
      }
    };

    getAllUsers();
  }, [token]);

  // ----------
  // AGE FUNCTIONS
  // ----------
  const [sortByDirection, setSortByDirection] = useState(true);
  const [filterAge, setFilterAge] = useState(0);

  // sort all users by their age
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

    setAllUsers(copyOfAllUsers); // save changes to state
    setSortByDirection(!sortByDirection); // change sorting direction for the next click
  };

  return (
    <>
      <h2>Welcome!</h2>

      <table className={styles.MembersTable}>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>

            <th className={styles.AgeControl}>
              {/* This is where the user can sort the age from small to big, and from big to small */}
              <span onClick={sortByAge}>
                Age <SortIcon size='14' />
              </span>
              {/* This is where the user can set an age to filter from */}
              <input
                value={filterAge}
                onChange={(e) => {
                  setFilterAge(e.target.value);
                }}
              />
            </th>

            <th className={styles.NotMobile}>Email</th>
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
                  <td className={styles.NotMobile}>{user.email}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </>
  );
}
