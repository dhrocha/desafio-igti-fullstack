import axios from 'axios'
import React, { useContext } from 'react'
import { Context } from '../Store'

export default function UpdateTransaction(props) {
  const [state, dispatch] = useContext(Context)

  const updateInsertData = (e) => {
    const { id, value } = e.target

    const insertData = { ...state.insertData, [id]: value }
    dispatch({
      type: 'SET_INSERT_DATA',
      payload: insertData,
    })
  }

  const saveData = async () => {
    for (let key in state.insertData) {
      if (state.insertData[key] === '') {
        alert('Preencha todos os dados')
        return false
      }
    }

    const updateData = { ...state.insertData, _id: state.updateId }

    const result = await axios.patch(
      'http://localhost:3001/api/transaction/',
      updateData
    )

    result.data._id !== ''
      ? alert('Lançamento enviado!')
      : alert('Erro ao enviar')
  }

  return (
    <div id="update-modal" className="modal">
      <div class="modal-content p7">
        <h4>Atualizar Lançamento</h4>
      </div>

      <p>
        <label>
          <input
            name="type"
            type="radio"
            value="+"
            checked={state.insertData.type === '+'}
            id="receita"
            onChange={updateInsertData}
          />
          <span>Receita</span>
        </label>
      </p>
      <p>
        <label>
          <input
            name="type"
            type="radio"
            value="-"
            checked={state.insertData.type === '-'}
            id="despesa"
            onChange={updateInsertData}
          />
          <span>Despesa</span>
        </label>
      </p>
      <p>
        <input
          type="text"
          id="description"
          value={state.insertData.description}
          placeholder="Descrição"
          onChange={updateInsertData}
        />
      </p>
      <p>
        <input
          type="text"
          id="category"
          value={state.insertData.category}
          placeholder="Categoria"
          onChange={updateInsertData}
        />
      </p>
      <p>
        <input
          type="text"
          value={state.insertData.value}
          id="value"
          placeholder="Valor"
          onChange={updateInsertData}
        />
      </p>
      <p>
        <input
          type="text"
          id="yearMonthDay"
          value={state.insertData.yearMonthDay}
          placeholder="Data"
          onChange={updateInsertData}
        />
      </p>

      <div class="modal-footer">
        <button onClick={saveData}>Salvar</button>
        <a
          href="#!"
          class="modal-action modal-close waves-effect waves-red btn red lighten-1"
        >
          Fechar
        </a>
      </div>
    </div>
  )
}
