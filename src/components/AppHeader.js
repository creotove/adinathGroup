import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CAvatar,
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CImage,
  CNavItem,
  CNavLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { toggleSidebar } from '../features/sideBarSlice'

import logo from '../assets/brand/ADI-Light-Logo.png'
import { NavLink } from 'react-bootstrap'

const AppHeader = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)

  const clicked = () => {
    console.log('clicked')
  }

  return (
    <CHeader position="sticky" className="mb-4"style={
  {
    zIndex: 1000
  }
}>
      <CContainer fluid>
        <CContainer fluid className="d-flex justify-content-space-between align-items-center">
          <CHeaderToggler
            className="ps-1"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              console.log('toggle sidebar')
              dispatch(toggleSidebar())
            }}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <CHeaderBrand className="mx-auto " to="/">
            <CAvatar src={logo} size="md" />
          </CHeaderBrand>
          <marquee className="text-danger">
            कृपा करके ध्यान दे कूपन मिलने का समय सुबह 10- रात 8 बजे तक है
          </marquee>
          <strong className="px-2">{user ? user.name : ''}</strong>
          <CHeaderNav className="d-none d-md-flex align-items-center">
            <AppHeaderDropdown />
          </CHeaderNav>
        </CContainer>
      </CContainer>
      {/* <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>

  )
}

export default AppHeader

