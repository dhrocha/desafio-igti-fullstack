import React, { useContext } from 'react'
import { Context } from '../Store'
import Item from './Item'

export default function Data() {
  const [state, dispatch] = useContext(Context)
  let count = 0

  return (
    <div>
      {state.filteredData.map((d) => {
        count += 1
        return <Item data={d} count={count} />
      })}
    </div>
  )
}
