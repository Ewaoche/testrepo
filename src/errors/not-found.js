const ErrorResponse = require('../../utils/errorResponse')

class NotFound extends ErrorResponse {
  name = 'NotFound'
  constructor(message) {
    super(message, 404)
  }
}

module.exports = NotFound
