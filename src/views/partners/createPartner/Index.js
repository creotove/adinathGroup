import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  CBadge,
  CButton,
  CCol,
  CContainer,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { message } from 'antd'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { partnersSlice } from '../../../features/partnersSlice'

const Index = () => {
  const user = useSelector((state) => state.user.user)
  const partners = useSelector((state) => state.partners.partners)

  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [name, setname] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [role, setRole] = useState('Retailer')
  const [state, setState] = useState('Gujarat')
  const [uniqueId, setUniqueId] = useState('')
  const [pan, setPan] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [password, setPassword] = useState('')
  const [cnfrmPassword, setCnfrmPassword] = useState('')
  const [validated, setValidated] = useState(false)

  const dispatch = useDispatch()

  const handleNameUnique = (e) => {
    const lastSixDigit = mobileNumber.slice(-6)
    setUniqueId(`ADI-${lastSixDigit}`)
  }

  const handleSubmit = async (e) => {
    try {
      const form = e.currentTarget
      if (form.checkValidity() === false) {
        e.preventDefault()
        e.stopPropagation()
        if (password !== cnfrmPassword) {
          message.error('Password and Confirm Password does not match')
        }
        setValidated(true)
        return
      }
      e.preventDefault()
      e.stopPropagation()
      const formData = {
        name,
        mobileNumber,
        role,
        age,
        email,
        uniqueId,
        state,
        pan,
        city,
        password,
        pinCode: zip,
        createdBy: user._id,
      }
      console.log(formData)
      const res = await axios.post('https://adinathserver.onrender.com/api/v1/user/createUser', formData)
      if (res.data.success) {
        setname('')
        setMobileNumber('')
        setRole('')
        setState('')
        setUniqueId('')
        setEmail('')
        setAge('')
        setCity('')
        setZip('')
        setPassword('')
        setCnfrmPassword('')
        message.success('Partner Added successfull')
        navigate('/allpartner')
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
      message.error('Error in adding Partner')
      console.log(error)
    }
    e.preventDefault()
  }

  const getMypartners = useCallback(async () => {
    try {
      if (user) {
        const uniqueId = user.uniqueId // Assuming user has a uniqueId property
        const res = await axios.post('https://adinathserver.onrender.com/api/v1/user/getAllPartnersCreatedByUser', { uniqueId })
        if (res.data.success) {
          if (!res.data.data || res.data.data.length === 0) {
            message.info('No Partners Found')
          } else {
            if (res.data.data === null) {
              dispatch(partnersSlice.actions.setPartners(null))
              console.log(null)
            } else {
              dispatch(partnersSlice.actions.setPartners(res.data.data))
              console.log(res.data.data)
            }
          }
        } else {
          message.error(res.data.message)
        }
      }
    } catch (error) {
      message.error('Error in getting Partners')
      console.log(error)
    }
  }, [user, dispatch])

  useEffect(() => {
    getMypartners()
  }, [getMypartners])
  return (
    <>
      <CContainer fluid className="d-flex justify-content-end">
        <CButton onClick={() => setVisible(!visible)} color="primary" className="mb-3 ">
          Create Partner
        </CButton>
        <CModal
          size="lg"
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="OptionalSizesExample2"
        >
          <CModalHeader>
            <CModalTitle id="CreatePartnerModal">Create Partner</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="container justify-content-center d-flex mt-5 w-100 ">
              <Form noValidate validated={validated} onSubmit={handleSubmit} autoComplete="off">
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-sm-12 col-lg-4 col-xs-12 col-md-4 col-12"
                    controlId="formName"
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      onChange={(e) => {
                        setname(e.target.value)
                      }}
                      value={name}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    className="col-sm-12 col-lg-4 col-xs-12 col-md-4 col-12"
                    controlId="formMobileNumber"
                  >
                    <Form.Label>WhatsApp Number</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Mobile Number"
                      onChange={(e) => setMobileNumber(e.target.value)}
                      value={mobileNumber}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    className="col-sm-12 col-lg-4 col-xs-12 col-md-4 col-12"
                    controlId="formRole"
                  >
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setRole(e.target.value)
                        console.log(e.target.value)
                      }}
                      defaultValue={'Retailer'}
                      value={role}
                      required
                    >
                      <option value="Select Role" disabled>
                        Select Role
                      </option>
                      <option value="Master Admin">Master Admin</option>
                      <option value="Admin">Admin</option>
                      <option value="Master Distributor">Master Distributor</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Retailer">Retailer</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-sm-12 col-lg-4 col-xs-12 col-md-4 col-12"
                    controlId="formAge"
                  >
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Age"
                      onChange={(e) => setAge(e.target.value)}
                      value={age}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    className="col-sm-12 col-lg-4 col-xs-12 col-md-4 col-12"
                    controlId="UniqueId"
                  >
                    <Form.Label>Unique Id</Form.Label>
                    <Form.Control
                      type="text"
                      className="disabled"
                      placeholder="Unique Id"
                      onChange={(e) => handleNameUnique(e)}
                      value={uniqueId}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    className="col-sm-12 col-lg-4 col-xs-12 col-md-4 col-12"
                    controlId="formEmail"
                  >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      className="email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="col-sm-12 col-lg-4 col-xs-12 col-md-4 col-12"
                    controlId="formState"
                  >
                    <Form.Label>State</Form.Label>
                    <Form.Select
                      onChange={(e) => setState(e.target.value)}
                      defaultValue={'Gujarat'}
                      value={state}
                      required
                    >
                      <option value="Select State" disabled>
                        State...
                      </option>
                      <option value="Assam">Assam</option>
                      <option value="Andaman And Nicobar">Andaman And Nicobar</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Dadra And Nagar Haveli And Daman And Diu">
                        Dadra And Nagar Haveli And Daman And Diu
                      </option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Rajesthan">Rajesthan</option>
                      <option value="Utter Pradesh">Utter Pradesh</option>
                      <option value="Uttrakhand">Uttrakhand</option>
                      <option value="Jammu Kashmir">Jammu Kashmir</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Goa">Goa</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Andra Pradesh">Andra Pradesh</option>
                      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Tamilnadu">Tamilnadu</option>
                      <option value="Odisha">Odisha</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Panducherry">Panducherry</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Ladakh">Ladakh</option>
                      <option value="New Delhi">New Delhi</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    className="col-sm-12 col-lg-4 col-xs-12 col-md-4 col-12"
                    controlId="formCity"
                  >
                    <Form.Label>City </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter City"
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    className="col-sm-12 col-lg-4 col-xs-12 col-md-4 col-12"
                    controlId="formPinCode"
                  >
                    <Form.Label>PinCode </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Pin code"
                      onChange={(e) => setZip(e.target.value)}
                      value={zip}
                      required
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group
                    as={Col}
                    className="col-sm-12 col-lg-4 col-xs-12 col-md-4 col-12"
                    controlId="formPassword"
                  >
                    <Form.Label>Pan Car Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Pan Card Number"
                      onChange={(e) => setPan(e.target.value)}
                      value={pan}
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    className="col-sm-12 col-lg-4 col-xs-12 col-md-4 col-12"
                    controlId="formPassword"
                  >
                    <Form.Label>Password </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    className="col-sm-12 col-lg-4 col-xs-12 col-md-4 col-12"
                    controlId="formCnfrmPassword"
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Re-enter Password"
                      onChange={(e) => setCnfrmPassword(e.target.value)}
                      value={cnfrmPassword}
                      required
                    />
                  </Form.Group>
                </Row>

                <Button
                  variant="primary"
                  className="col-3 col-sm-12 col-lg-3 col-xs-12 col-md-3 col-12 offset-md-9"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </div>
          </CModalBody>
        </CModal>
      </CContainer>
      <CContainer fluid>
        <CRow>
          <CCol xs>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <b>Sn</b>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center">
                    <b>Date</b>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center">
                    <b>Unique Id</b>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center">
                    <b>Role</b>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center">
                    <b>Name</b>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center">
                    <b>PAN</b>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center">
                    <b>City</b>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center">
                    <b>Created By</b>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center">
                    <b>Status</b>
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {partners ? (
                  partners.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <strong>{index + 1}</strong>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">{item.uniqueId}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.role}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.name}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.pan}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.city}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.createdBy}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CBadge color="warning" shape="rounded-pill">
                          {item.status ==="Pending" ?"Approved" : "Pending" }
                        </CBadge>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow v-for="item in tableItems">
                    <CTableDataCell className="text-center" colSpan={9}>
                      <h4 className="text-center text-danger">No partners Found</h4>
                    </CTableDataCell>
                  </CTableRow>
                )}

                {/* {tableExample.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    <strong>{index + 1}</strong>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.user.name}</div>
                    <div className="small text-medium-emphasis">
                      <span>{item.user.new ? 'Aprroved' : 'Pending'}</span> | Registered:{' '}
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CIcon size="xl" icon={item.payment.icon} />
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <strong>{item.usage.value}</strong>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="small text-medium-emphasis">Last login</div>
                    <strong>{item.activity}</strong>
                  </CTableDataCell>
                </CTableRow>
              ))} */}
              </CTableBody>
            </CTable>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default Index
