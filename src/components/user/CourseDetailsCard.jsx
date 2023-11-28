import React from 'react';
import { likeCourse } from '../../redux/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { enrollCourse } from '../../redux/userSlice';
import course_card_css from './CourseDetailsCard.module.scss';
import Carousel from 'react-bootstrap/Carousel';
import { SlLocationPin, SlClock, SlCalender, SlEarphonesAlt, SlHeart } from 'react-icons/sl';
import { MdDescription } from "react-icons/md";
import { FcIdea } from "react-icons/fc";
import { Si1001Tracklists } from "react-icons/si";
import Accordion from 'react-bootstrap/Accordion';
const Swal = require('sweetalert2')


export default function CourseDetailsCard (props) {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(state => state.userReducer.currentUser.course);

  const handleEnroll = () => {
    if (enrolledCourses.includes(props.courseName)) {
      // if User is already enrolled in this course
      Swal.fire({
        icon: 'error',
        title: 'You are already enrolled in this course!',
      });
    } else {
      dispatch(enrollCourse(props.courseName));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thank you for enrolling, Out Team will contact you shortly, ',
        showConfirmButton: false,
        timer: 1500
    })
    }
  };


  const handleImageError = (event) => {
    event.target.src = 'fallback-image.JPG';
  };

  return (
    <>
      <div className={course_card_css.card_background}>
        <div className={course_card_css.carousel}>
          <Carousel data-bs-theme="dark">
            <Carousel.Item>
              <img
                className="d-block w-11rem rounded-3 object-fit-cover object-position-center"
                src={props.thumbnail1}
                alt="First slide"
                onError={handleImageError} 
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-11rem rounded-3 object-fit-cover object-position-center"
                src={props.thumbnail2}
                alt="Second slide"
                onError={handleImageError} 
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-11rem rounded-3 object-fit-cover object-position-center"
                src={props.thumbnail3}
                alt="Third slide"
                onError={handleImageError} 
              />
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h1 className="fs-5 my-2 py-3 px-1"> {props.courseName} </h1>
          </div>
          <div>
            <button className={course_card_css.dotted_button}> {props.enrollmentStatus} </button>
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='d-flex col-md'>
            <SlEarphonesAlt className="mt-1"/>
            <h6 className='fs-5 mx-2 text-muted'> {props.instructorName} </h6>
          </div>

          <div className='d-flex col-md'>
            <SlClock className="mt-1"/>
            <h6 className='fs-5 mx-2 text-muted'> {props.courseDuration}</h6>
          </div>
        </div>

        <div className='row justify-content-center mt-3'>
          <div className='d-flex col-md'>
            <SlCalender className="mt-1"/>
            <h6 className='fs-5 mx-2 text-muted'> {props.schedule} </h6>
          </div>

          <div className='d-flex col-md'>
            <SlLocationPin className="mt-1"/>
            <h6 className='fs-5 mx-2 text-muted'> {props.location} </h6>
          </div>
        </div>
        <div>
          <h6 className='border-top border-muted fs-5 py-2'> <MdDescription /> Description </h6>
          <p className='text-muted'>{props.description}</p>
          <h6 className='border-top border-muted fs-5 py-2'> <FcIdea /> Prerequisites </h6>
          <p className='text-muted'>{props.prerequisites}</p>

          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h6 className='fs-5 py-2'> <Si1001Tracklists /> Syllabus </h6>
              </Accordion.Header>
              <Accordion.Body>
                <p className='text-muted'>{props.syllabus}</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

        </div>
        <div className='d-flex flex-nowrap align-items-center justify-content-between border-top border-muted pt-2 mt-2'>
          <div>
            <h6 className='fs-5 mx-2 '> $ {props.coursePrice} <small className='text-muted'> /month </small>  </h6>
          </div>
          <div>
            <div>
              <SlHeart/> {props.courseLikes}
              
              <button onClick={handleEnroll} className='btn btn-primary mx-1'> Enroll Now </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


