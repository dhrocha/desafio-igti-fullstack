import React, { useContext } from 'react'
import { formatter } from '../helpers/functions'
import { Context } from '../Store'

export default function GeneralInfo() {
  // eslint-disable-next-line
  const [state, dispatch] = useContext(Context)

  const lancamentos = state.filteredData.length
  const receitas =
    lancamentos === 0
      ? []
      : state.filteredData
          .filter((d) => d.type === '+')
          .reduce((accum, item) => accum + item.value, 0)
  const despesas =
    lancamentos === 0
      ? []
      : state.filteredData
          .filter((d) => d.type === '-')
          .reduce((accum, item) => accum + item.value, 0)
  const saldo = receitas - despesas

  return (
    <div>
      Lançamentos: {lancamentos}
      <br />
      Receitas: {formatter.format(receitas)}
      <br />
      Despesas: {formatter.format(despesas)}
      <br />
      Saldo: {formatter.format(saldo)}
    </div>
  )
}
