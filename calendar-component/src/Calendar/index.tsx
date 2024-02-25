import React, { FC } from 'react'
import './index.scss'
import MonthCalendar from './MonthCalendar'
import { Dayjs } from 'dayjs'
import Header from './Header'

export type CalendarProps = {
  value: Dayjs
}

const Calendar: FC<CalendarProps> = (props: CalendarProps) => {
  return (
    <div className="calendar">
      <Header />
      <MonthCalendar {...props} />
    </div>
  )
}
export default Calendar
