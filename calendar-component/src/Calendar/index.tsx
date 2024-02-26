import React, { CSSProperties, FC, ReactNode } from 'react'
import './index.scss'
import MonthCalendar from './MonthCalendar'
import { Dayjs } from 'dayjs'
import Header from './Header'
import cs from 'classnames'
import LocaleContext from './LocaleContext'

export type CalendarProps = {
  value: Dayjs
  style?: CSSProperties
  className?: string | string[]
  // 定制日期显示,会完全覆盖日期单元格,例如农历,日程安排等
  dateRender?: (currentDate: Dayjs) => ReactNode
  // 定制日期单元格,内容会被添加到单元格内,只会在日期的数字下添加一些内容,只在全屏日历模式下生效
  dateInnerContent?: (currentDate: Dayjs) => ReactNode
  // 国际化相关
  locale?: 'zh-CN' | 'en-US'
  // 选择了日期之后会触发的回调
  onChange?: (date: Dayjs) => void
}

const Calendar: FC<CalendarProps> = (props: CalendarProps) => {
  const { value, style, className, locale } = props

  // 合并css
  const classNames = cs('calendar', className)

  return (
    <LocaleContext.Provider
      value={{
        // locale 是否存在 不存在就使用系统默认语言
        locale: locale || navigator.language,
      }}
    >
      <div className={classNames} style={style}>
        <Header />
        <MonthCalendar {...props} />
      </div>
    </LocaleContext.Provider>
  )
}
export default Calendar
