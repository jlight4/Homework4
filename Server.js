const app = require('express')();
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const AutoComplete = require('./AutoComplete');

app.use(BodyParser.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

app.use(AutoComplete);

const passcode = fs.readFileSync('./Passcode/mongoDBpasscode.txt').toString();

(async () => {
  await Mongoose.connect(passcode, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8000);
})();
