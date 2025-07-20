import express from "express";
import cors from 'cors';
import { AlertRepository } from "./repositories/alertRepository.js";
import { UserRepository } from "./repositories/userReposiory.js";

export const app = express()
export const port = process.env.PORT || 3000

const alertRepository = new AlertRepository()
const userRepository = new UserRepository()


app.use(cors({
	origin: 'https://voz-ativa-front.vercel.app',
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
 
app.post('/alert', async (req, res) => {
  try {
    const novoAlerta = await alertRepository.createAlert(req.body);
    res.status(201).json(novoAlerta);
  } catch (error) {
    console.error("Erro ao criar alerta:", error);
    res.status(500).json({ error: "Erro ao criar alerta" });
  }
});

app.post('/alert/many', async(req, res) => {
  await alertRepository.createManyAlerts(req.body)
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