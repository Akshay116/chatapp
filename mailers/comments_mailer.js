const nodeMailer = require('../config/nodemailer');

// another way of exporting a method 
exports.newComment = (comment) => {
    console.log('inside comment ', comment);

    nodeMailer.transporter.sendMail({

            from: '7akshaypadmane@gmail.com',
            to: comment.user.email,
            subject: "new comment",
            html: ' <h1> Your comment is published</h1>'
        }, (err, info) => {
            if (err) {
                console.log('error in sending mail', err);
                return;
            }

            console.log('message sent', info);
            return;
        

    });
}