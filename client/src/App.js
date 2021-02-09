import React from 'react'
import Data from './components/Data'
import Form from './components/Form'
import GeneralInfo from './components/GeneralInfo'
import Header from './components/Header'
import Search from './components/Search'
import Store from './Store'

export default function App() {
  return (
    <div className="container">
      <Store>
        <Header />
        <Form />
        <GeneralInfo />
        <Search />
        <Data />
      </Store>
    </div>
  )
}
