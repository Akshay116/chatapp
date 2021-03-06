const nodemailer = require('nodemailer');
// const SMTPTransport = require('nodemailer/lib/smtp-transport');
const ejs = require('ejs');
const path = require('path');


let transporter = nodemailer.createTransport({
    service : 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth:{
        user: 'aksy123',
        pass: 'aaapwp'
    }

});

let renderTemplate = (data,relativePath) => {
      let mailHtml;
      ejs.renderFile(
            path.join(__dirname,'../views/mailers',relativePath),
            data,
            function(err,template){
             if(err){
                 console.log('error in rendring template');
                 return;
             }
             mailHtml = template;
            }

      
      )
    return mailHtml;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}