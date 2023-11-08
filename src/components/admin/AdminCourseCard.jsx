import React from 'react';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { deleteCourse } from '../../redux/courseSlice';

import Button from 'react-bootstrap/Button';

import admin_card_css from "./AdminCourseCard.module.scss";

import Carousel from 'react-bootstrap/Carousel';

import { SlLocationPin,SlClock, SlCalender, SlEarphonesAlt, SlHeart } from "react-icons/sl";


export default function AdminCourseCard(props) {

    const dispatch = useDispatch();

    const deleteCourseHandler = (id) => {
    // Dispatch delete action (if required)
     dispatch(deleteCourse(props.id)); 
    };
    

  const handleImageError = (event) => {
    event.target.src = 'fallback-image.JPG'; // Provide a URL for a fallback image
  };

  return (
    <>
      <div className={admin_card_css.card_background}>
        <div className={admin_card_css.carousel}>
          <Carousel data-bs-theme="dark">
            <Carousel.Item>
              <img
                className="d-block w-11rem rounded-3 object-fit-cover object-position-center"
                src={props.thumbnail1}
                alt="First slide"
                onError={handleImageError} // Add the onError event handler here
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-11rem rounded-3 object-fit-cover object-position-center"
                src={props.thumbnail2}
                alt="Second slide"
                onError={handleImageError} // Add the onError event handler here
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-11rem rounded-3 object-fit-cover object-position-center"
                src={props.thumbnail3}
                alt="Third slide"
                onError={handleImageError} // Add the onError event handler here
              />
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h1 className="fs-5 mx-2 p-3"> {props.courseName} </h1>
          </div>
          <div>
            <button className={admin_card_css.dotted_button}> {props.enrollmentStatus} </button>
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
        <div className='d-flex flex-nowrap align-items-center justify-content-between border-top border-muted pt-2 mt-2'>
          <div>
            <h6 className='fs-5 mx-2 '> $ {props.coursePrice} <small className='text-muted'> /month </small>  </h6>
          </div>
          <div>
            <div>
              <SlHeart/> {props.courseLike}
              
              <button className='btn btn-primary mx-1'> Enroll Now </button>
            </div>
          </div>
        </div>

        <div className='d-flex flex-nowrap align-items-center justify-content-evenly border-top border-muted pt-2 mt-2'>
          <div>
            <Link to={`/edit_courses/${props.id}`}>

                <Button variant="success" className="w-100">Edit This Course</Button>
            </Link>
          </div>
          <div>
            <Button variant="danger" className="w-100" onClick={deleteCourseHandler}> Delete This Course</Button>
          </div>
        </div>


      </div>
    </>
  );
}
