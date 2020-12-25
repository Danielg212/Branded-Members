import mongoose from 'mongoose'; // MongoDB
import express, { json } from 'express'; // Backend App
import dotenv from 'dotenv'; // Secures content
import cors from 'cors'; // HTTP requests
import apiRoutes from './routes/api.js';

// init app
const app = express();
dotenv.config();

// middlewares
app.use(json()); // body parse
app.use(cors()); // enable http requests

// required to fix deprecation warnings with mongoose
const mongodbDeprecateFix = { useNewUrlParser: true, useUnifiedTopology: true };
// I am using the MongoDB - community server
mongoose
  .connect(process.env.URL, mongodbDeprecateFix)
  .then(() => app.listen(process.env.PORT, () => console.log(`✅ Server listening on port: ${process.env.PORT}`)))
  .catch((error) => console.log(`❌ ${error}`));
mongoose.set('useCreateIndex', true);

app.use('/branded', apiRoutes); // get & post requests

// This helped me understand the http codes
// https://restapitutorial.com/httpstatuscodes.html

// This is where I got the mailer
// https://nodemailer.com/about/

// This is where I got a fake mailing account (it catches the mail, doesn't send it forward)
// https://ethereal.email

// Then I got an SMTP service from here
// https://www.sendinblue.com/
