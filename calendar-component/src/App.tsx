import React, { FC } from 'react'
import dayjs from 'dayjs'
import Calendar from './Calendar'
const App: FC = () => {
  return (
    <div className="App">
      <Calendar value={dayjs(new Date())} />
    </div>
  )
}
export default App
