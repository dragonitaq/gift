const express = require('express');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).sendFile(`${__dirname}/pages/index.html`);
});

app.get('/gift', (req, res) => {
  res.status(200).sendFile(`${__dirname}/pages/gift.html`);
});

app.get('/delivery', (req, res) => {
  res.status(200).sendFile(`${__dirname}/pages/delivery.html`);
});

app.get('/about', (req, res) => {
  res.status(200).sendFile(`${__dirname}/pages/about.html`);
});

app.get('/contact', (req, res) => {
  res.status(200).sendFile(`${__dirname}/pages/contact.html`);
});

app.post('/enquiry', (req, res) => {
  const { name, email, msg } = req.body;

  const emailContent = {
    to: process.env.EMAIL_TO, // Change to your recipient
    from: process.env.EMAIL_FROM, // Change to your verified sender
    subject: `Enquiry from MJ Gift website by ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${msg}`,
    html: `<strong>Name:</strong> ${name}\n<strong>Email:</strong> ${email}\n<strong>Message:</strong>\n${msg}`,
  };

  sgMail
    .send(emailContent)
    .then(() => {
      res.status(200).sendFile(`${__dirname}/pages/enquiry.html`);
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.get('*', function (req, res) {
  res.status(404).sendFile(`${__dirname}/pages/404.html`);
});

module.exports = app;
