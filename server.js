const express = require('express')
const DbConnect = require('./database/db')
const dotenv = require('dotenv')
const routers = require('./routes')
const app = express()
const errorHandler = require('./middleware/error')

<<<<<<< HEAD
const DischargeVoucher = require('./models/dischargeVoucher');
const PolicyNumber = require('./models/policyNumber');
const RegisterClaim = require('./models/registerClaim');

=======
dotenv.config()
DbConnect()
>>>>>>> origin/genesis

app.use(express.json())

// Hello World Route
app.get('/', (req, res) => {
  res.status(200).send('NoorTakaful Application Running Successfully')
})

// Register App Routers
require('./routes')(app)

<<<<<<< HEAD
app.use('/api/v1', routers.participantRoute);
app.use('/api/v1/auth', routers.AuthRoute);
app.use('/api/v1/policyNumber', routers.policyNumberRoutes);
app.use('/api/v1/registerClaim', routers.registerClaimRoutes);
app.use('/api/v1/dischargeVoucher', routers.dischargeVoucherRouter);



app.use(errorHandler);
=======
app.use(errorHandler)
>>>>>>> origin/genesis

const PORT =3000

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  server.close(() => process.exit(1))
})
