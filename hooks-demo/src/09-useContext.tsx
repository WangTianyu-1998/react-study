import React, { FC, createContext, useContext, useState } from 'react'

// 创建一个上下文
const countContext = createContext({
  count: 0,
  setCount: (count: number) => {},
})

const App: FC = () => {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }
  return (
    // 使用上下文 传递状态和方法等
    <countContext.Provider value={{ count, setCount }}>
      father - {count} - <button onClick={handleClick}>add</button>
      <Child />
    </countContext.Provider>
  )
}
export default App

const Child: FC = () => {
  const { count, setCount } = useContext(countContext)

  return (
    <div>
      Child - {count} - <button onClick={() => setCount(count + 1)}>add</button>
      <GandSon />
    </div>
  )
}

const GandSon: FC = () => {
  const { count, setCount } = useContext(countContext)
  return (
    <div>
      GandSon - {count} -{' '}
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  )
}
