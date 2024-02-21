import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

type PropsType = {
  count: number
  callback?: () => void
}
/**
 * 总结:
 * 如果子组件用了useMemo, 那么它传递的props就需要用useMemo,useCallback包裹,否则,每次props都会变,memo就没用了.
 * 反之,如果props使用useMemo,useCallback,但是子组件没有被memo包裹,那也没意义,因为不管props变没变都会重新渲染,只是做了无用功.
 * memo+useCallback+useMemo 是搭配来的,少了任何一个,都会使优化失效
 * 但是,useMemo和useCallback 也不只是配合memo用的:
 * useMemo: 用来缓存计算结果,避免不必要的重复计算
 */
const Child: FC<PropsType> = (props: PropsType) => {
  // 使用了 memo 之后，只有当 props.count 发生变化时，才会重新渲染 否则不会渲染
  console.log('Child Render')
  return <div>{props.count}</div>
}

// memo 是防止 props 没变时的重新渲染
// useMemo 和 useCallback 是防止 props 的不必要变化
const MemoChild = memo(Child)

const App: FC = () => {
  const [count, setCount] = useState(1)
  const [num, setNum] = useState(2)
  useEffect(() => {
    setInterval(() => {
      setCount(Math.random())
    }, 1000)
  }, [])

  const dbCount = useMemo(() => num * 2, [num])

  const handleCallBack = useCallback(() => {}, [])
  return (
    <div>
      React
      {/* 1. 给子组件套上memo后,如果传递的props不发送变化,则子组件不会再次刷新 */}
      {/* <MemoChild count={2} /> */}
      {/* 2. 传入了一个函数,此时memo失效,因为每次因为每次 function 都是新创建的，也就是每次 props 都会变，这样 memo 就没用了,此时就需要给函数加上useCallback */}
      {/* 加上useCallback后,则会再次防止props不必要的变化,从而不会刷新, 所以memo又生效了 */}
      <MemoChild count={dbCount} callback={handleCallBack} />
    </div>
  )
}
export default App
