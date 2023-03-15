const express = require('express');
const DbConnect = require('./database/db');
const  dotenv = require('dotenv');
const routers  =  require('./routes');
const cors = require('cors');
const app = express();
const errorHandler = require('./middleware/error');


dotenv.config();
DbConnect();

app.use(express.json());
app.use(cors());


app.use('/api/v1', routers.participantRoute);
app.use('/api/v1', routers.PolicyRoute);
app.use('/api/v1', routers.MotorPolicyItem);
app.use('/api/v1', routers.MarinePolicyItem);
app.use('/api/v1/auth', routers.AuthRoute);
app.use(errorHandler);

const PORT = process.env.PORT || 3000

const server = app.listen();
// const server = app.listen(
//     PORT,
//     console.log(
//       `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
//   );
  
  // process.on('unhandledRejection', (err, promise) => {
  //   console.log(`Error: ${err.message}`);
  //   server.close(() => process.exit(1));
  // });
  