const express = require('express')
const transactionRouter = express.Router()
const transactionService = require('../services/transactionService.js')

transactionRouter.get('/:period?', async (req, res) => {
  const { period } = req.query

  if (!period) {
    res.send({
      error:
        'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm',
    })
  }

  const result = await transactionService.getAll(period)

  if (result === -1) {
    res.status(500).send({ message: 'Error finding transactions' })
  }

  res.send(result)
})

transactionRouter.post('/', async (req, res) => {
  const result = await transactionService.create(req.body)
  res.send(result)
})

transactionRouter.patch('/', async (req, res) => {
  const result = await transactionService.update(req.body)
  res.send(result)
})

transactionRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const result = await transactionService.remove(id)
  res.send(result)
})

module.exports = transactionRouter
