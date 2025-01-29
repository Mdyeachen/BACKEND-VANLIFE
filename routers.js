/*
/*
// title: Vanlife Router
// description: "Vanlife Backend Router Section"
// authore : "Yeachen Abir"
// date : 24 Jun 2025
/*
*/

// dependencies
const { vansHandler } = require('./handlers/routeHandlers/vans');


const routers = {
   "api/vans" : vansHandler
}

module.exports = routers;