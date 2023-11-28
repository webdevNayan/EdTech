import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsPeople, BsPlusSquare, BsPencilSquare } from 'react-icons/bs';
import styles from './SideNav.module.scss';
import AdminHeader from './AdminHeader';

export default function SideNav(props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
    <AdminHeader/>
    <div className={`${styles.dashboard} ${isCollapsed ? 'collapsed' : ''}`}>
      <div className={styles.sidenav}>
       
        <Link to="/add_courses">
          <BsPlusSquare />
          {!isCollapsed && <span>Add Course</span>}
        </Link>
        <Link to="/registered_students">
          <BsPeople />
          {!isCollapsed && <span>Registered Students</span>}
        </Link>
        <Link to="/edit_or_delete_courses">
          <BsPencilSquare />
          {!isCollapsed && <span>Edit or Delete Course</span>}
        </Link>
        <button onClick={() => setIsCollapsed(!isCollapsed)}>
          {!isCollapsed ? '<' : '>'}
        </button>
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
    </>

  );
}
