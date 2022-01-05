require('dotenv').config();
const { info } = require('autoprefixer');
const { text } = require('express');
const express = require('express');
const app = express();



const PORT = process.env.PORT || 5000;

/*
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
*/

const nodemailer = require("nodemailer");


//middleware 
app.use(express.static('public'));
app.use(express.json())

app.get('/', (req, res)=>{
	res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req, res)=>{
    console.log(req.body)



    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL_ID,
        subject: `Message from${req.body.email}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    })
})

app.listen(PORT, ()=>{
    console.log(`Server running onport ${PORT}`)
})