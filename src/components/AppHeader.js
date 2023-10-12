import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CContainer, CHeader, CHeaderNav, CHeaderToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilMenu } from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'
import { toggleSidebar } from '../features/sideBarSlice'

import { Container } from 'react-bootstrap'
import { Button, Tooltip } from 'antd'

const AppHeader = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const tooltipStyle = {
    display: 'inline-block',
    position: 'relative',
  }

  const tooltipText = {
    zIndex: 1,
    position: 'absolute',
    backgroundColor: '#4175FC',
    color: 'white',
    padding: '5px',
    borderRadius: '5px',
    left: '20px', // Position it to the right of the content
    top: '50%',
    transform: 'translate(-50%, -50%)', // Center it vertically
  }

  const tooltipArrow = {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeft: '8px solid #4175FC',
    borderTop: '8px solid transparent',
    borderBottom: '8px solid transparent',
    left: '100%',
    top: '50%',
    transform: 'translate(0, -50%)', // Center the arrow vertically
  }

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

          <Container
            fluid
            className="d-flex  flex-column flex-md-row justify-content-between flex-lg-row align-items-center"
          >
            <div style={tooltipStyle} className="d-none d-md-inline ">
              <div style={tooltipText}>
                Alert
                <div style={tooltipArrow} />
              </div>
            </div>
            <marquee className="text-danger">
              Time for Collecting Coupon is from 10:am to 8:pm
            </marquee>
            <Container fluid className="d-flex border rounded-2 border-1 border-dark justify-content-end align-items-end w-auto ">
              
              <CHeaderNav
                style={{
                  whiteSpace: 'nowrap',
                }}
                className=" p-2 mx-1 d-none d-md-block d-lg-block d-xl-block"
              >
                {user && user.role}
              </CHeaderNav>
              <CHeaderNav
                style={{
                  whiteSpace: 'nowrap',
                  textDecoration: 'underline',
                }}
                className=" p-2 mx-1 d-none d-md-block d-lg-block d-xl-block"
              >
                {user ? user.uniqueId : ''}
              </CHeaderNav>
              
            </Container>
            <CHeaderNav className=" ">
                <AppHeaderDropdown />
              </CHeaderNav>
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
