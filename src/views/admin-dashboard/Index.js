import React, { useState } from 'react'
import { Card, Container, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Input } from 'antd'
import { Button } from 'react-bootstrap'
import qrCode from '../../assets/qrcodes/qrCode.png'
import Greetings from '../greetings/Greetings'
import CIcon from '@coreui/icons-react'
import { cilWallet } from '@coreui/icons'

const Index = () => {
  const user = useSelector((state) => state.user.user)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  if (!user) return navigate('/')

  const onFinish = (values) => {
    console.log('Success:', values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

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
          <Container>
            <Greetings user={user} />
          </Container>
          <Container
            fluid
            className="d-flex justify-content-center "
            style={{
              minHeight: '70vh',
              width: '100%',
            }}
          >
            <div className="d-flex justify-content-center flex-column">
              <div className="d-flex flex-column flex-md-row ">
                <Card className="card border-1 rounded-4 border-dark ">
                  <Card.Header className="text-center bg-white rounded-top-4 border-dark border-1">
                    <h5>UTI LOGIN DETAILS</h5>
                  </Card.Header>
                  <Card.Body>
                    <Form
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <Form.Item
                        name="utiID"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your username!',
                          },
                        ]}
                      >
                        <span className="text-center d-flex align-items-center justify-content-center">
                          UTI ID
                        </span>
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="utiPassword"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password!',
                          },
                        ]}
                      >
                        <span className="text-center d-flex align-items-center justify-content-center">
                          UTI Password
                        </span>
                        <Input.Password />
                      </Form.Item>
                      <Container fluid className="d-flex align-items-center justify-content-center">
                        <Button className="btn-dark btn d-flex align-items-center justify-content-center">
                          Login Link
                        </Button>
                      </Container>
                    </Form>
                  </Card.Body>
                </Card>

                <div className="mx-4 my-2 my-md-0">
                  <img
                    src={qrCode}
                    style={{
                      height: '22rem',
                      objectFit: 'contain',
                    }}
                    alt="qrcode"
                  />
                </div>

                <Card className="d-flex align-items-center bg-transparent border-0 justify-content-between">
                  <Card
                    className="border-1 border-dark p-2 w-100 d-flex justify-content-center align-items-center text-white"
                    style={{
                      height: '5rem',
                      cursor: 'pointer',
                      background: '#002347',
                    }}
                  >
                    <div className="h1">250</div>
                    <div
                      style={{
                        fontSize: '.8rem',
                      }}
                    >
                      TOTAL MASTER DISTRIBUTOR
                    </div>
                  </Card>
                  <Card
                    className="border-1 border-dark p-2 w-100 d-flex justify-content-center align-items-center text-white my-2 my-md-0"
                    style={{
                      height: '5rem',
                      cursor: 'pointer',
                      background: '#003366',
                    }}
                  >
                    <div className="h1">250</div>
                    <div
                      style={{
                        fontSize: '.8rem',
                      }}
                    >
                      TOTAL DISTRIBUTOR
                    </div>
                  </Card>
                  <Card
                    className="border-1 border-dark p-2 w-100 d-flex justify-content-center align-items-center text-white"
                    style={{
                      height: '5rem',
                      cursor: 'pointer',
                      background: '#003f7d',
                    }}
                  >
                    <div className="h1">250</div>
                    <div
                      style={{
                        fontSize: '.8rem',
                      }}
                    >
                      TOTAL Retailer
                    </div>
                  </Card>
                </Card>
              </div>
            </div>
            <div className=" ">
              <div
                className="bg-white mb-2 "
                style={{
                  border: '1px solid rgb(65, 117, 252)',
                  borderStyle: 'dotted',
                  marginLeft: '6rem',
                  borderRadius: '10px',
                  padding: '.7rem',
                  color: 'rgb(65, 117, 252)',
                }}
              >
                <CIcon className="" icon={cilWallet} /> Balance : ₹2000
              </div>

              <div
                className="bg-white "
                style={{
                  border: '1px solid rgb(65, 117, 252)',
                  borderStyle: 'dotted',
                  marginLeft: '6rem',
                  borderRadius: '10px',
                  padding: '.7rem',
                  color: 'rgb(65, 117, 252)',
                }}
              >
                Total Earned : ₹121
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  )
}

export default Index
