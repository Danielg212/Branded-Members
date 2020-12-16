import mongoose from 'mongoose'; // MongoDB
import express, { json } from 'express'; // Backend App
import cors from 'cors'; // HTTP requests
import usersRoutes from './routes/users.js';

const app = express();
const DATABASE = 'brandedDB';
const URL = `mongodb://localhost:27017/${DATABASE}`; // I am using the mongodb community server
const PORT = 4000;
const mongodbDeprecateFix = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(URL, mongodbDeprecateFix)
  .then(() => app.listen(PORT, () => console.log(`✅ Server is running on port: ${PORT}`)))
  .catch((error) => console.warn(`❌ ${error}`));

app.use(json()); // body parse
app.use(cors()); // enable CORS
app.use('/branded-members', usersRoutes); // get & post requests
