import React from "react";
import { useSelector } from "react-redux";
import {Table } from "react-bootstrap";
import dashboard_css from "./DashBoard.module.scss";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import ProgressBar from 'react-bootstrap/ProgressBar';

const Dashboard = () => {
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const courses = useSelector((state) => state.courseReducer.courses);

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
            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>
            <p>
              <strong>Phone:</strong> {currentUser.phone}
            </p>
            <h2>Courses Enrolled</h2>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Instructor</th>
                  <th>Thumbnail</th>
                  <th>Due Date</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {currentUser.course.map((enrolledCourse, index) => {
                  const matchedCourse = courses.find(
                    (course) => course.courseName === enrolledCourse
                  );

                  if (matchedCourse) {
                    const {
                      courseName,
                      instructorName,
                      thumbnail1,
                      courseDuration, // Added courseDuration
                    } = matchedCourse;

                    return (
                      <tr key={index}>
                        <td>{courseName}</td>
                        <td>{instructorName}</td>
                        <td>
                          <img
                            src={thumbnail1}
                            alt="Thumbnail"
                            className={dashboard_css.thumbnail}
                          />
                        </td>
                        <td>{courseDuration}</td>
                        <td>
                        <ProgressBar
                          now={30}
                          label={`0%`}
                          variant="info" // Set the color to blue
                          style={{ height: '1rem' }} // Adjust the height
                        />                        
                        </td>
                      </tr>
                    );
                  } else {
                    console.log("Course Not Found:", enrolledCourse);
                    return (
                      <tr key={index}>
                        <td>{enrolledCourse}</td>
                        <td colSpan="4">Coming Soon</td>
                      </tr>
                    );
                  }
                })}
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
