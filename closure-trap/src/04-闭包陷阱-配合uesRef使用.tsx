import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * 通过useRef创建ref对象,保存执行的函数,每次渲染在useLayoutEffect中更新ref.current的值为最新的函数
 * 这样,定时器执行的函数就始终引用的是最新的count
 * useEffect只跑一次,保证interval不会重置,是每秒执行一次
 * 执行的函数是从countRef.current中获取的,这个函数每次渲染都会更新,引用最新的count
 * useLayoutEffect是在渲染前同步执行的,用这个hook能保证在所有的useEffect之前执行
 */
const App: FC = () => {
  const [count, setCount] = useState(0)

  const updateCount = () => {
    setCount((prev) => prev + 1)
  }

  const countRef = useRef(updateCount)

  useLayoutEffect(() => {
    countRef.current = updateCount
    console.log(count) // 每次都是最新的值
  })

  useEffect(() => {
    const timer = setInterval(() => {
      countRef.current()
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return <div>React - {count}</div>
}
export default App
