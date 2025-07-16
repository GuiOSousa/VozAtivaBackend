import express from "express";
import { AlertRepository } from "./repositories/alertRepository.js";

export const app = express()
export const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World Guizin Rei deals!')
})

app.get('/alert', async (req, res) => {
  const alertRepository = new AlertRepository()
  const alerts = await alertRepository.getAlerts()
  res.send(alerts)
})