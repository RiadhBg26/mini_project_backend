
const nodeMailer =  require('nodemailer');

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 4000,
    auth: {
        user: 'myemail',
        pass:'***********'
    },
    tls: {
        rejectUnauthorized: false
    }
});

const HelperOptions = {
    from: 'myemail',
    to: 'myemail',
    subject: 'Sending an email with nodemailer',
    text: 'Everything is working fine',
    html: "<b>Good work !</b>"
};

transporter.sendMail(HelperOptions, function(error, info){
    if(error) {
        console.log(error);   
    } else {
        console.log('Email sent' + info.response);
        
    }
});


const nodeMailer =  require('nodemailer');

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 4000,
    auth: {
        user: 'myemail',
        pass:'***********'
    },
    tls: {
        rejectUnauthorized: false
    }
});

const HelperOptions = {
    from: 'myemail',
    to: 'myemail',
    subject: 'Sending an email with nodemailer',
    text: 'Everything is working fine',
    html: "<b>Good work !</b>"
};

transporter.sendMail(HelperOptions, function(error, info){
    if(error) {
        console.log(error);   
    } else {
        console.log('Email sent' + info.response);
        
    }
});

module.exports = nodeMailer;