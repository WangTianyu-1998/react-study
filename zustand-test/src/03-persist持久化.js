import React, { useState } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useMyStore = create(
  // persist 就是同步 store 数据到 localStorage 的
  persist(
    (set) => ({
      aaa: '',
      bbb: '',
      updateAaa: (value) => set(() => ({ aaa: value })),
      updateBbb: (value) => set(() => ({ bbb: value })),
    }),
    {
      name: 'wty',
    }
  )
)

const Ccc = () => {
  const { aaa } = useMyStore()
  return <p>hello, {aaa}</p>
}

const Bbb = () => {
  return (
    <div>
      <Ccc />
    </div>
  )
}

const App = () => {
  const { aaa, updateAaa } = useMyStore()
  const [bool, setBool] = useState(false)

  /**
   * 监视器
   * 回调函数可以拿到当前 state，或者调用 store.getState 也可以拿到 state
   */
  useMyStore.subscribe((state) => {
    // console.log(useMyStore.getState())
    if (useMyStore.getState().aaa === 'aaa') {
      return setBool(true)
    }
    return setBool(false)
  })
  return (
    <div>
      <input onChange={(e) => updateAaa(e.currentTarget.value)} value={aaa} />
      {JSON.stringify(bool)}
      <Bbb />
    </div>
  )
}
export default App
