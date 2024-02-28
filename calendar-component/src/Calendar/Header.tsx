import { Dayjs } from 'dayjs'
import { FC, useContext } from 'react'
import LocaleContext from './LocaleContext'
import allLocales from './locale'

type HeaderProps = {
  value: Dayjs
  prevMonthHandler: () => void
  nextMonthHandler: () => void
  toDayHandler: () => void
}

const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const { value, nextMonthHandler, prevMonthHandler, toDayHandler } = props
  const { locale } = useContext(LocaleContext)
  const CalendarContext = allLocales[locale]
  return (
    <div className="calendar-header">
      <div className="calendar-header-left">
        <div className="calendar-header-icon" onClick={prevMonthHandler}>
          &lt;
        </div>
        <div className="calendar-header-value">
          {value.format(CalendarContext.formatMonth)}
        </div>
        <div className="calendar-header-icon" onClick={nextMonthHandler}>
          &gt;
        </div>
        <button className="calendar-header-btn" onClick={toDayHandler}>
          {CalendarContext.today}
        </button>
      </div>
    </div>
  )
}

export default Header
