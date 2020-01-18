const schedule = require('node-schedule');
const spamc = require('spamc');
const request = require('request');

console.log("hi");

schedule.scheduleJob('*/1 * * * *', function() {
request.get('https://s3rdf9bxgg.execute-api.us-east-2.amazonaws.com/deploy/all', function (err,response,body) {
  console.info(typeof response);
  })
    
});