import React, { useState } from 'react';
import styles from './style/MembersTable.module.css';
import SortIcon from './SortIcon';

export default function MembersTable({ usersData }) {
  const calculateAge = (birthDate) => {
    birthDate = new Date(birthDate);
    let nowDate = new Date();
    let difference = nowDate - birthDate;
    let age = Math.floor(difference / 31557600000); // approx. 31557600000 ms in 1 year (to be exact -> 1.00068493151 year)
    return age;
  };

  const [allUsers, setAllUsers] = useState(usersData.map((user) => ({ ...user, age: calculateAge(user.birthDate) })));
  const [sortByDirection, setSortByDirection] = useState(true);
  const [filterAge, setFilterAge] = useState(0);

  const sortByAge = () => {
    let copyOfAllUsers = [...allUsers];

    // sort all users by their age
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
  );
}
