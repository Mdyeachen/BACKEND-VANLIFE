/*
/*
// title: vanlife enviroment
// description: "enviroment of vanlife backend"
// authore : "Yeachen Abir"
// date : 25 Jun 2025
/*
*/


// dependencies


// app object - module scaffolding
const env = {};


// staging
env.staging = {
   port : 3001,
   host : '0.0.0.0',
   envName : "staging"
}

// production
env.production = {
   port : 3001,
   host : '0.0.0.0',
   envName : "production"
}

env.currentEnv = typeof(process.env.NODE_ENV) === "string" ? process.env.NODE_ENV : "staging";

const enviroment = typeof(env[env.currentEnv]) === "object" ? env[env.currentEnv] : env[staging];


module.exports = enviroment;