const express = require('express');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config({ path: './config.env' });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

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

// Handle contact form with reCaptcha v3.
app.post('/enquiry-form', (req, res) => {
  const { name, email, msg, token } = req.body;

  if (!token) {
    console.log('No reCaptcha token received');
    return res.status(403).json({
      status: 'fail',
    });
  }

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;

  axios
    .get(verifyUrl)
    .then((response) => {
      if (response.data.score >= 0.5) {
        const emailContent = {
          to: `${process.env.EMAIL_TO}`, // Change to your recipient
          from: `${process.env.EMAIL_FROM}`, // Change to your verified sender
          subject: `Enquiry from MJ Gift website by ${name}`,
          text: `Name: ${name} Email: ${email} Message: ${msg}`,
          html: `<strong>Name:</strong> ${name}\n<strong>Email:</strong> ${email}\n<strong>Message:</strong>\n${msg}`,
        };
        sgMail
          .send(emailContent)
          .then(() => {
            res.status(200).json({ status: 'success' });
          })
          .catch((error) => {
            console.error(error);
            res.status(403).json({ status: 'fail' });
          });
      } else {
        return res.status(403).json({
          status: 'fail',
        });
      }
    })
    .catch((err) => {
      console.error(error);
      return res.status(403).json({
        status: 'fail',
      });
    });
});

app.get('*', function (req, res) {
  res.status(404).sendFile(`${__dirname}/pages/404.html`);
});

module.exports = app;
