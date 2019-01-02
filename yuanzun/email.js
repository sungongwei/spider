const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    'host': 'smtp.qq.com',
    'port':465,
    'auth': {
        user: 'sgw3344@qq.com',
        pass: 'siqmfhgghmxnbjej'
    }
});
 exports.send =function (data){
    let mailOptions = {
        'from':'sgw3344@qq.com',
        'to':'18363997625@163.com',
        'subject':data.subject, // Subject line
        // 发送text或者html格式
        // text: 'Hello world?', // plain text body
        'html': '<b>'+data.content+'</b>' // html body
      };
      
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
      });
 }
