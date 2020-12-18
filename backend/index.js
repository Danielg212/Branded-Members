import mongoose from 'mongoose'; // MongoDB
import express, { json } from 'express'; // Backend App
import dotenv from 'dotenv'; // Secures content
import cors from 'cors'; // HTTP requests
import usersRoutes from './routes/users.js';
import loginRoutes from './routes/login.js';
import registerRoutes from './routes/register.js';

const app = express();
dotenv.config();

// required to fix deprecation warnings with mongoose
const mongodbDeprecateFix = { useNewUrlParser: true, useUnifiedTopology: true };
// i am using the mongodb community server
mongoose
  .connect(process.env.URL, mongodbDeprecateFix)
  .then(() => app.listen(process.env.PORT, () => console.log(`✅ MongoDB is running on port: ${process.env.PORT}`)))
  .catch((error) => console.log(`❌ ${error}`));

app.use(json()); // body parse
app.use(cors()); // enable CORS
app.use('/branded', usersRoutes);
app.use('/branded', loginRoutes);
app.use('/branded', registerRoutes);

// This helped me understand the http codes
// https://restapitutorial.com/httpstatuscodes.html

// This is where I got the mailer
// https://nodemailer.com/about/

// This is where I got a fake mailing account (it catches the mail, doesn't send it forward)
// https://ethereal.email

// Then I got an SMTP service from here
// https://www.sendinblue.com/
