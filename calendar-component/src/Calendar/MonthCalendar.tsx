import React, { FC, useContext, useState } from 'react'
import { CalendarProps } from '.'
import { Dayjs } from 'dayjs'
import CalendarLocale from './locale/en-US'
import LocaleContext from './LocaleContext'
import allLocales from './locale'
interface MonthCalendarProps extends CalendarProps {}

const getAllDays = (date: Dayjs) => {
  // 固定42天
  const daysInfo: Array<{ date: Dayjs; currentMonth: boolean }> = new Array(
    6 * 7
  )
  // 本月天数
  const daysInMonth = date.daysInMonth()
  // 本月第一天
  const startDate = date.startOf('month')
  // 本月第一天是周几
  const week = startDate.day()
  // 算出补充的上个月的天数
  for (let i = 0; i < week; i++) {
    daysInfo[i] = {
      // 本月第一天减去需要补充的天数 = 前面显示的上个月的日期
      // date: startDate.subtract(day - i, 'day').D,
      date: startDate.subtract(week - i, 'day'),
      currentMonth: false,
    }
  }
  for (let i = week; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - week, 'day')
    daysInfo[i] = {
      // 本月第一天加上需要显示的天数 = 本月的日期
      // 4 - 4  = 0  5-4 = 1 6-4 = 2 ...在第一天的基础上增加日期
      date: calcDate,
      // 增加表示, 当前日期是否是本月的日期
      currentMonth: calcDate.month() === date.month(),
    }
  }
  return daysInfo
}

const renderDays = (
  days: Array<{ date: Dayjs; currentMonth: boolean }>,
  dateRender: MonthCalendarProps['dateRender'],
  dateInnerContent: MonthCalendarProps['dateInnerContent']
) => {
  // 将数据拆分成6行7列的jsx
  const rows = []
  for (let i = 0; i < 6; i++) {
    const row = []
    for (let j = 0; j < 7; j++) {
      console.log(i * 7 + j, '222')
      const item = days[i * 7 + j]
      console.log(item.date.date(), 'item.date.date()')
      // 每一列
      row[j] = (
        <div
          className={
            'calendar-month-body-cell ' +
            (item.currentMonth ? 'calendar-month-body-cell-current' : '')
          }
          key={j}
        >
          {/* {item.date.date()} */}
          {dateRender ? (
            dateRender(item.date)
          ) : (
            <div className="calendar-month-body-cell-date">
              <div className="calendar-month-body-cell-date-value">
                {item.date.date()}
              </div>
              <div className="calendar-month-body-cell-date-content">
                {dateInnerContent?.(item.date)}
              </div>
            </div>
          )}
        </div>
      )
    }
    rows.push(row)
  }
  console.log(rows, 'rows')
  // 每一行
  return rows.map((row, index) => (
    <div className="calendar-month-body-row" key={index}>
      {row}
    </div>
  ))
}

const MonthCalendar: FC<MonthCalendarProps> = (props: MonthCalendarProps) => {
  const { value, dateRender, dateInnerContent } = props
  const { locale } = useContext(LocaleContext)
  const CalendarLocale = allLocales[locale]
  const weekList = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]
  const allDays = getAllDays(value)
  console.log(allDays)
  return (
    <div className="calendar-month">
      {/* 星期 */}
      <div className="calendar-month-week-list">
        {weekList.map((week) => (
          <div className="calendar-month-week-list-item" key={week}>
            {CalendarLocale.week[week]}
          </div>
        ))}
      </div>
      {/* 日期 */}
      <div className="calendar-month-body">
        {renderDays(allDays, dateRender, dateInnerContent)}
      </div>
    </div>
  )
}
export default MonthCalendar
