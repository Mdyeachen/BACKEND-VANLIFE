/*
/*
// title: CURD Function
// description: "CURD Function using nodejs"
// authore : "Yeachen Abir"
// date : 24 Jun 2025
/*
*/

// dependencies
const fs = require('fs')
const path = require('path');

// module scaffolding
const lib = {};

// config
lib.dir = path.join(__dirname, "./../../.Data/");


// create data
lib.create = (dir, file, data, callback) => {
   fs.open(lib.dir+dir+"/"+file+".json", "wx", (err, fileData) => {
      if(!err && fileData) {
         const stringData = JSON.stringify(data);

         fs.writeFile(fileData, stringData, (writeErr) => {
            if(!writeErr) {
               fs.close(fileData, (err) => {
                  if(!err){
                     callback(false);
                  } else {
                     callback('Error closing the file')
                  }
               })
            } else {
               callback("Error Writting to new file")
            }
         })
      } else {
         callback("Error opening to new File");
      }
   })
}

// read data
lib.read = (dir, file, callback) => {
   fs.readFile(lib.dir+dir+"/"+file+".json", "utf8", (err, readData) => {
      callback(err, readData);
   })
}

// update data
lib.update = (dir, file, data, callback) => {
   fs.open(lib.dir+dir+"/"+file+".json", "r+", (err, fileData) => {
      if(!err && fileData) {
         const stringData = JSON.stringify(data);

         fs.ftruncate(fileData, (err) => {
            if(!err) {
               fs.writeFile(fileData, stringData, (writeErr) => {
                  if(!writeErr) {
                     fs.close(fileData, (err) => {
                        if(!err){
                           callback(false);
                        } else {
                           callback('Error closing the file')
                        }
                     })
                  } else {
                     callback("Error Writting to new file")
                  }
               })

            } else {
               console.log("Error to truncate file");
            }
         })

      } else {
         callback("Error opening to new File");
      }
   })
}

// delete data
lib.dataDelete = (dir, file, callback) => {
   fs.unlink(lib.dir+dir+"/"+file+".json", (err) => {
      if(!err) {
         callback(false)
      } else {
         callback(err);
      }
   })
}

lib.list = (dir, callback) => {
   fs.readdir(lib.dir+dir, (err, data) => {
      if(!err && data && data.length > 0) {
         const allData = [];
         data.forEach(fileName => {
            allData.push(fileName.replace(".json", ""));
         })

         callback(false, allData)
      } else {
         callback("There have no files");
      }
   })
}


// export
module.exports = lib;