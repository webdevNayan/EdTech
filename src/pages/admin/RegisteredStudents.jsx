import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllUsers } from '../../redux/userSlice';
import styles from './RegisteredStudents.module.scss'; // Ensure correct path to your module.scss file
import Buffering from '../../components/buffering';
import SideNav from '../../components/admin/SideNav';

export default function RegisteredStudents() {
  const dispatch = useDispatch();
  const store = useSelector(state => state.userReducer); // Accessing the entire userReducer state

  useEffect(() => {
    dispatch(getAllUsers()); // Dispatch action to fetch users when the component mounts
  }, [dispatch]);

  const { allUsers, status, error } = store; // Destructuring allUsers, status, and error from the store

  return (
    <>
      <SideNav>
    <div>
      <h1> Registered Students Data</h1>
      {status === 'loading' ? (
        <Buffering/>
      ) : status === 'failed' ? (
        <p>Error: {error}</p>
      ) : (
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Courses</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map(user => (
              <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <ul>
                    {user.course.map((course, index) => (
                      <li key={index}>{course}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </SideNav>
    </>
  );
};
