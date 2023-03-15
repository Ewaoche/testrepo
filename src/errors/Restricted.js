const ErrorResponse = require('../../utils/errorResponse')

class RestrictedError extends ErrorResponse {
  name = 'RestrictedError'
  constructor(message) {
    super(message, 403)
  }
}

module.exports = RestrictedError
