import express from "express";
import cors from 'cors';
import { AlertRepository } from "./repositories/alertRepository.js";
import { UserRepository } from "./repositories/userReposiory.js";

export const app = express()
export const port = 3001

const alertRepository = new AlertRepository()
const userRepository = new UserRepository()


app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World Guizin Rei deals!')
})

app.get('/alert', async (req, res) => {
  const filters = req.query
  const alerts = await alertRepository.getAlerts(filters)
  res.send(alerts)
})
 
app.post('/alert', async(req, res) => {
  await alertRepository.createAlert(req.body)
  res.send(201)
})

app.get('/user', async (req, res) => {
  const filters = req.body
  const users = await userRepository.getUsers(filters)
  res.send(users)
})

app.post('/user', async(req, res) => {
  await userRepository.createUser(req.body)
  res.send(201)
})