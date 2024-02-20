import { produce } from 'immer'
import { Reducer, useReducer } from 'react'

interface Data {
  a: {
    c: {
      e: number
      f: number
    }
    d: number
  }
  b: number
}

interface Action {
  type: 'add'
  num: number
}

/**
 * 注意,如果你直接修改原始的 state 返回，是触发不了重新渲染的,
 * 必须要返回一个新对象才可以,如果遇到复杂的数据机构,需要配合使用immer库
 */
function reducer(state: Data, action: Action) {
  switch (action.type) {
    case 'add':
      return produce(state, (draft) => {
        draft.a.c.e += action.num
      })
    // return {
    //   ...state,
    //   a: {
    //     ...state.a,
    //     c: {
    //       ...state.a.c,
    //       e: state.a.c.e + action.num,
    //     },
    //   },
    // }
  }
}

function App() {
  const [res, dispatch] = useReducer<Reducer<Data, Action>, string>(
    reducer,
    'zero',
    (param) => {
      return {
        a: {
          c: {
            e: 0,
            f: 0,
          },
          d: 0,
        },
        b: 0,
      }
    }
  )

  return (
    <div>
      <div onClick={() => dispatch({ type: 'add', num: 2 })}>加</div>
      <div>{JSON.stringify(res)}</div>
    </div>
  )
}

export default App
