/*
/*
// title: Sample Router Handler
// description: "Vanlife Backend Sample Router Handler Section"
// authore : "Yeachen Abir"
// date : 24 Jun 2025
/*
*/


// dependency
const { notFound } = require("./notFound")
const { create, read, update, dataDelete, list } = require('./../../lib/data');
const { parseJSON } = require("./../../helpers/util");

// module scaffolding
const handler = {};


handler.vansHandler = (reqObj, callBack) => {
   if(["post", "get", "put", "delete"].indexOf(reqObj.method) > -1){
      handler[reqObj.method](reqObj, callBack)
   } else {
      callBack(405)
   }
}


// post 
handler.post = (reqObj, callBack) => {
   const reciveBody = reqObj.body;
   const id = typeof(reciveBody.id) === "number" ? reciveBody.id : false;
   const price = typeof(reciveBody.price) === "number" ? reciveBody.price : false;
   const type = typeof(reciveBody.type) === "string" && reciveBody.type.trim().length > 0 ? reciveBody.type : false;
   const name = typeof(reciveBody.name) === "string" && reciveBody.name.trim().length > 0 ? reciveBody.name : false;
   const description = typeof(reciveBody.description) === "string" && reciveBody.description.trim().length > 0 ? reciveBody.description : false;
   const imageUrl = typeof(reciveBody.imageUrl) === "string" && reciveBody.imageUrl.trim().length > 0 ? reciveBody.imageUrl : false;

   if(id && price && type && name && description && imageUrl){
      read("vanlife", id, (err, van) => {
         if(err) {
            const vanobj = {
               id, price, type, name, description, imageUrl
            }

            create("vanlife", id, vanobj, (err) => {
               if(!err) {
                  callBack(200, {
                     message : "Success to list"
                  }) 
               } else {
                  callBack(500, {
                     message : "Failed to list"
                  }) 
               }
            })

         } else {
            callBack(500, {
               message : "Id already exist"
            })
         }
      })
   }
}

// get 
handler.get = (reqObj, callBack) => {

   const vanId = reqObj.vanId;

   if(vanId === undefined) {
      list("vanlife", (err, allData) => {
         if(!err && allData) {
            const readPro = allData.map(item => 
               new Promise(resolve => {
                  read("vanlife", item, (err, itemData) => {
                     resolve(!err && itemData ? parseJSON(itemData) : null);
                  })
               })
            )

            Promise.all(readPro).then(dataList => {
               callBack(200, dataList);
               
            })

         } else {
            callBack(404, {
               message : "Failed to find data"
            })
         }
      })
   } else {
      read("vanlife", vanId, (err, vanData) => {
         if(!err && vanData) {
            const vanObj = parseJSON(vanData);
            callBack(200, vanObj)
         } else {
            callBack(404, {
               message : "Van was not found"
            })
         }
      })
   }
}

// put 
handler.put = (reqObj, callBack) => {
   callBack(200, {
      name : "working later"
   })
}

// delete 
handler.delete = (reqObj, callBack) => {
   callBack(200, {
      name : "working later"
   })
}

// export
module.exports = handler;