import express from "express";
import { AlertRepository } from "./repositories/alertRepository.js";

export const app = express()
export const port = 3000

const alertRepository = new AlertRepository()

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World Guizin Rei deals!')
})

app.get('/alert', async (req, res) => {
  const alerts = await alertRepository.getAlerts()
  res.send(alerts)
})

app.post('/alert', async(req, res) => {
  await alertRepository.createAlert(req.body)
  res.send(201)
})