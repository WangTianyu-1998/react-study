import { ForwardRefRenderFunction, forwardRef, useEffect, useRef } from 'react'

/**
 * ref从子组件传递到父组件
 * 注意,类型第一个是ref的类型,第二个是props的类型
 * 注意,参数的顺序是props,ref
 */

// 写法1: 将forwardRef直接写在函数组件上
// const MyChild = forwardRef<HTMLInputElement>(function Child(props, inputRef) {
//   return (
//     <div>
//       <h1>Child</h1>
//       <input type="text" ref={inputRef} />
//     </div>
//   )
// })
type Props = {
  qqq: string
}
// 写法2: 先定义组件，再使用forwardRef包裹
const Child: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  props,
  inputRef
) => {
  const { qqq = '' } = props
  return (
    <div>
      <h1>Child - {qqq}</h1>
      <input type="text" ref={inputRef} />
    </div>
  )
}

const MyChild = forwardRef(Child)

function App() {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div>
      <MyChild ref={inputRef} qqq="qqq" />
    </div>
  )
}

export default App
