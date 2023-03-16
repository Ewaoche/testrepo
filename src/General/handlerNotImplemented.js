const handlerNotImplemented = async (req, res, next) => {
  res.status(200).json({
    status: 'pending',
    endpoint: req.originalUrl,
    method: req.method,
    message:
      process.env.NODE_ENV === 'production'
        ? 'Coming soon!'
        : 'Controller not Yet Implemented',
  })
}

module.exports = handlerNotImplemented
