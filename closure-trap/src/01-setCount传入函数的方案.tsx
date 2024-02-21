import React, { FC, useEffect, useState } from 'react'

/**
 * 闭包陷阱
 * 问题：在useEffect中使用setCount(count + 1)时，count是一个闭包变量，每次都是0
 * 使用setCount(count + 1)时，count是一个闭包变量，每次都是0
 * 解决方案：使用setCount((prevCount) => prevCount + 1) 可以解决渲染时的闭包陷阱 但是打印的值还是0
 */
const App: FC = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setInterval(() => {
      setCount((count) => count + 1) // 不使用闭包中的count 而是使用上一次结果的count 渲染每次都是正确的 但是打印都是上一次的值
      console.log(count)
      // setCount(count + 1) // 渲染每次都是1 打印每次都是0 因为闭包陷阱
    }, 1000)
  }, [])

  return <div>{count}</div>
}
export default App
