import React from 'react';

import { editCourse, getCourseById } from '../../redux/courseSlice';

import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import {useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import Skeleton from 'react-loading-skeleton';

import edit_course_css from  './EditCourseForm.module.scss'; 

import SideNav from '../../components/admin/SideNav';

import Buffering from '../../components/buffering';

const Swal = require('sweetalert2')

export default function EditCourseForm() {

  const navigate = useNavigate();

  const { id } = useParams();

  let { singleCourse, loading } = useSelector((state) => state.courseReducer);

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getCourseById(id));
  }, [dispatch, id]);


  const isLoading = false; // Set to true when data is loading

  const initialValues = singleCourse || {
    courseName: '',
    instructorName: '',
    description: '',
    enrollmentStatus: '',
    courseDuration: '',
    schedule: '',
    location: '',
    prerequisites: '',
    progress: 0,
    syllabus: '',
    thumbnail1: '',
    thumbnail2: '',
    thumbnail3: '',
    coursePrice: '',
    courseLike: 0
  };

  const onSubmit = (values) => {
    // Handle form submission here

        console.log ("from data", values)

        dispatch(editCourse({ id, updatedCourse: values }));

  Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
  }).then(() => {
      navigate('/edit_or_delete_courses'); // Redirect to the medicine_register page
  });

}

if (loading) {
  return <Buffering/>;
}


  return (

    <SideNav>

    <div className={edit_course_css.card}>
      <h2> Edit on existing course</h2>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};
          
          if (!values.courseName) {
            errors.courseName = 'Required';
          }
          if (!values.instructorName) {
            errors.instructorName = 'Required';
          }
          if (!values.description) {
            errors.description = 'Required';
          }
          if (values.enrollmentStatus.length === 0) {
            errors.enrollmentStatus = 'Please select at least one status';
          }
          if (!values.courseDuration) {
            errors.courseDuration = 'Required';
          }
          if (!values.schedule) {
            errors.schedule = 'Required';
          }
          if (!values.location) {
            errors.location = 'Required';
          }
          if (!values.prerequisites) {
            errors.prerequisites = 'Required';
          }
          if (!values.syllabus) {
            errors.syllabus = 'Required';
          }
          if (!values.thumbnail1) {
            errors.thumbnail1= ['Thumbnail 1 is required'];
          }

          if (!values.thumbnail2) {
            errors.thumbnail2 = ['Thumbnail 2 is required'];
          }
          if (!values.thumbnail3) {
            errors.thumbnail3 = ['Thumbnail 3 is required'];
          }

          if (!values.coursePrice) {
            errors.coursePrice = ['Course Price is required'];
          }

         
          // Add more validation rules for other fields as required

          return errors;
        }}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <div className={edit_course_css.form_group}>
              <label>Course Name:</label>
              {isLoading ? <Skeleton width={200} height={20} /> : <Field type="text" name="courseName" />}
              <ErrorMessage name="courseName" component="div" className={edit_course_css.error_message} />
            </div>

            <div className={edit_course_css.form_group}>
              <label>Instructor's Name:</label>
              {isLoading ? <Skeleton width={200} height={20} /> : <Field type="text" name="instructorName" />}
              <ErrorMessage name="instructorName" component="div" className={edit_course_css.error_message} />
            </div>

            <div className={edit_course_css.form_group}>
              <label>Description:</label>
              {isLoading ? <Skeleton width={200} height={50} /> : <Field as="textarea" name="description" />}
              <ErrorMessage name="description" component="div" className={edit_course_css.error_message} />
            </div>

            <div className={edit_course_css.form_group}>
              <label>Enrollment Status:</label>
              {isLoading ? (
                <div>
                  <Skeleton width={100} height={20} /> <Skeleton width={100} height={20} /> <Skeleton width={100} height={20} />
                </div>
              ) : (
                // Checkbox options for Enrollment Status
                <div>
                  <label>
                    <Field type="radio" name="enrollmentStatus" value="Open" />
                    Open
                  </label>
                  <label>
                    <Field type="radio" name="enrollmentStatus" value="Closed" />
                    Closed
                  </label>
                  <label>
                    <Field type="radio" name="enrollmentStatus" value="In Progress" />
                    In Progress
                  </label>
                </div>
              )}
              <ErrorMessage name="enrollmentStatus" component="div" className={edit_course_css.error_message} />
            </div>

            <div className={edit_course_css.form_group}>
              <label>Course Duration:</label>
              {isLoading ? <Skeleton width={200} height={20} /> : <Field type="text" name="courseDuration" />}
              <ErrorMessage name="courseDuration" component="div" className={edit_course_css.error_message} />
            </div>

            <div className={edit_course_css.form_group}>
              <label>Schedule:</label>
              {isLoading ? <Skeleton width={200} height={20} /> : <Field type="text" name="schedule" />}
              <ErrorMessage name="schedule" component="div" className={edit_course_css.error_message} />
            </div>

            <div className={edit_course_css.form_group}>
              <label>Location:</label>
              {isLoading ? <Skeleton width={200} height={20} /> : <Field type="text" name="location" />}
              <ErrorMessage name="location" component="div" className={edit_course_css.error_message} />
            </div>

            <div className={edit_course_css.form_group}>
              <label>Pre-requisites:</label>
              {isLoading ? <Skeleton width={200} height={20} /> : <Field type="text" name="prerequisites" />}
              <ErrorMessage name="prerequisites" component="div" className={edit_course_css.error_message} />
            </div>

            <div className={edit_course_css.form_group}>
              <label>Syllabus:</label>
              {isLoading ? <Skeleton width={200} height={100} /> : <Field as="textarea" name="syllabus" />}
              <ErrorMessage name="syllabus" component="div" className={edit_course_css.error_message} />
            </div>

            <div className={edit_course_css.form_group}>
              <label>Thumbnail 1:</label>
              {isLoading ? <Skeleton width={200} height={20} /> : <Field type="text" name="thumbnail1" />}
              <ErrorMessage name="thumbnail1" component="div" className={edit_course_css.error_message} />
            </div>

            <div className={edit_course_css.form_group}>
              <label>Thumbnail 2:</label>
              {isLoading ? <Skeleton width={200} height={20} /> : <Field type="text" name="thumbnail2" />}
              <ErrorMessage name="thumbnail2" component="div" className={edit_course_css.error_message} />
            </div>

            <div className={edit_course_css.form_group}>
              <label>Thumbnail 3:</label>
              {isLoading ? <Skeleton width={200} height={20} /> : <Field type="text" name="thumbnail3" />}
              <ErrorMessage name="thumbnail3" component="div" className={edit_course_css.error_message} />
            </div>

            <div className={edit_course_css.form_group}>
              <label> Progress Bar </label>
              {isLoading ? <Skeleton width={200} height={20} /> : <Field type="number" name="progress" />}
              <ErrorMessage name="progress" component="div" className={edit_course_css.error_message} />
            </div>
            
            <div className={edit_course_css.form_group}>
              <label> Course Price </label>
              {isLoading ? <Skeleton width={200} height={20} /> : <Field type="number" name="coursePrice" />}
              <ErrorMessage name="coursePrice" component="div" className={edit_course_css.error_message} />
            </div>

            <div className={edit_course_css.form_group}>
              <label> Course Like  </label>
              {isLoading ? <Skeleton width={200} height={20} /> : <Field type="number" name="courseLike" />}
              <ErrorMessage name="courseLike" component="div" className={edit_course_css.error_message} />
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>

    </SideNav>
  );
};

