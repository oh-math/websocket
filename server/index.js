import Koa from "koa";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
const app = new Koa();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Listening events
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("Server is running on PORT 3001");
});
