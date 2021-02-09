const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel')

const getAll = async (period) => {
  try {
    const data = period.split('-')
    const results = await TransactionModel.find({
      year: data[0],
      month: data[1],
    })
    return results
  } catch (error) {
    throw new Error(error)
  }
}

const create = async (data) => {
  try {
    const dataMatrix = data.yearMonthDay.split('-')
    data.yearMonth = dataMatrix[0] + '-' + dataMatrix[1]
    data.year = Number(dataMatrix[0])
    data.month = Number(dataMatrix[1])
    data.day = Number(dataMatrix[2])
    const result = await TransactionModel.create(data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (data) => {
  try {
    const dataMatrix = data.yearMonthDay.split('-')
    data.yearMonth = dataMatrix[0] + '-' + dataMatrix[1]
    data.year = Number(dataMatrix[0])
    data.month = Number(dataMatrix[1])
    data.day = Number(dataMatrix[2])
    const result = await TransactionModel.updateOne(
      { _id: ObjectId(data._id) },
      data
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const remove = async (id) => {
  try {
    const result = await TransactionModel.deleteOne({ _id: ObjectId(id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { getAll, create, update, remove }
