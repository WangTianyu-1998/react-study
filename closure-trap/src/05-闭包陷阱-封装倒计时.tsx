import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'

const useInterval = (
  updateCount: Function,
  time: number = 1000,
  count: number
) => {
  const countRef = useRef(updateCount)
  useLayoutEffect(() => {
    countRef.current = updateCount
  })

  useEffect(() => {
    const timer = setInterval(() => {
      countRef.current()
    }, time)
    return () => {
      clearInterval(timer)
    }
  }, [time])

  return count
}

const App: FC = () => {
  const [count, setCount] = useState(0)

  const updateCount = () => {
    setCount((prev) => prev + 1)
  }
  const myCount = useInterval(updateCount, 1000, count)
  console.log(myCount)

  return <div>React - {count}</div>
}
export default App
