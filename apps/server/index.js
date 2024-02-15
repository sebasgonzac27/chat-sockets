import express, { Router } from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import logger from 'morgan'
import crypto from 'crypto'
const apiRouter = Router()

const app = express()
const server = createServer(app)
const io = new Server(server)

const usersInRooms = {}

io.on('connection', (socket) => {
  console.log('A user connected')

  const roomId = socket.handshake.auth.roomId
  const user = socket.handshake.auth.user
  socket.join(roomId)
  socket.to(roomId).emit('user joined', user)

  if (!usersInRooms[roomId]) {
    usersInRooms[roomId] = []
  }
  usersInRooms[roomId].push(user)

  io.in(roomId).emit('user joined', usersInRooms[roomId])

  socket.on('disconnect', () => {
    console.log('A user disconnected')
    // Eliminar el usuario del registro de la sala
    const userIndex = usersInRooms[roomId].indexOf(user)
    if (userIndex !== -1) {
      usersInRooms[roomId].splice(userIndex, 1)
    }
    io.in(roomId).emit('user left', usersInRooms[roomId])
  })

  socket.on('chat message', (msg) => {
    io.to(roomId).emit('chat message', { user, msg, date: new Date().toLocaleString() })
  })
})

apiRouter.get('/', (req, res) => {
  res.send('Chat Sockets Api')
})

apiRouter.get('/random-id', (req, res) => {
  res.json({ id: crypto.randomUUID() })
})

app.use(logger('dev'))
app.use('/', apiRouter)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
