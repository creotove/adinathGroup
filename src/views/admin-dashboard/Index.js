import { Header } from 'antd/es/layout/layout'
import React, { useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const user = useSelector((state) => state.user.user)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
  if(!user) return navigate('/')

  return (
    <>
      {loading ? (
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
      ) : (
        <>
            Admin Dashboard
         
        </>
      )}
    </>
  )
}

export default Index