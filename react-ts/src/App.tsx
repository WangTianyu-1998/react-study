import { ReactElement, ReactNode } from 'react'

/**
 * 1. ReactElement 就是 jsx 类型
 * 2. ReactNode 包含 ReactElement、或者 number、string、null、boolean 等可以写在 JSX 里的类型。 这三个类型的关系 ReactNode > ReactElement > JSX.Element。 所以，一般情况下，如果你想描述一个参数接收 JSX 类型，就用 ReactNode 就行。
 */
interface AaaProps {
  name: string
  // content: ReactElement
  content: ReactNode
}

function Aaa(props: AaaProps) {
  return (
    <div>
      aaa, {props.name}
      {props.content}
    </div>
  )
}

function App() {
  return (
    <div>
      <Aaa name="guang" content={'222'}></Aaa>
    </div>
  )
}

export default App
