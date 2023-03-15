const participantControllers = require('../src/participant/participantController');
const express = require('express');
const router = express.Router();



router
.post('/CreateParticipants', participantControllers.createParticipant);

router
.get('/getParticipants', participantControllers.getParticipants);


router
  .get('/getParticipant/:id', participantControllers.getParticipant)


module.exports = router;





















