import React from 'react'

import { nanoid } from '@reduxjs/toolkit'


import AddNewCourse from '../../components/admin/AddNewCourse'

import SideNav from '../../components/admin/SideNav'

export default function AdminDashboard() {
  return (
    <>


        <SideNav>

               <AddNewCourse key={nanoid}/>

        </SideNav>

    </>
  )
}
