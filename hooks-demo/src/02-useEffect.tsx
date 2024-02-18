import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
const App: FC = () => {
  // const queryData = async () => {
  //   const data: number = await new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(666)
  //     }, 2000)
  //   })
  //   return data
  // }

  // const [num, setNum] = useState<number>(0)

  // useEffect(() => {
  //   console.log('render')
  //   queryData().then((data: number) => {
  //     setNum(data)
  //   })
  // }, [])

  const [num, setNum] = useState<number>(0)

  useEffect(() => {
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
