import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CAvatar,
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'
import { toggleSidebar } from '../features/sideBarSlice'

import logo from '../assets/brand/ADI-Light-Logo.png'
import { Container } from 'react-bootstrap'

const AppHeader = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)


  return (
    <CHeader
      position="sticky"
      className="mb-4"
      style={{
        zIndex: 1000,
      }}
    >
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
          <Container fluid className="d-flex flex-column flex-md-row flex-lg-row align-items-center">
            <marquee className="text-danger">
              कृपा करके ध्यान दे कूपन मिलने का समय सुबह 10- रात 8 बजे तक है
            </marquee>
            <Container fluid className="d-flex justify-content-end align-items-end w-auto">
            <CHeaderNav
              style={{
                whiteSpace: 'nowrap',
                textDecoration: 'underline',
              }}
              className="mx-2 d-flex justify-content-center align-items-center h-100"
            >
              {user ? user.uniqueId : ''}
            </CHeaderNav>
              <CHeaderNav
                style={{
                  whiteSpace: 'nowrap',
                }}
                className="bg-black rounded text-white p-2 mx-1 d-none d-md-block d-lg-block d-xl-block"
              >
                {user && user.role}
              </CHeaderNav>
              <CHeaderNav className=" ">
                <AppHeaderDropdown />
              </CHeaderNav>
            </Container>
          </Container>
        </CContainer>
      </CContainer>
      {/* <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  )
}

export default AppHeader
