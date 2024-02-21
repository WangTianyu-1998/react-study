import { useEffect, useState } from 'react'

/**
 * 不推荐使用
 */
function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(count)

    const timer = setInterval(() => {
      setCount(count + 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [count])

  return <div>{count}</div>
}

export default App
