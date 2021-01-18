import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/actions';
import styles from './style/BrandedMembers.module.css';
import SortIcon from './icon/SortIcon';

export default function BrandedMembers() {
  const dispatch = useDispatch();

  // ----------
  // USERS
  // ----------
  const loggedUser = useSelector((state) => state.loggedUser);
  const allUsers = useSelector((state) => state.allUsers);
  const [allUsersWithCalculatedAge, setAllUsersWithCalculatedAge] = useState([]);
  // console.log(atob(loggedUser.token.split('.')[1]));

  // this useEffect send a request to get all users,
  // the auhtentication token is used and attached in headers with axios
  useEffect(() => {
    dispatch(getUsers(loggedUser.token));
  }, [dispatch, loggedUser.token]);

  // this useEffect waits for all user from db,
  // then calculates all of their ages and sets state with the new values
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
    <main>
      <h1 className={styles.title}>Welcome {loggedUser.user.firstName}!</h1>

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
    </main>
  );
}
