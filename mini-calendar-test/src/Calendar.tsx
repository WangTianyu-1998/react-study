import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react'
import './index.css'

type CalendarProps = {
  value: Date
  onChange?: (date: Date) => void
}

type CalendarRef = {
  getDate: () => Date
  setDate: (date: Date) => void
}

const mouthMap = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月',
]

const Calendar: ForwardRefRenderFunction<CalendarRef, CalendarProps> = (
  props,
  ref
) => {
  const { value, onChange } = props
  const [date, setDate] = useState(new Date())

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
  }

  // 计算某月天数
  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // 计算某月第一天是星期几 0-6 0代表星期日
  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderDays = () => {
    const days = []
    // 1. 计算某月天数
    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth())
    // 2. 计算某月第一天是星期几 0-6 0代表星期日
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth())

    //  填补上个日期
    for (let i = 0; i < firstDay; i++) {
      // 计算上个月的最后一天
      const lastDayPreviousMonth = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
      ).getDate()
      // 从上个月的最后一天倒数到对应当前月第一天的星期几
      const dayToShow = lastDayPreviousMonth - firstDay + 1 + i
      days.push(
        <div key={`prev-month-day-${dayToShow}`} className="gray">
          {dayToShow}
        </div>
      )
    }
    // 4. 添加日期
    for (let i = 1; i <= daysCount; i++) {
      // 5. 添加点击事件回调
      const clickHandler = onChange?.bind(
        null,
        new Date(date.getFullYear(), date.getMonth(), i)
      )
      if (i === value.getDate()) {
        days.push(
          <div key={`day-${i}`} className="day selected" onClick={clickHandler}>
            {i}
          </div>
        )
      } else {
        days.push(
          <div key={`day-${i}`} className="day" onClick={clickHandler}>
            {i}
          </div>
        )
      }
    }
    // 填补下一月日期
    const fillNextDay = 42 - days.length
    for (let i = 1; i <= fillNextDay; i++) {
      days.push(
        <div key={`gray-${42 - i}`} className="gray">
          {new Date(date.getFullYear(), date.getMonth() + 1, i).getDate()}
        </div>
      )
    }
    // console.log({
    //   daysCount,
    //   firstDay,
    //   days,
    // })
    return days
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        getDate: () => date,
        setDate: (date: Date) => setDate(date),
      }
    },
    [date]
  )

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>

        <div>{`${date.getFullYear()}年 ${mouthMap[date.getMonth()]}`}</div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDays()}
        {/* <div className="empty"></div>
        <div className="empty"></div>
        <div className="day">1</div>
        <div className="day">2</div>
        <div className="day">3</div>
        <div className="day">4</div>
        <div className="day">5</div>
        <div className="day">6</div>
        <div className="day">7</div>
        <div className="day">8</div>
        <div className="day">9</div>
        <div className="day">10</div>
        <div className="day">11</div>
        <div className="day">12</div>
        <div className="day">13</div>
        <div className="day">14</div>
        <div className="day">15</div>
        <div className="day">16</div>
        <div className="day">17</div>
        <div className="day">18</div>
        <div className="day">19</div>
        <div className="day">20</div>
        <div className="day">21</div>
        <div className="day">22</div>
        <div className="day">23</div>
        <div className="day">24</div>
        <div className="day">25</div>
        <div className="day">26</div>
        <div className="day">27</div>
        <div className="day">28</div>
        <div className="day">29</div>
        <div className="day">30</div>
        <div className="day">31</div> */}
      </div>
    </div>
  )
}

export default forwardRef(Calendar)
