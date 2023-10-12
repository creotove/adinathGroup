import React from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import DashBoardContent from '../components/DashBoardContent'
import ProtectedRoutes from '../components/ProtectedRoutes'

const DefaultLayout = () => {
  return (
    <div>
      <ProtectedRoutes>
        <AppSidebar />

        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <DashBoardContent />
          </div>
          <AppFooter />
        </div>
      </ProtectedRoutes>
    </div>
  )
}

export default DefaultLayout
