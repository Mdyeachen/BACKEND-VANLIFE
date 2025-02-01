/*
/*
// title: Request Response
// description: "Vanlife Backend handler Request Response"
// authore : "Yeachen Abir"
// date : 24 Jun 2025
/*
*/


// dependencies
const url = require('url')
const { StringDecoder } = require("string_decoder")
const { notFound } = require("./../handlers/routeHandlers/notFound");
const routers = require('./../routers');
const { parseJSON } = require('./util')


// app object - module scaffolding
const handler = {};


// handle request response
handler.handleReqRes = (req, res) => {
   const param = {};
   
   param.parseUrl = url.parse(req.url, true);
   param.path = param.parseUrl.pathname;
   param.trimPath = param.path.replace(/^\/+|\/+$/g, '');
   param.method = req.method.toLowerCase();
   param.queryObj = param.parseUrl.query;
   param.headersObj = req.headers;


   let chosenHandler;

   // api/vans/:id routers 
   const vanId = param.trimPath.match(/^(api\/vans)\/([^/]+)$/) || [];

   if (vanId[2]){
      console.log(vanId)
      param.vanId = vanId[2];
      chosenHandler = routers[vanId[1]] || notFound;
   } else {
      console.log(param.trimPath + "Hello")
      chosenHandler = routers[param.trimPath] || notFound;
   }

   req.on("data", (buffer) => {
      param.body = new StringDecoder('utf-8').write(buffer);
   })

   req.on("end", () => {
      param.body += new StringDecoder('utf-8').end();

      param.body = parseJSON(param.body);

      
      // call the chosenHandler and send the date in client
      chosenHandler(param, (statusCode, payload) => {
         if (!res.headersSent) { // Check if headers have not been sent already
             statusCode = typeof statusCode === 'number' ? statusCode : 500;
             payload = typeof payload === 'object' ? payload : {};
             const payloadString = JSON.stringify(payload);
     
             res.setHeader('Access-Control-Allow-Origin', '*');
             res.setHeader("content-type", "application/json");
             res.writeHead(statusCode);
             res.end(payloadString);
         } else {
             console.error('Headers already sent!');
         }
     });
     
   })

}

module.exports = handler;