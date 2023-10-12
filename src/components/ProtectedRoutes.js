import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../features/userSlice'
import axios from 'axios'
import { Container, Spinner } from 'react-bootstrap'

const ProtectedRoutes = ({ children }) => {
  const user = useSelector((state) => state.user.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log('rendering protected routes')
  const getUser = async () => {
    try {
      const res = await axios.post(
        // 'https://adinathserver.onrender.com/api/v1/user/getUserData',
        '/api/v1/user/getUserData',
        { token: localStorage.getItem('token') },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      if (res.data.success) {
        dispatch(setUser(res.data.data))
        if (res.data.data.status === 'pending') {
          console.log('user is pending for approval')
          return navigate('/pending')
        }
        if (res.data.data.role === 'Master Admin') {
          return navigate('/master-admin-dashboard')
        }
        if (res.data.data.role === 'Admin') {
          return navigate('/admin-dashboard')
        }
        if (res.data.data.role === 'Master Distributor') {
          return navigate('/master-distributor-dashboard')
        }
        if (res.data.data.role === 'Distributor') {
          return navigate('/distributor-dashboard')
        }
        if (res.data.data.role === 'Retailer') {
          return navigate('/retailer-dashboard')
        }
      }
    } catch (error) {
      navigate('/login')
      console.log('clearing ')
      console.log(error)
    }
  }

  useEffect(() => {
    if (!user) {
      getUser()
    }
  }, [user]) // Only run this effect once on component mount

  return (
    <>
      {/* {loading ? (
        <>
          <Container
            fluid
            className="d-flex justify-content-center align-items-center"
            style={{
              height: '100vh',
            }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Container>
        </>
      ) : ( */}
      {children}
      {/* )} */}
    </>
  )
}

export default ProtectedRoutes

ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
}
