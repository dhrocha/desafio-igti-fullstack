const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SELECT_VALUE':
      return { ...state, selectValue: action.payload }
    case 'SET_DATA':
      return { ...state, data: action.payload, filteredData: action.payload }
    case 'SET_FILTERED_DATA':
      return { ...state, filteredData: action.payload }
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload }
    case 'SET_INSERT_DATA':
      return { ...state, insertData: action.payload }
    case 'SET_UPDATE_ID':
      return { ...state, updateId: action.payload }
    default:
      return state
  }
}

export default Reducer
