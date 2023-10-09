// import React from 'react'
// import {
//   CAvatar,
//   CBadge,
//   CDropdown,
//   // CDropdownDivider,
//   CDropdownHeader,
//   CDropdownItem,
//   CDropdownMenu,
//   CDropdownToggle,
// } from '@coreui/react'
// import {
//   cilWallet,
//   cilAccountLogout,
// } from '@coreui/icons'
// import CIcon from '@coreui/icons-react'
// import PropTypes from 'prop-types';

// import avatar8 from './../../assets/images/avatars/8.jpg'
// import { useNavigate } from 'react-router-dom'
// import { Button } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import { userSlice } from '../../features/userSlice'

// const AppHeaderDropdown = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const user = useSelector((state) => state.user.user)
//   return (
//     <CDropdown variant="nav-item">
//       <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
//         <CAvatar src={avatar8} size="md" />
//       </CDropdownToggle>
//       <CDropdownMenu className="pt-0" placement="bottom-end">
//         <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
//         <CDropdownItem href="#">
//           <CIcon icon={cilWallet} className="me-2" />
//           Wallet
//           <CBadge color="info" className="ms-2">
//             {user ? user.wallet : 0}
//           </CBadge>
//         </CDropdownItem>
//         <CDropdownItem>
//           <Button
//             onClick={() => {
//               navigate('/login')
//               localStorage.clear()
//               dispatch(userSlice.actions.clearUser())
//             }}
//             className="btn-danger"
//           >
//             <CIcon icon={cilAccountLogout} className="me-2" />
//             Logout
//           </Button>
//         </CDropdownItem>
//       </CDropdownMenu>
//     </CDropdown>
//   )
// }

// export default AppHeaderDropdown


// // Add prop validation
// AppHeaderDropdown.propTypes = {
//   clicked: PropTypes.func.isRequired, // Assuming it's a function
// };


import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  // CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilWallet,
  cilAccountLogout,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { userSlice } from '../../features/userSlice'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  return (
    
    <CDropdown variant="nav-item" style={{
      zIndex: 1000
    }}>
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilWallet} className="me-2" />
          Wallet
          <CBadge color="info" className="ms-2">
            {user ? user.wallet : 0}
          </CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <Button
            onClick={() => {
              navigate('/login')
              localStorage.clear()
              dispatch(userSlice.actions.clearUser())
            }}
            className="btn-danger"
          >
            <CIcon icon={cilAccountLogout} className="me-2" />
            Logout
          </Button>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
