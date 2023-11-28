import React from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';

import { getAllCourses } from '../../redux/courseSlice';

import CourseCard from '../../components/user/CourseCard';

import course_css from "./CourseListing.module.scss"

import Header from '../../components/user/Header';

import HeroSection from '../../components/user/HeroSection';

import Footer from '../../components/user/Footer';

import Buffering from '../../components/buffering';

export default function CourseListing() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const { loading, courses, error } = useSelector((state) => state.courseReducer);
  const { enrolledCourses } = useSelector((state) => state.userReducer);

  if (loading) {
    return <Buffering />;
  }

  return (
    <>
      <Header />
      <HeroSection />
      <div className={course_css.course_flex}>
        {courses.map((data) => (
          <CourseCard
            key={data.id}
            id={data.id}
            courseName={data.courseName}
            instructorName={data.instructorName}
            description={data.description}
            // Check if the user is enrolled in this course
            enrollmentStatus={
              enrolledCourses && enrolledCourses.includes(data.id)
                ? "Progress"
                : data.enrollmentStatus
            }
            courseDuration={data.courseDuration}
            schedule={data.schedule}
            location={data.location}
            prerequisites={data.prerequisites}
            progress={data.progress}
            syllabus={data.syllabus}
            thumbnail1={data.thumbnail1}
            thumbnail2={data.thumbnail2}
            thumbnail3={data.thumbnail3}
            coursePrice={data.coursePrice}
            courseLikes={data.courseLikes}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}