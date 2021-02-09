import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Context } from '../Store'

const StyledDiv = styled.div`
  margin-top: 10px;
  max-width: 1280px;
  width: 90%;
`

const dateOptions = () => {
  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ]

  const options = []

  for (let i = 0; i < 36; i++) {
    const initialDate = new Date(2019, 0, 1)
    initialDate.setMonth(initialDate.getMonth() + i)
    const period =
      initialDate.getFullYear() + '-' + Number(initialDate.getMonth() + 1)
    const label =
      months[initialDate.getMonth()] + '/' + initialDate.getFullYear()
    options.push({ value: period, label: label })
  }

  return options
}

export default function Form() {
  const [state, dispatch] = useContext(Context)
  const options = dateOptions()
  const currentDate = new Date()

  useEffect(() => {
    const getInitialData = async () => {
      const period =
        currentDate.getFullYear() + '-' + Number(currentDate.getMonth() + 1)
      dispatch({
        type: 'SET_SELECT_VALUE',
        payload: period,
      })
      const data = await axios.get(
        'https://dhrocha-desafio-final.herokuapp.com/api/transaction',
        {
          params: { period: period },
        }
      )
      dispatch({ type: 'SET_DATA', payload: data.data })
    }
    getInitialData()
  }, [])

  const handleChange = async (e) => {
    dispatch({ type: 'SET_SELECT_VALUE', payload: e.target.value })
    const data = await axios.get(
      'https://dhrocha-desafio-final.herokuapp.com/api/transaction',
      {
        params: { period: e.target.value },
      }
    )
    dispatch({ type: 'SET_DATA', payload: data.data })
  }

  return (
    <StyledDiv>
      <button>{'<'}</button>
      <select
        className="browser-default"
        onChange={handleChange}
        value={state.selectValue}
      >
        {options.map((dateOption) => {
          return (
            <option key={dateOption.value} value={dateOption.value}>
              {dateOption.label}
            </option>
          )
        })}
      </select>
      <button>{'>'}</button>
    </StyledDiv>
  )
}
