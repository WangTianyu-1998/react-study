import React, {
  FC,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

type RefType = {
  handleFocus: () => void
}

type PropsType = {
  name: string
}

const MyChild: ForwardRefRenderFunction<RefType, PropsType> = (props, ref) => {
  const { name } = props
  /**
   * 在子组件暴露对应的方法给父组件使用
   */
  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * 类似vue中的暴露方法给父组件使用
   */
  useImperativeHandle(
    ref,
    () => {
      return {
        handleFocus() {
          inputRef.current?.focus()
        },
      }
    },
    [inputRef]
  )

  return (
    <>
      <h1>我是child组件 - {name}</h1>
      <input type="text" ref={inputRef} />
    </>
  )
}

const Child = React.forwardRef(MyChild)

const App: FC = () => {
  const inputRef = useRef<RefType>(null)

  useEffect(() => {
    inputRef.current?.handleFocus()
  }, [])

  return (
    <div>
      React
      <Child ref={inputRef} name="父组件传递来的数据" />
    </div>
  )
}
export default App
