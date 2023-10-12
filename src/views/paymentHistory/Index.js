import React from 'react'
import { Card, Container, Row, Table } from 'react-bootstrap'

const Index = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <div className="col-12">
            <Card className='w-100 '>
              <Card.Header className='h4'>
                Payment History
              </Card.Header>

              <Card.Body>
                <Table>
                  <thead>
                    <tr>
                      <th>Sn.</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Type</th>
                      <th>Debit+</th>
                      <th>Credit-</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Partner 1</td>
                      <td>Master Admin</td>
                      <td>Commssion</td>
                      <td>1000</td>
                      <td>0</td>
                      <td>10000</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Partner 2</td>
                      <td>Admin</td>
                      <td>Transfered</td>
                      <td>0</td>
                      <td>1000</td>
                      <td>9000</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Self Name</td>
                      <td>Admin</td>
                      <td>Withdraw</td>
                      <td>0</td>
                      <td>9000</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>

            </Card>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default Index