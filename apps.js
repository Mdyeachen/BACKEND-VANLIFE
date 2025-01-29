/*
/*
// title: Vanlife Backend
// description: "Vanlife Backend"
// authore : "Yeachen Abir"
// date : 24 Jun 2025
/*
*/


// dependencies
const http = require('http')
const { handleReqRes } = require("./helpers/handlerReqRes");
const enviroment = require("./helpers/enviroment");

// app object - module scaffolding
const app = {};



// create server
app.createServer = () => {
   const server = http.createServer(app.handleReqRes);
   server.listen(enviroment.port, enviroment.host, () => {
      console.log(`Listening to port ${enviroment.port}`)
   })
}

// handle request response
app.handleReqRes = handleReqRes;

app.createServer()