import { useEffect, useState, useSyncExternalStore } from 'react'

const createStore = (createState) => {
  let state
  const listeners = new Set()

  /**
   *
   * @param {*} partial 就是 () => ({ aaa: value } 或者 { aaa: value })
   * @param {*} replace
   */
  const setState = (partial, replace) => {
    console.log(
      {
        partial,
        replace,
      },
      'setState'
    )
    const nextState = typeof partial === 'function' ? partial(state) : partial
    console.log(
      {
        nextState,
        state,
      },
      '123'
    )
    if (!Object.is(nextState, state)) {
      const previousState = state
      console.log(previousState, 'previousState')
      if (!replace) {
        state =
          typeof nextState !== 'object' || nextState === null
            ? nextState
            : Object.assign({}, state, nextState)
      } else {
        state = nextState
      }
      listeners.forEach((listener) => listener(state, previousState))
      console.log(listeners, 'listeners')
    }
  }

  const getState = () => state

  const subscribe = (listener) => {
    listeners.add(listener)
    console.log(() => listeners.delete(listener), '????')
    return () => listeners.delete(listener)
  }

  const destroy = () => {
    listeners.clear()
  }

  const api = { setState, getState, subscribe, destroy }

  state = createState(setState, getState, api)

  return api
}

/**
 * 重新渲染
 * 判断listeners是否一致,如果不一致则进行重新渲染,然后给状态添加一个随机数
 * @param {*} api
 * @param {*} selector
 * @returns
 */
function useStore(api, selector) {
  function getState() {
    return selector(api.getState())
  }
  return useSyncExternalStore(api.subscribe, getState)

  // const [, forceRender] = useState(0)
  // useEffect(() => {
  //   // 这里为什么有新值和旧值?
  //   console.log(api.subscribe, 'subscribe')
  //   api.subscribe((state, prevState) => {
  //     console.log({ state, prevState }, 'state, prevState')
  //     const newObj = selector(state)
  //     const oldobj = selector(prevState)

  //     if (newObj !== oldobj) {
  //       forceRender(Math.random())
  //     }
  //   })
  // }, [])
  // return selector(api.getState())
}

export const create = (createState) => {
  const api = createStore(createState)
  console.log(api, 'api')

  const useBoundStore = (selector) => useStore(api, selector)

  Object.assign(useBoundStore, api)
  console.log(useBoundStore, '+', createState, 'useBoundStore')

  return useBoundStore
}
