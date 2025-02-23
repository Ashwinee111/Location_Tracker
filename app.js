const express = require("express");
const app = express();
const path = require("path");

const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

// Socket.io connection
io.on("connection", (socket) => {
  socket.on("send-location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", () => {
    io.emit("user-disconnectd", socket.id);
  });
});

// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files correctly
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(5000, () => {
  console.log("Server Connected");
});
