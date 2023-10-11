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
                      <th>Partner Name</th>
                      <th>Role</th>
                      <th>Commission</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Partner 1</td>
                      <td>Master Admin</td>
                      <td>1000</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Partner 2</td>
                      <td>Master Distributor</td>
                      <td>1000</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Partner 3</td>
                      <td>Distributor</td>
                      <td>1000</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Partner 4</td>
                      <td>Retailer</td>
                      <td>1000</td>
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