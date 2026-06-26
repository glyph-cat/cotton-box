import { StateManager } from 'cotton-box'
import { useStateValue } from 'cotton-box-react'
import { produce } from 'immer'
import { ReactNode, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import styles from './index.module.css'

interface ITodoItem {
  id: string
  label: string
  isCompleted: boolean
}

const TodoItemsState = new StateManager<Array<ITodoItem>>([])

export default function App(): ReactNode {

  const items = useStateValue(TodoItemsState)
  useEffect(() => {
    (async () => {
      const fetchedItems = await fetchTodoItems()
      TodoItemsState.set(fetchedItems)
    })()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <ItemCount />
        <ul className={styles.list}>
          {items.map((item, index) => {
            return (
              <li key={item.id}>
                <input
                  type='checkbox'
                  checked={item.isCompleted}
                  onChange={() => {
                    TodoItemsState.set((prevList) => {
                      return produce(prevList, (nextList) => {
                        nextList[index].isCompleted = !nextList[index].isCompleted
                        return nextList
                      })
                    })
                  }}
                />
                <input
                  type='text'
                  value={item.label}
                  placeholder='(New item)'
                  onChange={(e) => {
                    TodoItemsState.set((prevList) => {
                      return produce(prevList, (nextList) => {
                        nextList[index].label = e.target.value
                        return nextList
                      })
                    })
                  }}
                />
                <button data-type='delete' onClick={() => {
                  TodoItemsState.set((prevList) => {
                    return produce(prevList, (nextList) => {
                      nextList.splice(index, 1)
                      return nextList
                    })
                  })
                }}>×</button>
              </li>
            )
          })}
          <li>
            <button data-type='add' onClick={() => {
              TodoItemsState.set((prevList) => {
                return produce(prevList, (nextList) => {
                  nextList.push({
                    id: uuid(),
                    label: '',
                    isCompleted: false,
                  })
                  return nextList
                })
              })
            }}>+ New item</button>
          </li>
        </ul>
      </div>
    </div>
  )

}

function ItemCount(): ReactNode {
  const completedItemCount = useStateValue(
    TodoItemsState,
    (list) => list.filter((item) => item.isCompleted).length
  )
  return (
    <span className={styles.completedItemCount}>
      Completed: {completedItemCount}
    </span>
  )
}

// Simulate fetching data from server
async function fetchTodoItems(): Promise<Array<ITodoItem>> {
  return [
    {
      id: uuid(),
      label: 'Buy groceries',
      isCompleted: true,
    },
    {
      id: uuid(),
      label: 'Water plants',
      isCompleted: false,
    },
    {
      id: uuid(),
      label: 'Clean balcony',
      isCompleted: false,
    },
  ]
}
