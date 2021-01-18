import mongoose from 'mongoose'; // MongoDB (database)
import express from 'express'; // Backend App (server)
import cors from 'cors'; // HTTP headers (enable requests)
import morgan from 'morgan'; // Logs incoming requests
import helmet from 'helmet'; // Secures response headers
import dotenv from 'dotenv'; // Secures content
import usersRoutes from './api/routes/users.js';

// init app
const app = express();

// middlewares
app.use(express.json()); // body parser
app.use(express.urlencoded()); // url parser
app.use(cors()); // enable http requests
app.use(morgan('common')); // logs requests
app.use(helmet()); // protect response headers
dotenv.config();

// configure db:
// if you want to connect to cloud server (atlas): edit "CONNECTION_URL" in -> .env file
// if you want to use local server (community): edit "DB_NAME"
const DB_NAME = 'brandedDB';
const CONNECTION_URL = process.env.CONNECTION_URL || `mongodb://localhost:27017/${DB_NAME}`;
const PORT = process.env.PORT || 8080; // 8080 === development port
const DEPRECATED_FIX = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }; // update this with (possible) deprecated warnings

// connect to db
mongoose
  .connect(CONNECTION_URL, DEPRECATED_FIX)
  .catch((error) => console.log('❌ MongoDB connection error', error)); // listen for errors on initial connection
mongoose.connection.on('connected', () => console.log('✅ MongoDB connected')); // connected
mongoose.connection.on('disconnected', () => console.log('❌ MongoDB disconnected')); // disconnected
mongoose.connection.on('error', (error) => console.log('❌ MongoDB connection error', error)); // listen for errors after the connection is established (errors during the session)

// routes
app.get('/', (request, response, next) => response.send('Hello Developer :)'));
app.use('/api/v1/users', usersRoutes);

// server is listening for requests
app.listen(PORT, () => console.log(`✅ Server is listening on port: ${PORT}`));
