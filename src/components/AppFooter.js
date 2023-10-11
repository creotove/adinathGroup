import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className='ms-auto'>
        <a href="https://adinathgroups.online/" target="_blank" rel="noopener noreferrer">
          Adinath Group Online
        </a>
        <span className="ms-1">&copy; 2023 Adinath Group.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
