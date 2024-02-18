import { FC, Reducer, useReducer } from 'react'
interface Data {
  result: number
}
interface Action {
  type: 'add' | 'minus'
  num: number
}
/**
 * useReducer的类型参数传入Reducer<数据类型,action类型>
 * 然后第一个参数是reducer,第二个参数是初始数据
 * 点击添加的时候,触发add的action,点击减的时候,触发minus的action
 * @returns
 */
const reducer = (state: Data, action: Action) => {
  switch (action.type) {
    case 'add':
      return {
        result: state.result + action.num,
      }
    case 'minus':
      return {
        result: state.result - action.num,
      }
  }
}

const App: FC = () => {
  // 基本写法
  // const [res, dispatch] = useReducer(reducer, { result: 0 })

  // 另外一种重载,通过函数来创建初始数据,这之后useReducer第二个参数就是传给这个函数的参数
  // 并且在类型参数中也需要传入它的类型 string => zero
  const [res, dispatch] = useReducer<Reducer<Data, Action>, string>(
    reducer,
    'zero',
    (params) => {
      return {
        result: params === 'zero' ? 100 : 1,
      }
    }
  )
  return (
    <div>
      <div onClick={() => dispatch({ type: 'add', num: 2 })}>加</div>
      <div onClick={() => dispatch({ type: 'minus', num: 1 })}>减</div>
      <div>{res.result}</div>
    </div>
  )
}
export default App
