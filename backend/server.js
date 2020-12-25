import mongoose from 'mongoose'; // MongoDB
import express from 'express'; // Backend App
import dotenv from 'dotenv'; // Secures content
import cors from 'cors'; // HTTP requests
import apiRoutes from './routes/api.js';

// init app
const app = express();
dotenv.config();

// middlewares
app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: false })); // url parser
app.use(cors()); // enable http requests

// configure db --->            if you want to connect to cloud server: edit "CONNECTION_URL" in -> .env file
const DB_NAME = 'brandedDB'; // if you want to use local server: edit this "DB_NAME" (and remove the "CONNECTION_URL" from -> .env file)
const CONNECTION_URL = process.env.CONNECTION_URL || `mongodb://localhost:27017/${DB_NAME}`;
const PORT = process.env.PORT || 8080; // 8080 === development port
const DEPRECATED_FIX = { useNewUrlParser: true, useUnifiedTopology: true }; // change this with (possible) warnings on first connection

// connect to db
// mongoose connections   --->   https://mongoosejs.com/docs/connections.html
mongoose
  .connect(CONNECTION_URL, DEPRECATED_FIX) // just connect to db
  .then(() => console.log('✅ MongoDB connected')) // similiar to - mongoose.connection.on('open')
  .then(() => app.listen(PORT, () => console.log(`✅ Server listening on port: ${PORT}`))) // server is listening for requests
  .catch((error) => console.log(`❌ MongoDB: ${error}`)); // similiar to - mongoose.connection.on('error')

mongoose.set('useCreateIndex', true);

app.use('/users', apiRoutes); // get & post requests

// This helped me understand the http codes
// https://restapitutorial.com/httpstatuscodes.html

// This is where I got the mailer
// https://nodemailer.com/about/

// This is where I got a fake mailing account (it catches the mail, doesn't send it forward)
// https://ethereal.email

// Then I got an SMTP service from here
// https://www.sendinblue.com/
