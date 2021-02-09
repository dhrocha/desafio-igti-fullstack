import axios from 'axios'
import React, { useContext } from 'react'
import { formatter } from '../helpers/functions'
import { Context } from '../Store'

export default function Item(props) {
  const { data, count } = props
  const initialClass = `card-panel lighten-2 row`
  const cardColor = data.type === '-' ? 'red' : 'teal'
  const cardClass = `${initialClass} ${cardColor}`
  const [state, dispatch] = useContext(Context)

  const handleDelete = async () => {
    const result = await axios.delete(
      'http://localhost:3001/api/transaction/' + data._id
    )
    console.log(result)
  }

  const handleUpdate = () => {
    const insertData = {
      type: data.type,
      description: data.description,
      category: data.category,
      value: data.value,
      yearMonthDay: data.yearMonthDay,
    }
    const updateId = data._id
    dispatch({ type: 'SET_INSERT_DATA', payload: insertData })
    dispatch({ type: 'SET_UPDATE_ID', payload: updateId })
  }

  return (
    <div class={cardClass}>
      <div class="col s1">{count}</div>
      <div class="col s7">
        <b>{data.category}</b>
        <br />
        {data.description}
      </div>
      <div class="col s2 right-align">{formatter.format(data.value)}</div>
      <div class="col s1">
        <a href="#update-modal" className="modal-trigger">
          <i class="material-icons" onClick={handleUpdate}>
            create
          </i>
        </a>
      </div>
      <div class="col s1">
        <i class="material-icons" onClick={handleDelete}>
          delete
        </i>
      </div>
    </div>
  )
}
