import { CBadge } from '@coreui/react';
import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const user = useSelector((state) => state.user.user);
  const [accountDetails, setAccountDetails] = useState([]);
  const [bankName, setBankName] = useState([]);
  const [withDrawBankName, setWithDrawBankName] = useState('');
  const [amount, setAmount] = useState('');
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const navigate = useNavigate();

  const getAccountDetails = async () => {
    try {
      const uniqueId = await user.uniqueId;
      const res = await axios.post('https://adinathserver.onrender.com/api/v1/user/getAccountDetails', { uniqueId });
      if (res.data.success) {
        setAccountDetails(res.data.data);
      } else {
        message.error('No Account Details Found');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uniqueId = await user.uniqueId;
      const res = await axios.post('https://adinathserver.onrender.com/api/v1/user/requestForWithdrawal', {
        uniqueId,
        bankName: withDrawBankName,
        amount,
      });
      if (res.data.success) {
        message.success('Withdrawal Request Sent');
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBankName = async () => {
    try {
      const uniqueId = await user.uniqueId;
      const res = await axios.post('https://adinathserver.onrender.com/api/v1/user/getBankName', { uniqueId });
      if (res.data.success) {
        setWithDrawBankName(res.data.data[0].bankName + ' ' + res.data.data[0].ifscCode);
        setBankName(res.data.data);
      } else {
        message.error('No Account Details Found');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getWithdrawalHistory = async () => {
    try {
      const uniqueId = await user.uniqueId;
      const res = await axios.get('https://adinathserver.onrender.com/api/v1/user/getWithdrawalHistory', { uniqueId });
      if (res.data.success) {
        setWithdrawalHistory(res.data.data);
      } else {
        message.error('No Withdrawal History Found');
        setWithdrawalHistory([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (accountDetails.length === 0) {
      getAccountDetails();
    }
    if (bankName.length === 0) {
      getBankName();
    }
    if (withdrawalHistory.length === 0) {
      getWithdrawalHistory();
    }
  }, [accountDetails, bankName, withdrawalHistory]);
  return (
    <>
      <Container fluid>
        <Row className="mb-3">
          <Container className="d-flex col-12 justify-content-between flex-wrap-reverse flex-wrap flex-sm-wrap-reverse flex-md-nowrap">
            <Container className="card col-12 col-md-6 col-lg-4">
              <CardBody>
                <Form>
                  <Form.Group className="mb-5" controlId="formBasicEmail">
                    <Form.Label htmlFor="inputPassword5">Amount</Form.Label>
                    <Form.Control
                      type="number"
                      aria-describedby="Select Bank"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <Form.Label htmlFor="inputPassword5">Select Bank</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => {
                        setWithDrawBankName(e.target.value)
                        console.log('set withdraw bank name' + e.target.value)
                      }}
                    >
                      <option value="select" disabled>
                        Select Bank Name
                      </option>
                      {bankName &&
                        bankName.map((bank) => (
                          <option key={bank._id} value={bank.bankName + ' ' + bank.ifscCode}>
                            {bank.bankName + ' ' + bank.ifscCode}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                  <Container fluid className="d-flex justify-content-between">
                    <Button
                      onClick={() => navigate('/bank-account-setup')}
                      className=" bg-info border-0 d-flex align-items-center justify-content-center"
                    >
                      Add Bank Account
                    </Button>
                    <Button
                      className="border-0  bg-info d-flex align-items-center justify-content-center"
                      size="sm"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Submit
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Container>
            <Container className=" d-flex justify-content-end align-items-baseline">
              <Button className="m-2 " size="md">
                Transfer to User??
              </Button>
            </Container>
          </Container>
        </Row>

        <Row>
          <Col className="col-12">
            <Card className="w-100">
              <Card.Header className="h4">
                <Container fluid className="d-flex justify-content-between">
                  <div>Details</div>
                  <div>Commission : {user && user.totalCommissionEarned}</div>
                </Container>
              </Card.Header>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th className='text-center'>SN</th>
                      <th className='text-center'>IFSC Code</th>
                      <th className='text-center'>Amt</th>
                      <th className='text-center'>Req. Date</th>
                      <th className='text-center'>Trans. ID</th>
                      <th className='text-center'>Status</th>
                      <th className='text-center'>Transfer On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawalHistory && withdrawalHistory ? (
                      withdrawalHistory.map((history, index) => (
                        <>
                          <tr key={index}>
                            <td className='text-center'>{index + 1}</td>
                            <td className='text-center'>{history.bankName}</td>
                            <td className='text-center'>{history.amount}</td>
                            <td className='text-center'>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td className='text-center'>{history.transactionId ? history.transactionId : "N/A"}</td>
                            <td className='text-center'>{history.status === "pending" ? <CBadge color='warning'>Pending</CBadge>: <CBadge color='success'>Approved</CBadge>}</td>
                            <td className='text-center'>{history.transferOn ? history.transferOn : "N/A"}</td>
                          </tr>
                        </>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="text-danger text-center">
                          No Data Found
                        </td>
                      </tr>
                    )}
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
