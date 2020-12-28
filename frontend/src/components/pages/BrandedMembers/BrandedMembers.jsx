import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUsers, signOut } from '../../../redux/actions';
import { Button, LinkButton } from '../../Buttons/Buttons';
import SortIcon from '../../SortIcon';
import styles from './style/BrandedMembers.module.css';

export default function BrandedMembers() {
  const history = useHistory();
  const dispatch = useDispatch();

  // ----------
  // USERS FROM DB
  // ----------
  const authToken = useSelector((state) => state.authToken);
  const allUsers = useSelector((state) => state.allUsers);
  const [allUsersWithCalculatedAge, setAllUsersWithCalculatedAge] = useState([]);

  // console.log(atob(authToken.split('.')[1]));

  // this useEffect send a request to get all users,
  // the auhtentication token is used and attached in headers with axios
  useEffect(() => {
    dispatch(getUsers(authToken));
  }, [authToken, dispatch]);

  useEffect(() => {
    const newUsers = allUsers.map((user) => ({
      ...user,
      age: calculateAge(user.birthDate),
    }));
    setAllUsersWithCalculatedAge(newUsers);
  }, [allUsers]);

  // ----------
  // AGE FUNCTIONS
  // ----------
  const [sortByDirection, setSortByDirection] = useState(true);
  const [filterAge, setFilterAge] = useState(0);

  // calculate the age from the birthdate
  const calculateAge = (birthDate) => {
    birthDate = new Date(birthDate);
    const nowDate = new Date();
    const difference = nowDate - birthDate;
    const age = Math.floor(difference / 31557600000); // approx. 31557600000 ms in 1 year (to be exact -> 1.00068493151 year)
    return age;
  };

  // sort table by age
  const sortByAge = () => {
    let copyOfAllUsers = [...allUsersWithCalculatedAge];
    copyOfAllUsers.sort((a, b) => {
      if (sortByDirection) {
        return a.age > b.age && 1; // if direction is true, sort from small to big
      } else {
        return a.age < b.age && 1; // if direction is false, sort from big to small
      }
    });
    setAllUsersWithCalculatedAge(copyOfAllUsers); // save changes to state
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
          {allUsersWithCalculatedAge.map(
            (user) =>
              Number(user.age) >= Number(filterAge) && (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.age}</td>
                  <td className={styles.NotMobile}>{user.email}</td>
                </tr>
              ),
          )}
        </tbody>
      </table>

      <div className='controls'>
        <Button
          onClick={() => {
            dispatch(signOut());
            history.push('/');
          }}>
          Sign-out
        </Button>
        <LinkButton to='/'>Home</LinkButton>
      </div>
    </>
  );
}
