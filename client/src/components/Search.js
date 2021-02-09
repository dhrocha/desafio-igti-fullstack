import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Store'
// Import Materialize
import M from 'materialize-css'
import AddTransaction from './AddTransaction'
import UpdateTransaction from './UpdateTransaction'

export default function Search() {
  const [state, dispatch] = useContext(Context)

  useEffect(() => {
    // Auto initialize all the things!
    M.AutoInit()
  }, [])

  const handleChange = (e) => {
    const { value } = e.target
    const filtered =
      value === ''
        ? state.data
        : state.data.filter((data) => data.description.includes(value))
    dispatch({ type: 'SET_FILTERED_DATA', payload: filtered })
    dispatch({ type: 'SET_SEARCH_TERM', payload: value })
  }

  return (
    <div>
      <a
        class="waves-effect waves-light btn teal darken-1 modal-trigger"
        href="#demo-modal"
      >
        + Novo Lançamento
      </a>
      <input type="text" value={state.searchTerm} onChange={handleChange} />
      <AddTransaction />
      <UpdateTransaction />
    </div>
  )
}
