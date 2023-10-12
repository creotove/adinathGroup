import { cilDelete, cilPen } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { message } from 'antd'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { setAccountDetails } from '../../features/accountDetailsSlice'

const Index = () => {
  console.log('rendering bank account setup')
  const user = useSelector((state) => state.user.user)
  // const accountDetails = useSelector((state) => state.accountDetails.details)

  const dispatch = useDispatch()
  const [accountDetails, setAccountDetails] = useState([])

  const [accountNumber, setAccountNumber] = useState('')
  const [accountHolderName, setAccountHolderName] = useState('')
  const [ifscCode, setIfscCode] = useState('')
  const [bankName, setBankName] = useState('')
  const [validated, setValidated] = useState(false)

  const handleSubmit = async (e) => {
    try {
      console.log('submit')
      const form = e.currentTarget
      if (form.checkValidity() === false) {
        e.preventDefault()
        e.stopPropagation()

        setValidated(true)
        return
      }
      e.preventDefault()
      e.stopPropagation()
      const formData = {
        userId: user._id,
        accountNumber,
        accountHolderName,
        ifscCode,
        bankName,
      }
      const res = await axios.post(
        'https://adinathserver.onrender.com/api/v1/user/setAccountDetails',
        formData,
      )
      if (res.data.success) {
        message.success(res.data.message)
        setAccountNumber('')
        setAccountHolderName('')
        setIfscCode('')
        setBankName('')
        setValidated('')
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
      message.error('Error in adding Partner')
      console.log(error)
    }
    e.preventDefault()
  }
  //eslint-disable-next-line
  const getAccountDetails = async () => {
    try {
      const uniqueId = await user.uniqueId
      const res = await axios.post('https://adinathserver.onrender.com/api/v1/user/getAccountDetails', { uniqueId })
      if (res.data.success) {
        setAccountDetails(res.data.data)
      } else {
        message.error('No Account Details Found')
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!accountDetails.length) {
      getAccountDetails()
    }
  }, [accountDetails])

  return (
    <>
      <Container fluid>
        <Row>
          <Col className="col-md-4 col-sm-12 mb-5">
            <Card className="w-100  shadow-sm">
              <CardBody>
                <Form noValidate validated={validated} onSubmit={handleSubmit} autoComplete="off">
                  <Row className="mb-3">
                    <Form.Group className="" controlId="formAccountNumber">
                      <Form.Label>Account Number</Form.Label>
                      <Form.Control
                        size="sm"
                        type="number"
                        placeholder="Enter Account Number"
                        onChange={(e) => {
                          setAccountNumber(e.target.value)
                        }}
                        value={accountNumber}
                        required
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} className="" controlId="formAccountHolderName">
                      <Form.Label>Account holder name</Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Enter Account Holder Name"
                        onChange={(e) => setAccountHolderName(e.target.value)}
                        value={accountHolderName}
                        required
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} className="" controlId="formRole">
                      <Form.Label>Bank Name</Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Enter Bank Name"
                        onChange={(e) => setBankName(e.target.value)}
                        value={bankName}
                        required
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} className="" controlId="formAge">
                      <Form.Label>IFSC Code</Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Enter IFSC Code"
                        onChange={(e) => setIfscCode(e.target.value)}
                        value={ifscCode}
                        required
                      />
                    </Form.Group>
                  </Row>

                  <Button
                    variant="primary"
                    // className="col-4 col-sm-12 col-lg-3 col-xs-12 col-md-4 col-12 offset-md-9"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>

          <Col className="col-md-8 col-sm-12">
            <Card className="w-100 shadow-sm">
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th className="text-center">SN</th>
                      <th className="text-center">Account Name</th>
                      <th className="text-center">Account No </th>
                      <th className="text-center">IFSC Code</th>
                      <th className="text-center">Bank Name</th>
                      <th className="text-center" colSpan={2}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountDetails &&
                      accountDetails.map((account, index) => (
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{account.accountHolderName}</td>
                          <td className="text-center">{account.accountNumber}</td>
                          <td className="text-center">{account.ifscCode}</td>
                          <td className="text-center">{account.bankName}</td>
                          <td className="text-center d-flex justify-content">
                            <Button size="sm w-100 mb-2 btn-info me-2">
                              <CIcon icon={cilPen} className="nav-icon" />
                            </Button>
                          </td>
                          <td className='text-center'>
                            <Button size="sm w-100 mb-2 btn-danger me-2">
                              <CIcon icon={cilDelete} className="nav-icon" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Index
