import React, { FC, Reducer, useEffect, useReducer } from 'react'

interface Data {
  result: number
}

type Action = {
  type: 'add'
  num: number
}

const reducer = (state: Data, action: Action) => {
  switch (action.type) {
    case 'add':
      return {
        result: state.result + action.num,
      }
    default:
      return state
  }
}

const App: FC = () => {
  const [res, dispatch] = useReducer<Reducer<Data, Action>>(reducer, {
    result: 0,
  })
  useEffect(() => {
    setInterval(() => {
      dispatch({ type: 'add', num: 1 })
    }, 1000)
  }, [])

  return <div>{JSON.stringify(res.result)}</div>
}
export default App
