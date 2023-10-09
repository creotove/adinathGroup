import React from 'react'
import { Button, Card, Container, Form, InputGroup, Row } from 'react-bootstrap'

const Index = () => {
  return (
    <Container>
         <Row>
        <div className="col-12 gx-4">
          <Card className="w-100 shadow-sm">
            <Card.Header className="h4">Set Partner Price</Card.Header>
            <Card.Body>
              <Container fluid className="d-flex">
                <Card className="m-2 col-3">
                  <Card.Header className="m-2 ">Master Distributor</Card.Header>
                  <Card.Body>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                      <Form.Control aria-label="Text input with checkbox" />
                      <Button variant="outline-info" id="button-addon2">
                        Set
                      </Button>
                    </InputGroup>
                  </Card.Body>
                </Card>
                <Card className="m-2 col-3">
                  <Card.Header>Distributor</Card.Header>
                  <Card.Body>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                      <Form.Control aria-label="Text input with checkbox" />
                      <Button variant="outline-info" id="button-addon2">
                        Set
                      </Button>
                    </InputGroup>
                  </Card.Body>
                </Card>
                <Card className="m-2 col-3">
                  <Card.Header>Retailer</Card.Header>
                  <Card.Body>
                    <InputGroup className="mb-3">
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                      <Form.Control aria-label="Text input with checkbox" />
                      <Button variant="outline-info" id="button-addon2">
                        Set
                      </Button>
                    </InputGroup>
                  </Card.Body>
                </Card>
              </Container>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Container>
  )
}

export default Index