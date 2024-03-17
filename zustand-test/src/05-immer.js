import { create } from 'zustand'
import { produce } from 'immer'

// 创建状态管理器
const useStore = create((set) => ({
  obj: {
    name: 'zs',
    house: {
      city: 'beijing',
      area: 100,
    },
  },
  changeHouse: (name) =>
    set(
      produce((state) => {
        console.log(state)
        state.obj.house.city = name
      })
    ),
  addArea: () =>
    set(
      produce((state) => {
        state.obj.house.area++
      })
    ),
}))

useStore.subscribe((state) => {
  console.log(useStore.getState())
})

function TodoList() {
  const { obj, changeHouse, addArea } = useStore()
  return (
    <div>
      {JSON.stringify(obj)}
      <button onClick={() => changeHouse('大房子')}>Add Todo</button>
      <button onClick={() => addArea()}>Add Area</button>
    </div>
  )
}

export default TodoList
