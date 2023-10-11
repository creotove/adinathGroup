import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CAvatar, CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import logo from '../assets/brand/ADI-Logo.png'

// sidebar nav config
import navigation from '../_nav'

import '../customScrollBar.css'

const AppSidebar = () => {
  const sidebarVisible = useSelector((state) => state.sidebar.sidebarVisible)
  const user = useSelector((state) => state.user.user)

  return (
    <CSidebar
      position="fixed"
      className="w-20  custom-scrollbar-container"
      visible={sidebarVisible}
    >
      <CSidebarBrand
        className="d-none d-md-flex"
        style={{
          height: '5rem',
        }}
        to="/"
      >
        {/* <CAvatar src={logo} /> */}
        <img
          src={logo}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: 'scale(0.7)',
          }}
          alt="logo"
        />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
        {user && <AppSidebarNav items={navigation} />}
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
