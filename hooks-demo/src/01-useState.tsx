import React, { FC, useState } from 'react'
const App: FC = () => {
  const [num, setNum] = useState(0)
  const [num1, setNum1] = useState(() => {
    const numa = 1 + 2
    const numb = 2 + 3
    return numa + numb
  })
  return (
    <div>
      {num}
      <button onClick={() => setNum(num + 1)}>change</button>
      <hr />
      {num1}
      {/* <button onClick={() => setNum1(num1 + 1)}>change1</button> */}
      <button onClick={() => setNum1((prevNum) => prevNum + 1)}>change1</button>
    </div>
  )
}
export default App
