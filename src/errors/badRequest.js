const ErrorResponse = require('../../utils/errorResponse')

class BadRequest extends ErrorResponse {
  name = 'BadRequest'
  constructor(message) {
    super(message, 400)
  }
}

module.exports = BadRequest
