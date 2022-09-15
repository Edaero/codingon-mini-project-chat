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

let user_list = [];

io.on("connection", (socket) => {
  console.log("Server Socket Connected");
  // 채팅 참여
  socket.on("userIn", (userId) => {
    user_list.push(userId);
    io.emit("noticeIn", userId);
    console.log(user_list);
  });

  socket.on("userOut", (userId) => {
    const user_list_filtered = user_list.filter(
      (element) => element !== userId
    );
    user_list = user_list_filtered;
    io.emit("noticeOut", userId);
    console.log(user_list_filtered);
  });

  // 메세지 전송
  socket.on("sendMsg", (data) => {
    io.emit("send", data);
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
