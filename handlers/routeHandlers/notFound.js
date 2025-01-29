/*
/*
// title: Sample Router Handler
// description: "Vanlife Backend Sample Router Handler Section"
// authore : "Yeachen Abir"
// date : 24 Jun 2025
/*
*/

// module scaffolding
const handler = {};


handler.notFound = (reqObj, callBack) => {
   callBack(404, {
      message : "Page is not Found"
   })
}


// export
module.exports = handler;