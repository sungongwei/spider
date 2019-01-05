const email  = require('./email');
const schedule  = require('node-schedule');
var data = {
    'subject':'hello',
    'content': 'i am groot',
}
// email.send(data);
schedule.scheduleJob('0 */1 0-2,15-16 * * *',()=>{
    console.log('ha ha ha ha '+Date.now());
});