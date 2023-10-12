import React, { useState } from 'react'
import { Button, Card, Col, Container, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Index = () => {
  const user = useSelector((state) => state.user.user)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  return (
    <Container fluid>
      <Container>
        <div className="d-flex flex-column flex-md-row flex-lg-row ">
          <Card
            className="col-12 col-md-7 col-lg-7 p-5 d-flex justify-content-center align-items-center my-2 my-md-0 my-lg-0 border-1 border-dark rounded-4"
            style={{
              backgroundColor: '#EDF0FF',
            }}
          >
            <Container fluid className="d-flex justify-content-evenly align-items-center flex-column flex-md-row">
              <div
              className='shadow-md rounded-2 bg-danger'
                style={{
                  height: '150px',
                  width: '150px',
                }}
              ></div>
              <div>
                <h3
                  style={{
                    color: 'rgb(13 171 156)',
                  }}
                >
                  {user && user.name}
                </h3>
                <div className="d-flex">
                  <img
                    src="https://img.icons8.com/?size=60&id=60654&format=png"
                    style={{
                      height: '20px',
                      width: '20px',
                      marginRight: '10px',
                      filter: 'opacity(0.5)',
                    }}
                    alt="Role"
                  />
                  <div className="text-muted fs-6">{user && user.role}</div>
                </div>
                <div className="d-flex ">
                  <img
                    src="https://img.icons8.com/?size=256&id=21602&format=png"
                    style={{
                      height: '20px',
                      width: '20px',
                      marginRight: '10px',
                      filter: 'opacity(0.5)',
                    }}
                    alt="UniqueId"
                  />
                  <div className="text-muted fs-6">{user && user.uniqueId}</div>
                </div>
                <div className="d-flex ">
                  <img
                    src="https://img.icons8.com/?size=256&id=63489&format=png"
                    style={{
                      height: '20px',
                      width: '20px',
                      marginRight: '10px',
                      filter: 'opacity(0.5)',
                    }}
                    alt="UniqueId"
                  />
                  <div className="text-muted fs-6">{user && user.email ? user.email : 'N/A'}</div>
                </div>
                <div className="d-flex ">
                  <img
                    src="https://img.icons8.com/?size=256&id=9730&format=png"
                    style={{
                      height: '20px',
                      width: '20px',
                      marginRight: '10px',
                      filter: 'opacity(0.5)',
                    }}
                    alt="UniqueId"
                  />
                  <div className="text-muted fs-6">{user && user.mobileNumber}</div>
                </div>
              </div>
            </Container>
          </Card>
          <Card className="col-12 col-md-4 offset-md-1 offset-lg-1 col-lg-4 border-1 border-dark rounded-4">
            <Card.Header
            className='border-1 border-dark rounded-top-4'
              style={{
                backgroundColor: '#EDF0FF',
              }}
            >
              Change Password
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Col} className="" controlId="formPinCode">
                  <Form.Label className="fs-6">Current Password</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Current Password"
                    size="sm"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={currentPassword}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} className="" controlId="formPinCode">
                  <Form.Label className="fs-6">New</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="New Password"
                    size="sm"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} className="" controlId="formPinCode">
                  <Form.Label className="fs-6">Confirm Password</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Confirm Password"
                    size="sm"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                  />
                </Form.Group>
                <Button size="sm mt-2 d-flex w-100 align-items-center justify-content-center">
                  Update Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
      <Container className='mt-3'>
        <Card className='border-1 border-dark rounded-4'>
          <Card.Header
          className='border-1 border-dark rounded-top-4'
            style={{
              backgroundColor: '#EDF0FF',
            }}
          >
            Profile Settings
          </Card.Header>
          <Card.Body>
            <Form className='row'>
              <Form.Group as={Col} className="col-12 col-md-6 col-lg-6" controlId="formPinCode">
                <Form.Label className="fs-6">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  size="sm"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  value={currentPassword}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} className="col-12 col-md-6 col-lg-6" controlId="formPinCode">
                <Form.Label className="fs-6">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  size="sm"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  value={currentPassword}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} className="col-12 col-md-6 col-lg-6" controlId="formPinCode">
                <Form.Label className="fs-6">Mobile Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Mobile Number"
                  size="sm"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  value={currentPassword}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} className="col-12 col-md-6 col-lg-6" controlId="formPinCode">
                <Form.Label className="fs-6">State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  size="sm"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  value={currentPassword}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} className="col-12 col-md-6 col-lg-6" controlId="formPinCode">
                <Form.Label className="fs-6">City</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="City"
                  size="sm"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  value={currentPassword}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} className="col-12 col-md-6 col-lg-6" controlId="formPinCode">
                <Form.Label className="fs-6">Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Image"
                  size="sm"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  value={currentPassword}
                  required
                />
              </Form.Group>
              
              <Container>

              <Button size="sm" className='mt-2 d-flex ms-auto'>
                Update Profile
              </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  )
}

export default Index
