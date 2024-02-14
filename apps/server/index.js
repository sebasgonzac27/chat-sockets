import express, { Router } from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import logger from 'morgan'
const apiRouter = Router()

const app = express()
const server = createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})

apiRouter.get('/', (req, res) => {
  res.send('Chat Sockets Api')
})

app.use(logger('dev'))
app.use('/api', apiRouter)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
