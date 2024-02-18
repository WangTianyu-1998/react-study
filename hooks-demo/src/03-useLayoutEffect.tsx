import React, { FC, useLayoutEffect, useState } from 'react'
const App: FC = () => {
  // useLayoutEffect 是 useEffect 的一个版本，在浏览器重新绘制屏幕之前触发
  // 谨慎使用! 超过 50ms 的任务就被称作长任务，会阻塞渲染，导致掉帧
  const [num, setNum] = useState<number>(0)

  useLayoutEffect(() => {
    console.log('render')
    const timer = setInterval(() => {
      console.log(num)
    }, 1000)
    return () => {
      console.log('clear')
      clearInterval(timer)
    }
  })

  return <div onClick={() => setNum(num + 1)}>{num}</div>
}
export default App
