import {
  CBadge,
  CCol,
  CContainer,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { message } from 'antd'
import axios from 'axios'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { partnersSlice } from '../../../features/partnersSlice'

const Index = () => {
  const user = useSelector((state) => state.user.user)
  const partners = useSelector((state) => state.partners.partners)

  const dispatch = useDispatch()

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
                      
                        {item.status === 'pending' ? <CBadge color="warning" shape="rounded-pill">Pending</CBadge> : <CBadge color="success" shape="rounded-pill">Approved</CBadge>} 
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
  )
}

export default Index
