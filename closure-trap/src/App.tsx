import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'

const useInterval = (
  updateCount: Function,
  time: number = 1000,
  count: number
) => {
  const countRef = useRef(updateCount)
  useLayoutEffect(() => {
    countRef.current = updateCount
    console.log(count)
  })

  useEffect(() => {
    const timer = setInterval(() => {
      countRef.current()
    }, time)
    return () => {
      clearInterval(timer)
    }
  }, [time])
}

const App: FC = () => {
  const [count, setCount] = useState(0)

  const updateCount = () => {
    setCount((prev) => prev + 1)
  }
  useInterval(updateCount, 1000, count)

  return <div>React - {count}</div>
}
export default App
