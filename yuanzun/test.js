const email  = require('./email');
const schedule  = require('node-schedule');
var data = {
    'subject':'hello',
    'content': 'i am groot',
}
// email.send(data);
schedule.scheduleJob('*/3 2-10 15-16 * * *',()=>{
    console.log('ha ha ha ha '+Date.now());
});