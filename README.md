![image](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe63dfabc-3ec8-44e9-a0dc-46b118eb693c%2FUntitled.png?table=block&id=8231027c-e4fd-4364-8523-f20980191403&spaceId=6e9ffcdf-452b-494c-a455-03f79451456b&width=1640&userId=b30b4534-c8a0-4959-9f96-2c49d1a62326&cache=v2)
# 채팅 웹 - Socket
- [KDT - 미니 프로젝트](https://joodeng.notion.site/joodeng/Joo-Young-Lee-61db50959426458db50275c985d2de2a?p=8231027ce4fd43648523f20980191403&pm=c)

- 20220914 ~ 20220916
- Use: HTML, CSS, JavaScript, Node.js, Socket.io
## 구현 기능
> ### 채팅 로그인
<img src="https://user-images.githubusercontent.com/99079176/201666648-3f024a69-dd52-4ff7-aaed-6b95cbf17bbe.gif" width="500" height="300"/>

- 참여 유저 박스와 비교해 닉네임 중복 검사
- 유저 참여 시, io.emit으로 채팅방 전체 유저에게 입장 알림 표시 및 참여 유저 박스에 닉네임 생성
- 유저 참여 시 마다 채팅방 전체 참여 인원의 length만큼 표시
> ### 실시간 채팅
<img src="https://user-images.githubusercontent.com/99079176/201666804-8c45ae9c-0728-4597-a2de-181b20bff303.gif" width="500" height="300"/>

- socket을 통한 실시간 채팅 구현
- io.to(유저닉네임).emit을 이용해 특정 대상에게만 보내는 DM 구현
> ### 채팅 나가기
<img src="https://user-images.githubusercontent.com/99079176/201666827-cd70d5be-cd2a-4ff4-bb02-44d8037b7603.gif" width="500" height="300"/>

- 나가기 버튼으로 나가거나 페이지 새로 고침 시 socket disconnect를 사용해 클라이언트 삭제 - (UI 적용)
