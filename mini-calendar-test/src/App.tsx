import React, { FC, forwardRef, useEffect, useRef, useState } from 'react'
import './index.css'
import Calendar from './Calendar'

const App: FC = (props) => {
  const handleChange = (value: Date) => {
    console.log(value, 'click')
    alert(value.toLocaleDateString())
  }
  const calendarRef = useRef<{
    getDate: () => Date
    setDate: (date: Date) => void
  }>(null)

  useEffect(() => {
    console.log(calendarRef.current?.getDate())
  }, [])

  return (
    <div>
      <Calendar
        ref={calendarRef}
        value={new Date()}
        onChange={(value) => handleChange(value)}
      />
    </div>
  )
}

export default App
