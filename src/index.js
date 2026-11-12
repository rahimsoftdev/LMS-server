import express from 'express'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ success: true, message: 'Backend is running' })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
