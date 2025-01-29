/*
/*
// title: Utilities
// description: "Utilities Operation"
// authore : "Yeachen Abir"
// date : 25 Jun 2025
/*
*/


// dependencies


// app object - module scaffolding
const util = {};


// parse json string to object
util.parseJSON = (jsonString) => {
   let output = {};
   try{
      output = JSON.parse(jsonString)
   } catch {
      output={}
   }
   return output;
}


module.exports = util;