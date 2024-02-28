import React, { FC } from 'react'
import dayjs from 'dayjs'
import Calendar from './Calendar'
const App: FC = () => {
  return (
    <div className="App">
      <Calendar
        value={dayjs(new Date())}
        className="aa"
        locale="zh-CN"
        dateInnerContent={(value) => {
          return (
            <div>
              <p style={{ background: 'yellowgreen', height: '50px' }}>
                {'下方自定义内容' + value.format('YYYY/MM/DD')}
              </p>
            </div>
          )
        }}
        onChange={(date) => {
          console.log('选择的日期是:' + date)
        }}
      />
    </div>
  )
}
export default App
