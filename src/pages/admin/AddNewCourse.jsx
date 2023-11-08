import React from 'react'
import AddNewCourse from '../../components/admin/AddNewCourse';
import SideNav from '../../components/admin/SideNav.jsx';
import { nanoid } from '@reduxjs/toolkit';


export default function AdminDashboard() {
  return (
    <>

        <SideNav>

               <AddNewCourse key={nanoid} />

        </SideNav>

    </>
  )
}
