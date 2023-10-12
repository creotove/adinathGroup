import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))


const Allpartners = React.lazy(() => import('./views/partners/AllPartners/Index'))
const createPartner = React.lazy(() => import('./views/partners/createPartner/Index'))
const SetPrice = React.lazy(() => import('./views/price/set-price/Index'))
const WalletWithdrawal = React.lazy(() => import('./views/wallet-withdrawal/Index'))
const PaymentHistory = React.lazy(() => import('./views/paymentHistory/Index'))
const BankAccountSetup = React.lazy(() => import('./views/bank-account-setup/Index'))
const CustomizeWebsite = React.lazy(() => import('./views/customizeWebiste/Index'))
const Complaint = React.lazy(() => import('./views/complaint/Index'))
const PurchaseCoupon = React.lazy(() => import('./views/purchaseCoupon/Index'))
const ApproveUser = React.lazy(() => import('./views/approveUser/Index'))

const RetailerDashboard  = React.lazy(() => import('./views/retailer-dashboard/Index'))
const DistributorDashboard  = React.lazy(() => import('./views/distributor-dashboard/Index'))
const MasterDistributorDashboard  = React.lazy(() => import('./views/master-distributor-dashboard/Index'))
const AdminDashboard  = React.lazy(() => import('./views/admin-dashboard/Index'))
const MasterAdminDashboard  = React.lazy(() => import('./views/master-admin-dashboard/Index'))

const Profile = React.lazy(() => import('./views/profile/Index'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/user', name: 'User', element: Allpartners, exact: true },

  { path: '/set-price', name: 'Set Price', element: SetPrice, exact: true },
  { path: '/all-partners', name: 'Partners', element: Allpartners, exact: true },
  { path: '/create-partner', name: 'Create Partner', element: createPartner },
  { path: '/wallet-withdrawal', name: 'Wallet Withdrawal', element: WalletWithdrawal, exact: true },
  { path: '/payments-history', name: 'Payment History', element: PaymentHistory, exact: true },
  { path: '/purchase-coupon', name: 'Payment History', element: PurchaseCoupon, exact: true },
  { path: '/approve-user', name: 'Approve User', element: ApproveUser, exact: true },
  {
    path: '/bank-account-setup',
    name: 'Bank Account Setup',
    element: BankAccountSetup,
    exact: true,
  },
  { path: '/customize-website', name: 'Customize Website', element: CustomizeWebsite, exact: true },
  { path: '/complaint', name: 'Complaint', element: Complaint, exact: true },


  { path: '/retailer-dashboard', name: 'Not Found', element: RetailerDashboard ,exact: true },
  { path: '/distributor-dashboard', name: 'Not Found', element: DistributorDashboard ,exact: true },
  { path: '/master-distributor-dashboard', name: 'Not Found', element: MasterDistributorDashboard ,exact: true },
  { path: '/admin-dashboard', name: 'Not Found', element: AdminDashboard ,exact: true },
  { path: '/master-admin-dashboard', name: 'Not Found', element: MasterAdminDashboard ,exact: true },

{ path: '/profile', name: 'Profile', element: Profile ,exact: true },

{ path: '*', name: 'Not Found', element: <h1>Not Found</h1>}






  // { path: '/login' , name: 'Login', element: Login, exact: true},
  // { path: '/register' , name: 'Register', element: Register, exact: true},
]

export default routes
