import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from 'react-bootstrap'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../features/userSlice'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [uniqueId, setUniqueId] = useState('')
  const [password, setPassword] = useState('')

  // const dispatch = useDispatch()

  const handleLogin = async () => {
    const data = {
      uniqueId,
      password,
    }
    try {
      const res = await axios.post('https://adinathserver.onrender.com/api/v1/user/login', data)
      if (res.data.success) {
        localStorage.setItem('token', res.data.token)
        message.success('Login Successful')
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
      message.error("Some error occured Please try again later")
      console.error(error.response.data.message)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={5}>
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <form>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                      <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={uniqueId}
                        onChange={(e) => setUniqueId(e.target.value)}
                      />
                    </InputGroup>
                    <Form.Group>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                          <CIcon icon={cilLockLocked}></CIcon>
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="Password"
                          aria-label="Password"
                          aria-describedby="basic-addon1"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </InputGroup>
                      <Container className="d-flex justify-content-between">
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          onClick={() => handleLogin()}
                        >
                          Login Now!
                        </Button>
                        {/* <Button color="primary" className="mt-3" active tabIndex={-1} onClick={() => {
                      navigate('/register')
                    }    }>
                    
                    Register Now!
                    </Button> */}
                      </Container>
                    </Form.Group>
                  </form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
