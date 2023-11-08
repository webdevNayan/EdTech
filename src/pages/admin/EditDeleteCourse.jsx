import React from 'react'

import SideNav from '../../components/admin/SideNav'


import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';

import { getAllCourses } from '../../redux/courseSlice';

import admin_course_css from "./EditDeleteCourse.module.scss"


import AdminCourseCard from '../../components/admin/AdminCourseCard';
import Buffering from '../../components/buffering';

export default function EditDeleteCourse() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses());
}, [dispatch]);

const { loading, courses, error } = useSelector((state) => state.courseReducer);

  console.log('Courses', courses);

  if (loading) {
    return <Buffering/>
  }


  return (
    <>

      <SideNav>

      <div className={admin_course_css.course_flex}>

     { courses.map((data)=>(
        <AdminCourseCard key={data.id} 
          id={data.id}
          courseName ={data.courseName}
          instructorName = {data.instructorName}
          description = {data.description}
          enrollmentStatus = {data.enrollmentStatus}
          courseDuration = {data.courseDuration}
          schedule  = {data.schedule}
          location = {data.location}
          prerequisites =  {data.prerequisites}
          progress = {data.progress}
          syllabus = {data.syllabus}
          thumbnail1 = {data.thumbnail1}
          thumbnail2 = {data.thumbnail2}
          thumbnail3 = {data.thumbnail3}
          coursePrice = {data.coursePrice}
          courseLike = {data.courseLike}

        />
      ))}
        
      </div>
     
     </SideNav>

    </>
  )
}

