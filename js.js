let express = require("express")
let app = express()
let http = require("http")
let PORT = process.env.PORT || 3000

let server = http.createServer(app).listen(PORT)

app.get("/", function(req, res){
	res.sendFile(__dirname + '/index.html')
})

const WebSocket = require('ws');
let wss = new WebSocket.Server({server})

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
  	console.log(data)
  	let d = data
     wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(d);
      }
  });
});
})