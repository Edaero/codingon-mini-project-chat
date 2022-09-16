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

let user_list = {};

io.on("connection", (socket) => {
  // 채팅 참여
  socket.on("userIn", (userId) => {
    // 닉네임 중복 방지
    // user_list의 값을 가져온다.
    if (Object.values(user_list).indexOf(userId) > -1) {
      socket.emit("idError", "이미 존재하는 사용자입니다.");
    } else {
      user_list[socket.id] = userId;
      io.emit("noticeIn", user_list[socket.id]);
      socket.emit("idSuccess", "채팅방 입장 !");
      // 모든 유저를 보내줌
      io.emit("allUserIn", user_list);
    }
  });

  // 나가기 버튼
  socket.on("userOut", (id) => {
    io.emit("noticeOut", id);
    delete user_list[socket.id];
  });

  // 클라이언트 삭제 코드
  socket.on("disconnect", () => {
    io.emit("userDisconnect", user_list[socket.id]);
    delete user_list[socket.id];
  });

  // 메세지 전송
  socket.on("sendMsg", (data) => {
    io.emit("send", data);
    if (data.dm == "all") {
      io.emit("send", data.msg);
    } else {
      io.to(data.dm).emit("send", data.msg);
      socket.emit("send", data.msg);
    }
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
