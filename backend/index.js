import mongoose from 'mongoose'; // MongoDB
import express, { json } from 'express'; // Backend App
import dotenv from 'dotenv'; // Secures content
import cors from 'cors'; // HTTP requests
import usersRoutes from './routes/users.js';

const app = express();
dotenv.config();

// required to fix deprecation warnings with mongoose
const mongodbDeprecateFix = { useNewUrlParser: true, useUnifiedTopology: true };
// i am using the mongodb community server
mongoose
  .connect(process.env.URL, mongodbDeprecateFix)
  .then(() => app.listen(process.env.PORT, () => console.log(`✅ Server is running on port: ${process.env.PORT}`)))
  .catch((error) => console.log(`❌ ${error}`));

app.use(json()); // body parse
app.use(cors()); // enable CORS
app.use('/branded', usersRoutes); // get & post requests
