var email = require('nodemailer');
var transporter = email.createTransport({
    server: 'qq',
    auth: {
        user: 'sgw3344@qq.com',
        pass: 'siqmfhgghmxnbjej'
    }
});
var mailOptions = {
    from:'sgw3344@qq.com',
    to:'18363997625@163.com',
}