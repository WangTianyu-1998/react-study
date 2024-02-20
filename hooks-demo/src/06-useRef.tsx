import { useEffect, useRef, useState } from 'react'

function App() {
  /**
   * 获取dom
   * @returns
   */
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  /**
   * ref保存的值不会触发重新渲染
   */
  const numRef = useRef<number>(0)
  // const handleClick = () => {
  //   numRef.current += 1
  // }

  /**
   * 如果要出发渲染则需要配合useState
   * 此时打印的值是最新的
   */
  const [, forceRender] = useState(0)
  const handleClick = () => {
    numRef.current += 1
    // forceRender((num) => num + 1)
    forceRender(Math.random())
    console.log(numRef.current) // 打印的值是最新的
  }

  return (
    <div>
      <input type="text" ref={inputRef} />
      <div>
        {numRef.current} - <button onClick={handleClick}>add</button>
      </div>
    </div>
  )
}

export default App
