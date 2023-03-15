const express = require('express');
const DbConnect = require('./database/db');
const  dotenv = require('dotenv');
const routers  =  require('./routes');
const app = express();
const errorHandler = require('./middleware/error');

const DischargeVoucher = require('./models/dischargeVoucher');
const PolicyNumber = require('./models/policyNumber');
const RegisterClaim = require('./models/registerClaim');


dotenv.config();
DbConnect();

app.use(express.json());


app.use('/api/v1', routers.participantRoute);
app.use('/api/v1/auth', routers.AuthRoute);
app.use('/api/v1/policyNumber', routers.policyNumberRoutes);
app.use('/api/v1/registerClaim', routers.registerClaimRoutes);
app.use('/api/v1/dischargeVoucher', routers.dischargeVoucherRouter);



app.use(errorHandler);

const PORT = process.env.PORT || 3000

const server = app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
  );
  
  process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
  });
  