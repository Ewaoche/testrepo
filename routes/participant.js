const participantControllers = require('../src/participant/participantController')
const express = require('express')
const participantRouter = express.Router()

participantRouter
  .route('/')
  .post(participantControllers.createParticipant)
  .get(participantControllers.getParticipants)

participantRouter.get('/:participantID', participantControllers.getParticipant)

module.exports = participantRouter
