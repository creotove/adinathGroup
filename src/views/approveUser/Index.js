import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { message } from 'antd'
import axois from 'axios'
import {
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableBody,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
} from '@coreui/react'
const Index = () => {
  console.log('rendering approve user page')
  const [approvalReqUser, setApprovalReqUser] = useState([])

  const findUserForApproval = async () => {
    try {
      const res = await axois.get('https://adinathserver.onrender.com/api/v1/masterAdmin/getUserForApproval')
      if (res.data.success) {
        if(res.data.data.length === 0){
          setApprovalReqUser(null)
        }else{
          setApprovalReqUser(res.data.data)
        }
      }
      
    } catch (error) {
      console.log(error)
      message.error('Something went wrong')
    }
  }
  useEffect(() => {
    findUserForApproval()
  }, [])
  const approveUser = async (uniqueId) => {
    try {
      const res = await axois.patch('https://adinathserver.onrender.com/api/v1/masterAdmin/approveUser',{uniqueId})
      if (res.data.success) {
        message.success(res.data.message)
        findUserForApproval()
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      message.error('Something went wrong')
    }
  }

  return (
    <Container fluid>
      <CRow className="mb-4">
        <CCol xs>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">#</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Transaction Id</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Paid</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Unique Id</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Role </CTableHeaderCell>
                <CTableHeaderCell className="text-center">Name</CTableHeaderCell>
                <CTableDataCell className="text-center" colSpan={2}>
                  Action
                </CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {approvalReqUser &&
                approvalReqUser.map((user, index) => (
                  <CTableRow v-for="item in tableItems" key={index + 1}>
                    <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                    <CTableDataCell className="text-center">{user.transactionId}</CTableDataCell>
                    <CTableDataCell className="text-center">{user.paid ? "Paid" : "False"}</CTableDataCell>
                    <CTableDataCell className="text-center">{user.uniqueId}</CTableDataCell>
                    <CTableDataCell className="text-center">{user.role}</CTableDataCell>
                    <CTableDataCell className="text-center">{user.name}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <Button className="btn-danger">Reject</Button>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <Button className="btn-primary" onClick={() => approveUser(user.uniqueId)}>
                        Approve
                      </Button>
                    </CTableDataCell>
                  </CTableRow>
                ))}
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>
    </Container>
  )
}

export default Index
