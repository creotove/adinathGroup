import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Layout, message } from 'antd'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../assets/brand/ADI-Light-Logo.png'
import { useNavigate } from 'react-router-dom'
import { userSlice } from '../../features/userSlice'
import { cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
const { Header } = Layout

const Index = () => {
  const user = useSelector((state) => state.user.user)
  
  const [role, setRole] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const [rolePrice, setRolePrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [disabledTransactionId, setDisabledTransactionId] = useState(false)
  const [validated, setValidated] = useState(false)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = useCallback(
    async (e) => {
      const form = e.currentTarget
      if (form.checkValidity() === false) {
        e.preventDefault()
        e.stopPropagation()
        setValidated(true)
        return
      }
      e.preventDefault()
      e.stopPropagation()

      if (transactionId === '') {
        message.error('Please Enter Transaction Id')
        return
      }
      const data = {
        userId: user._id,
        transactionId,
        rolePrice,
        role,
      }
      const res = await axios.post('https://adinathserver.onrender.com/api/v1/user/requestForApproval', { ...data })
      if (res.data.success) {
        message.success('Your request for approval is submitted')
        setDisabledTransactionId(true)
      } else {
        message.error('Something went wrong. Please try again later')
      }
    },
    [transactionId, rolePrice, role, user._id],
  )

  const fetchUserRolePrice = useCallback(async () => {
    try {
      setLoading(true)
      const res = await axios.get('https://adinathserver.onrender.com/api/v1/user/fetchUserRolePrice')
      if (res.data.success) {
        setRole(user.role)
        console.log('set loading false')
        if (user.role === 'Admin') {
          setRolePrice(res.data.data.admin)
        }
        if (user.role === 'Master Distributor') {
          setRolePrice(res.data.data.masterDistributor)
        }
        if (user.role === 'Distributor') {
          setRolePrice(res.data.data.distributor)
        }
        if (user.role === 'Retailer') {
          setRolePrice(res.data.data.retailer)
        }
        if (user.paidRolePrice) {
          setDisabledTransactionId(true)
        }
      } else {
        console.log('error while fetching user role price')
        message.error('Something went wrong. Please try again later')
      }
    } catch (error) {
      message.error('Something went wrong. Please try again later')
    } finally {
      setLoading(false)
    }
  }, [user.role])

  const fetchTransactioId = useCallback(async () => {
    try {
      setLoading(true)
      const userId = user._id
      const res = await axios.post('https://adinathserver.onrender.com/api/v1/user/fetchTransactionId', { userId })
      if (res.data.success) {
        setTransactionId(res.data.data.transactionId)
        setDisabledTransactionId(true)
      } else {
        console.log('error while fetching user role price')
      }
    } catch (error) {
      console.log('error while fetching user role price')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUserRolePrice()
    fetchTransactioId()
  }, [fetchUserRolePrice, fetchTransactioId])

  const memoizedDisabledTransactionIdMessage = useMemo(() => {
    if (disabledTransactionId) {
      return (
        <Container className="d-flex justify-content-center align-items-center text-success">
          You have paid the Amount please wait until we cross-check it. Generally, it would take
          several hours.
        </Container>
      )
    }
    return null
  }, [disabledTransactionId])

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
          <Header className="text-light h4 d-flex align-items-center justify-content-between">
            <img
              src={logo}
              alt=""
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)',
              }}
            />
            <div className="h-100 d-none justify-content-center align-items-center ms-auto me-5 d-sm-flex d-lg-flex">
              Hello &quot;<span className="text-success">{user && user.name}</span>&quot; Your
              Account is pending for approval!
            </div>
            <div className="">
              <Button
                onClick={() => {
                  navigate('/login')
                  localStorage.clear()
                  dispatch(userSlice.actions.clearUser())
                }}
                className="btn-danger text-white"
              >
                <CIcon icon={cilAccountLogout} className="me-2" />
                Logout
              </Button>
            </div>
          </Header>
          <Container
            fluid
            style={{
              width: '100vw',
            }}
          >
            <Container className="p-5 card">
              <Row className="d-flex  flex-md-row flex-column">
                <Col className="d-flex align-items-center col-sm-12 col-lg-4 col-md-5 justify-content-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="296" height="296">
                    <path d="M32,236v-28h56v56H32V236L32,236z M80,236v-20H40v40h40V236L80,236z M48,236v-12h24v24H48V236L48,236z M104,260v-4h-8v-16h8v-24h8v-8H96v-8H64v-8h8v-8H56v16h-8v-8H32v-8h16v-16h-8v8h-8v-16h16v8h8v8h8v-8h8v8h16v-8h-8v-8H56v-8h24v-8H56v-8h-8v8H32v-24h8v8h48v-8h-8v-8H64v8h-8v-8H40V96h16v16h8v-8h16v-8h8v8h-8v8h8v8h8v-16h8v-8h-8V72h16v8h8v8h-8v8h8v48h-16v-8h-8v8h-8v8h-8v8h8v8h8v8h16v-8h-8v-8h-8v-8h16v16h8v-16h8v16h8v-24h8v-8h8v8h-8v8h8v8h24v-8h-8v-8h-8v-16h-8v-8h8v-8h8v-8h-8v-8h-8v16h-8v-8h-8v8h-8v-8h8v-8h-8V72h-8v-8h8v8h8V40h8v16h16v-8h-8V32h16v8h-8v8h16v-8h8v-8h16v24h-16v-8h-8v16h8v24h8v-8h8v40h16v-8h-8V96h16v24h16v-8h-8V96h8v16h8v-8h16v16h-8v-8h-8v8h-8v24h8v8h-8v8h-16v8h-8v8h-16v-8h-8v-8h-8v16h8v8h24v8h16v-8h-8v-8h8v-8h8v8h8v8h8v-16h-8v-8h16v24h-8v16h8v16h-8v24h8v8h-24v16h-24v-8h16v-8h-16v-16h-8v16h-8v8h8v8h-16v-24h-8v16h-8v-8h-8v-32h8v24h8v-24h8v-16h-8v-8h-8v-8h8v-8h-8v-8h-8v32h8v8h-16v16h-8v16h8v8h-8v8h16v8h-16v-8h-8v-8h-8v16h-32V260L104,260z M128,248v-8h8v-24h-16v8h8v8h-16v8h-8v8h8v8h16V248L128,248z M240,240v-8h8v-16h8v-8h-8v-24h-8v24h8v8h-8v8h-8v24h8V240L240,240z M200,236v-4h-8v8h8V236L200,236z M152,220v-4h-8v8h8V220L152,220z M224,212v-12h-24v24h24V212L224,212z M208,212v-4h8v8h-8V212L208,212z M144,204v-4h16v-8h-16v-8h-8v8h8v8h-16v-8h-8v8h-8v-8h-8v-8h-8v-8h-8v8h-8v8h8v-8h8v8h8v8h8v8h32V204L144,204z M120,180v-4h-8v8h8V180L120,180z M160,176v-8h-16v8h8v8h8V176L160,176z M208,164v-4h-8v8h8V164L208,164z M224,156v-4h8v-24h-8v8h-8v8h-8v-8h-16v-8h-8v-8h8V96h-8v-8h-8v-8h-8v8h-8V64h8v8h8v-8h-8v-8h-8v8h-8v24h8v8h8v-8h8v24h-8v8h-8v8h8v16h8v-8h16v8h8v8h16v8h8V156L224,156z M216,148v-4h8v8h-8V148L216,148z M88,140v-4h8v-8h-8v8h-8v8h8V140L88,140z M112,124v-4h-8v8h8V124L112,124z M112,84v-4h-8v8h8V84L112,84z M144,80v-8h-8v16h8V80L144,80z M192,44v-4h-8v8h8V44L192,44z M256,260v-4h8v8h-8V260L256,260z M256,144v-8h-8v-8h8v8h8v16h-8V144L256,144z M32,60V32h56v56H32V60L32,60zM80,60V40H40v40h40V60L80,60z M48,60V48h24v24H48V60L48,60z M208,60V32h56v56h-56V60L208,60z M256,60V40h-40v40h40V60L256,60zM224,60V48h24v24h-24V60L224,60z M96,60v-4h8v8h-8V60L96,60z M112,52v-4h-8V32h8v8h8v-8h8v8h-8v16h-8V52L112,52z" />
                  </svg>
                </Col>
                <Col
                  style={{
                    overflow: 'hidden',
                  }}
                >
                  <Container
                    fluid
                    className="h-100 w-100"
                    style={{
                      overflow: 'hidden',
                    }}
                  >
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmit}
                      autoComplete="off"
                    >
                      <Row className="mb-3 col-12">
                        <Form.Group as={Col} className="col-6" controlId="formFirstName">
                          <Form.Label>Role</Form.Label>
                          <Form.Control type="text" value={role} disabled />
                        </Form.Group>

                        <Form.Group as={Col} className="col-6" controlId="formLastName">
                          <Form.Label>Amount</Form.Label>
                          <Form.Control
                            type="text"
                            className="col-6"
                            value={`${rolePrice} rs.`}
                            disabled
                          />
                        </Form.Group>
                      </Row>
                      <Row>
                        <Form.Group
                          as={Col}
                          className="col-12 col-md-6 col-lg-6"
                          controlId="formLastName"
                        >
                          <Form.Label>Transaction Id</Form.Label>
                          <Form.Control
                            type="text"
                            value={transactionId}
                            disabled={disabledTransactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            autoComplete="off"
                          />
                        </Form.Group>
                        <span className="text-danger">
                          {disabledTransactionId ? (
                            ''
                          ) : (
                            <>
                              *Note : Please Make sure you enter correct transaction ID. You wont be
                              able to edit after submit
                            </>
                          )}
                        </span>
                      </Row>
                      {memoizedDisabledTransactionIdMessage}
                      {disabledTransactionId ? (
                        <Button
                          type="submit"
                          disabled={disabledTransactionId}
                          className="btn btn-success btn-block col-sm-12 col-lg-4 col-xs-12 col-md-4 col-12 mt-3"
                        >
                          Submitted
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          disabled={disabledTransactionId}
                          className="btn btn-primary btn-block col-sm-12 col-lg-4 col-xs-12 col-md-4 col-12 mt-3"
                        >
                          Submit
                        </Button>
                      )}
                    </Form>
                  </Container>
                </Col>
              </Row>
            </Container>
          </Container>
        </>
      )}
    </>
  )
}

export default Index
