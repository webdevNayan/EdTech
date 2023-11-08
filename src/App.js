import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CourseListing from './pages/CourseListing';

import AdminDashboard from './pages/admin/AdminDashboard';

import AddNewCourse from './pages/admin/AddNewCourse';

import EditDeleteCourse from './pages/admin/EditDeleteCourse';

import EditCourseForm from './pages/admin/EditCourseForm';

import SingnIn from './pages/user/SignIn';

import SingnUp from './pages/user/SingnUp';
import RegisteredStudents from './pages/admin/RegisteredStudents';
import Dashboard from './components/user/Dashboard';
import AdminAuth from './components/admin/AdminAuth';


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={SingnIn} />  
          <Route path='/signin' Component={SingnIn} />  
          <Route path='/signup' Component={SingnUp} />  
          <Route path="/course_listing" Component={CourseListing} />
          <Route path="/admin_auth" Component={AdminAuth} />
          <Route path="/admin" Component={AdminDashboard} />
          <Route path="/add_courses" Component={AddNewCourse} />
          <Route path="/edit_or_delete_courses" Component={EditDeleteCourse} />
          <Route path="/edit_courses/:id" Component={EditCourseForm} />
          <Route path="/registered_students" Component={RegisteredStudents} />
          <Route path="/user_dashboard" Component={Dashboard} />
        </Routes>
      </BrowserRouter>      
    </>
  )
}
