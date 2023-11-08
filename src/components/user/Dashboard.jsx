import React from 'react';
import { useSelector } from 'react-redux';
import { ProgressBar, Table } from 'react-bootstrap';
import dashboard_css from './DashBoard.module.scss';
import Header from './Header';
import Footer from './Footer';

const Dashboard = () => {
  const currentUser = useSelector(state => state.userReducer.currentUser);

  if (!currentUser) {
    return <div>Loading or Placeholder UI while user data is fetched...</div>;
  }

  return (
    <>
      <Header />
      <div className={dashboard_css.container}>
        <h1>Welcome, {currentUser.fullName}!</h1>
        <div className={dashboard_css.userData}>
          <div className={dashboard_css.userDetails}>
            <h2>User Information</h2>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Phone:</strong> {currentUser.phone}</p>
            <h2>Courses Enrolled</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {currentUser.course.map((course, index) => (
                  <tr key={index}>
                    <td>{course}</td>
                    <td>
                      <ProgressBar now={Math.floor(Math.random() * 100) + 1} label={`${Math.floor(Math.random() * 100) + 1}%`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
