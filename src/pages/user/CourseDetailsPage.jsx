import React from 'react';

import Buffering from '../../components/buffering';

import { useDispatch, useSelector } from 'react-redux';

import { getCourseById } from '../../redux/courseSlice';

import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Header from '../../components/user/Header';

import Footer from '../../components/user/Footer';

import {useParams } from 'react-router-dom';

import CourseDetailsCard from '../../components/user/CourseDetailsCard';

export default function CourseDetailsPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { singleCourse, loading } = useSelector((state) => state.courseReducer);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getCourseById(id));
    }, [dispatch, id]);
  
    if (loading) {
      return <Buffering />;
    }
  
    return (
      <>

        <Header/>

        {singleCourse ? (
          <CourseDetailsCard
            key={singleCourse.id}
            id={singleCourse.id}
            courseName={singleCourse.courseName}
            instructorName={singleCourse.instructorName}
            description={singleCourse.description}
            enrollmentStatus={singleCourse.enrollmentStatus}
            courseDuration={singleCourse.courseDuration}
            schedule={singleCourse.schedule}
            location={singleCourse.location}
            prerequisites={singleCourse.prerequisites}
            progress={singleCourse.progress}
            syllabus={singleCourse.syllabus}
            thumbnail1={singleCourse.thumbnail1}
            thumbnail2={singleCourse.thumbnail2}
            thumbnail3={singleCourse.thumbnail3}
            coursePrice={singleCourse.coursePrice}
            courseLikes={singleCourse.courseLikes}
          />
        ) : (
          <p>No course found</p>
        )}

        <Footer/>

      </>
    );
  }