## 初始化消息的过程
- 【conn.js】handleAfterLogin()，登录后初始化本地聊天记录
- initRecentAndTeamOnLogin()，初始化左侧联系人列表、时间...
- initHistoryMsgOnLogin()，初始化哥哥联系人消息...
- ...

## 接受消息过程
- TM SDK
- 【conn.js】_handleReceiveMsg()，调用 data-sync => updateMsg 存入 DB
- 【redux】触发 addReceiveMsg

## DB
- msg表，存放消息数据，主键有时间戳和用户id