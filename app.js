const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

require('dotenv').config();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    return res.render('home');
});
app.post('/', (req, res, next) => {
    let bodyText =
        'There is a new response to the form on your Engineer On Call website. The details of the person are as follows:\n\n1. Name: ' +
        req.body.name +
        '\n2. Phone Number:' +
        req.body.number +
        '\n3. Site Address: ' +
        req.body.address +
        '\n 4. Package: ' +
        req.body.type;
    const optionalBodyText =
        '\n5. Time:' + req.body.time + '\n6. Date:' + req.body.date;
    if (req.body.type == 'Single Visit') {
        bodyText += optionalBodyText;
    }
    const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.GMAILUSER,
            pass: process.env.GMAILPW,
        },
    });
    const mailOptions = {
        to: 'info@engineeroncall.in',
        from: process.env.GMAILUSER,
        subject: 'New Response To Engineer On Call Form',
        text: bodyText,
    };
    smtpTransport.sendMail(mailOptions, (err) => {
        if (err) console.log(err);
        else console.log(bodyText);
        return res.render('home');
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
});
