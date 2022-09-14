const { name } = require("ejs");
const express = require("express");
const { emit } = require("process");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

io.on("connection", (socket) => {
  console.log("Server Socket Connected");
  // io.emit("notice", `방가방가! ${soket.id}님이 대화에 입장하셨습니다.`);

  socket.on("submit", (msg) => {
    socket.broadcast.emit("submit", msg);
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

const port = 8000;

// http로 열어야하기 때문에 app을 http로 바꿔준다.
http.listen(port, () => {
  console.log("server open", port);
});
