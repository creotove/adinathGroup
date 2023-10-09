import React from 'react'
import { Button, Card, CardBody, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate()
  return (
    <>
      <Container fluid>
        <Row className='mb-3'>
          <Container className='d-flex col-12'>
            <Container className='card col-4'>
              <CardBody>
                <form>
                  <Form.Group className="mb-5" controlId="formBasicEmail">
                    <Form.Label htmlFor="inputPassword5">Amount</Form.Label>
                    <Form.Control type="number" aria-describedby="Select Bank" />
                    <Form.Label htmlFor="inputPassword5">Select Bank</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option value="HDFC">HDFC</option>
                      <option value="SBI">SBI</option>
                      <option value="Kotal">Kotal</option>
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
                      href="#"
                      className="border-0  bg-info d-flex align-items-center justify-content-center"
                      size="sm"
                    >
                      Submit
                    </Button>
                  </Container>
                </form>
              </CardBody>
            </Container>
            <Container className=' col-4 offset-4 d-flex justify-content-end align-items-baseline'>
            <Button className="m-2 " size="md">
                Transfer to User??
              </Button>
            </Container>
          </Container>
        </Row>

        <Row>
          <Col className="col-12">
            <Card className="w-100  ">
              <Card.Header className="h4">
                <Container fluid className="d-flex justify-content-between">
                  <div>Details</div>
                  <div>Commission : 40</div>
                </Container>
              </Card.Header>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>SN</th>
                      <th>Bank</th>
                      <th>Acc. No</th>
                      <th>IFSC Code</th>
                      <th>Amt</th>
                      <th>Req. Date</th>
                      <th>Trans. ID</th>
                      <th>Status</th>
                      <th>Transfer On</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>3</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                    </tr>

                    <tr>
                      <td>3</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                    </tr>

                    <tr>
                      <td>3</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                    </tr>
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


 
