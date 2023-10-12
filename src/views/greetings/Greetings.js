import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Greetings = ({ user }) => {
  const [greeting, setGreeting] = useState('')

  function getGreeting() {
    const date = new Date()
    const hour = date.getHours()
    if (hour < 12) return setGreeting('Good Morning')
    if (hour < 18) return setGreeting('Good Afternoon')
    return setGreeting('Good Evening')
  }
  useEffect(() => {
    getGreeting()
  }, [])
  return (
    <div>
      <h5>
        Hello, {user.name} {greeting}
      </h5>
    </div>
  )
}

export default Greetings
Greetings.propTypes = {
  user: PropTypes.object,
}
