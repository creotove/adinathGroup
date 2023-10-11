import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Form, InputGroup, Row } from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { message } from 'antd'

const Index = () => {
  const user = useSelector((state) => state.user.user)

  const [disable, setDisable] = useState(true)
  const [couponPrice, setCouponPrice] = useState(0)
  const [actualCouponPrice, setActualCouponPrice] = useState(0)

  const handleSetPrice = async (e) => {
    try {
      if (!couponPrice) return message.error('Please Enter Price')
      if (couponPrice < 0) return message.error('Please Enter Valid Price')
      if (couponPrice < actualCouponPrice)
        return message.error(`Coupon price should be greater than ${actualCouponPrice} rs`)
      if(couponPrice > 106) return message.error('Coupon price should be less than 106 rs')

      const userId = await user._id
      const data = { userId, newCouponPrice: couponPrice }
      const res = await axios.post('https://adinathserver.onrender.com/api/v1/user/changeCouponPrice', data)
      console.log(res.data)
      if (res.data.success) {
        message.success('Price Set Successfully')
        getCouponPrice()
      }
    } catch (err) {
      message.error('Error in Changing Price')

    }
  }

  const getCouponPrice = async () => {
    try {
      const userId = await user._id
      const res = await axios.post('https://adinathserver.onrender.com/api/v1/user/getCouponPrice', { userId })
      console.log(res.data)
      setCouponPrice(res.data.data.couponPrice)
      setActualCouponPrice(res.data.data.actualPriceOfCoupon)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getCouponPrice()
  }, [])
  return (
    <Container fluid>
      <Row>
        <div className="col-12">
          <Row>
            <Card className="col-6 shadow-sm">
              <Card.Header className="h4">Set P Coupon Price</Card.Header>
              <Card.Body>
                <Container fluid className="d-flex flex-column">
                  <div className="">You Got Coupon in {actualCouponPrice}rs</div>
                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox
                      aria-label="Checkbox for following text input"
                      onChange={(e) => setDisable(!disable)}
                    />
                    <Form.Control
                      aria-label="Text input with checkbox"
                      type="number"
                      value={couponPrice}
                      disabled={disable}
                      onChange={(e) => setCouponPrice(e.target.value)}
                    />
                    <Button
                      variant="outline-info"
                      id="button-addon2"
                      disabled={disable}
                      onClick={handleSetPrice}
                    >
                      Set
                    </Button>
                  </InputGroup>
                </Container>
              </Card.Body>
            </Card>
            {/* <Card className="col-6  shadow-sm">
              <Card.Header className="h4">Set E Coupon Price</Card.Header>
              <Card.Body>
                <Container fluid className="d-flex flex-column">
                <div className="">
                  You Got Coupon in 98rs
                </div>
                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                    <Form.Control aria-label="Text input with checkbox" />
                    <Button variant="outline-info" id="button-addon2">
                      Set
                    </Button>
                  </InputGroup>
                </Container>
              </Card.Body>
            </Card> */}
          </Row>
        </div>
      </Row>
    </Container>
  )
}

export default Index
