import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ReactTyped from 'react-typed'

const Greetings = ({ user }) => {
  const [greeting, setGreeting] = useState('')
  const typeWriter = {
    overflow: 'hidden' /* Ensures the content is not revealed until the animation */,
    borderRight: '.15em solid orange' /* The typwriter cursor */,
    whiteSpace: 'nowrap' /* Keeps the content on a single line */,
    margin: '0 auto' /* Gives that scrolling effect as the typing happens */,
    letterSpacing: '.15em' /* Adjust as needed */,
    animation: 'typing 3.5s steps(40, end),blink-caret .75s step-end infinite',
  }
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
        Hello, {user.name} <ReactTyped strings={[greeting]} typeSpeed={200} loop />{' '}
      </h5>
    </div>
  )
}

export default Greetings
Greetings.propTypes = {
  user: PropTypes.object,
}
