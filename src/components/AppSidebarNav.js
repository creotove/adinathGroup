import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'
import { useSelector } from 'react-redux'

export const AppSidebarNav = ({ items }) => {
  const user = useSelector((state) => state.user.user)
  const location = useLocation()

  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const userRole = user.role ? user.role : 'Retailer' // [MasterAdmin, Admin, Master Distributor, Distributor, Retailer]

  // Filter the navigation items based on the user type
  const filteredNav = items.filter((item) => {
    if (userRole === 'Master Admin') {
      return item.isMasterAdmin
    } else if (userRole === 'Admin') {
      return item.isAdmin
    } else if (userRole === 'Master Distributor') {
      return item.isMasterDistributor
    } else if (userRole === 'Distributor') {
      return item.isDistributor
    } else if (userRole === 'Retailer') {
      return item.isRetailer
    }

    return true // Include items that don't have specific type restrictions
  })

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }

  const renderNavGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    const isActive = location.pathname.startsWith(to)

    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={isActive}
        {...rest}
      >
        {item.items?.map(
          (nestedItem, nestedIndex) =>
            nestedItem.items
              ? renderNavGroup(nestedItem, nestedIndex) // Recursively render nested groups
              : navItem(nestedItem, nestedIndex), // Render nested items
        )}
      </Component>
    )
  }

  // ...

  const renderedNav = filteredNav.map((item, index) => {
    if (item.items) {
      return renderNavGroup(item, index)
    } else {
      return navItem(item, index)
    }
  })

  return <React.Fragment>{(items && items.items && renderNavGroup) || renderedNav}</React.Fragment>
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
