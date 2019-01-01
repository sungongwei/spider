const email  = require('./email');
var data = {
    'subject':'hello',
    'content': 'i am groot',
}
email.send(data);