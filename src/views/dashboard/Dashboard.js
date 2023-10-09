import React, { useEffect, useState } from 'react'

import {
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const [users, setUsers] = useState([])
  // const [partners , setPartners] = useState([])
  const user = useSelector((state) => state.user.user)

  
  const getAllUsers = async () => {
    try {
      const res = await axios.get('/api/v1/admin/allUser')
      if (res.data.success) {
        const { data } = res.data
        setUsers(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // const getCreatedPartners = async () => {  
  //   try {
  //     // const uniqueId = user._id;
  //     const uniqueId = user.uniqueId;
  //     const res = await axios.get('https://adinathserver.onrender.com/api/v1/user/getCreatedPartners',uniqueId)
  //     if (res.data.success) {
  //       const { data } = res.data
  //       setPartners([...data])
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  useEffect(() => {
    getAllUsers()
    // getCreatedPartners()
  }, [])

  return (
    <>
      <CRow className='mb-4'>
        <CCol xs>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">Sn</CTableHeaderCell>
                <CTableHeaderCell>Date</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Unique Id</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Role </CTableHeaderCell>
                <CTableHeaderCell className="text-center">Name</CTableHeaderCell>
                <CTableHeaderCell className="text-center">PAN</CTableHeaderCell>
                <CTableHeaderCell className="text-center">State</CTableHeaderCell>
                <CTableHeaderCell className="text-center">City</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Pin Code</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Created By</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
            {/* {partners.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={1}>
                  <CTableDataCell className="text-center">{index +1}</CTableDataCell>
                  <CTableHeaderCell className="text-center">{item.date ? item.date : "N/A"}</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">{item._id}</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">{item.role}</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">{item.name}</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">{item.pan}</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">{item.state ? item.state : "N/A"}</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">{item.city ? item.city : "N/A"}</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">{item.pinCode ? item.pinCode : "N/A"}</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">{item.createdBy ? item.createdBy : "N/A"}</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">{item.status}</CTableHeaderCell>
                </CTableRow>
            ))}               */}
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell>User</CTableHeaderCell>
                {/* <CTableHeaderCell className="text-center">Country</CTableHeaderCell> */}
                <CTableHeaderCell className="text-center">Commission</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Partner Created</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Commission Earned</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {users.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    <div>{index + 1}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.name}</div>
                    <div className="small text-medium-emphasis">
                      {/* <span>{item.status}</span>  */}
                      {/* Created By:{ item.createdBy ? item.createdBy.name : 'Admin' } */}
                      Created By:{item.createdBy ? item.createdBy : 'Owner'}
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CIcon size="xl" icon={item.commission} />
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <strong>{item.partners.length}</strong>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <strong>{item.totalCommissionEarned}</strong>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard

// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon icon-lg" role="img"><path fill="var(--ci-primary-color, currentColor)" d="M88,160A64,64,0,1,0,24,96,64.072,64.072,0,0,0,88,160Zm0-96A32,32,0,1,1,56,96,32.036,32.036,0,0,1,88,64Z" class="ci-primary"></path><path fill="var(--ci-primary-color, currentColor)" d="M256,32a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,32Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,128Z" class="ci-primary"></path><path fill="var(--ci-primary-color, currentColor)" d="M424,160a64,64,0,1,0-64-64A64.072,64.072,0,0,0,424,160Zm0-96a32,32,0,1,1-32,32A32.036,32.036,0,0,1,424,64Z" class="ci-primary"></path><path fill="var(--ci-primary-color, currentColor)" d="M88,192a64,64,0,1,0,64,64A64.072,64.072,0,0,0,88,192Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,88,288Z" class="ci-primary"></path><path fill="var(--ci-primary-color, currentColor)" d="M256,192a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,192Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,288Z" class="ci-primary"></path><path fill="var(--ci-primary-color, currentColor)" d="M424,192a64,64,0,1,0,64,64A64.072,64.072,0,0,0,424,192Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,424,288Z" class="ci-primary"></path><path fill="var(--ci-primary-color, currentColor)" d="M424,352a64,64,0,1,0,64,64A64.072,64.072,0,0,0,424,352Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,424,448Z" class="ci-primary"></path><rect width="32" height="32" x="56" y="408" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect><rect width="32" height="32" x="152" y="408" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect><rect width="32" height="32" x="248" y="408" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect></svg>
