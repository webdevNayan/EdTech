import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enrollCourse } from '../../redux/userSlice';
import card_css from './CourseCard.module.scss';
import Carousel from 'react-bootstrap/Carousel';
import { SlLocationPin, SlClock, SlCalender, SlEarphonesAlt, SlHeart } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const CourseCard = (props) => {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector((state) => state.userReducer.currentUser.course);

  const [likeCount, setLikeCount] = useState(props.courseLikes);
  const [liked, setLiked] = useState(false);

  const handleEnroll = () => {
    if (enrolledCourses.includes(props.courseName)) {
      // User is already enrolled in this course
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
        timer: 1500,
      });
    }
  };

  const handleLike = () => {
    if (!liked) {
      setLikeCount(likeCount + 1);
      setLiked(true);
    }
  };

  const handleImageError = (event) => {
    event.target.src = 'fallback-image.JPG';
  };

  return (
    <>
      <div className={card_css.card_background}>
        <Link to={`/course_details/${props.id}`}>
          <div className={card_css.carousel}>
            <Carousel data-bs-theme="dark">
              <Carousel.Item>
                <img
                  className="d-block w-100 rounded-3 object-fit-cover object-position-center"
                  src={props.thumbnail1}
                  alt="First slide"
                  onError={handleImageError}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 rounded-3 object-fit-cover object-position-center"
                  src={props.thumbnail2}
                  alt="Second slide"
                  onError={handleImageError}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 rounded-3 object-fit-cover object-position-center"
                  src={props.thumbnail3}
                  alt="Third slide"
                  onError={handleImageError}
                />
              </Carousel.Item>
            </Carousel>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <h1 className="fs-5 my-2 py-3"> {props.courseName} </h1>
            </div>
            <div className="mx-1">
              {/* Conditionally render "Progress" if the user is enrolled */}
              <button className={card_css.dotted_button}>
                {(enrolledCourses.includes(props.courseName)) ? 'Progress' : props.enrollmentStatus}
              </button>            
              </div>
          </div>

          <div className="row justify-content-center">
            <div className="d-flex col-md">
              <SlEarphonesAlt className="mt-1" />
              <h6 className="fs-5 mx-2 text-muted"> {props.instructorName} </h6>
            </div>

            <div className="d-flex col-md">
              <SlClock className="mt-1" />
              <h6 className="fs-5 mx-2 text-muted"> {props.courseDuration}</h6>
            </div>
          </div>

          <div className="row justify-content-center mt-3">
            <div className="d-flex col-md">
              <SlCalender className="mt-1" />
              <h6 className="fs-5 mx-2 text-muted"> {props.schedule} </h6>
            </div>

            <div className="d-flex col-md">
              <SlLocationPin className="mt-1" />
              <h6 className="fs-5 mx-2 text-muted"> {props.location} </h6>
            </div>
          </div>
        </Link>
        <div className="d-flex flex-nowrap align-items-center justify-content-between border-top border-muted pt-2 mt-2">
          <div>
            <h6 className="fs-5 mx-2"> $ {props.coursePrice} <small className="text-muted"> /month </small> </h6>
          </div>
          <div>
            <div>
              <button
                onClick={handleLike}
                className={card_css.like_button}
              >
                <SlHeart />
              </button>
              <span className={card_css.like_count}>{likeCount}</span>
              <button onClick={handleEnroll} className="btn btn-primary mx-1">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
