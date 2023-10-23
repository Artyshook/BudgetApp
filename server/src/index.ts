import express from 'express';
import cors from 'cors';
import http, { Server } from 'http';
import { AddressInfo } from 'net';
import './db/mongoose';
import transactionRoutes from "./routes/transactionRoutes";
import authenticationRoutes from "./routes/authenticationRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.use('/', transactionRoutes);
app.use('/', authenticationRoutes);
app.use('/', userRoutes);

const server: Server = http.createServer(app);
server.listen(5004, () => {
  const address = server.address() as AddressInfo;
  const port = address.port;
  console.log(`Server running on http://localhost:${port}/`);
});
