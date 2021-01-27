const express = require('express');
const path = require('path');

const app = express();

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

module.exports = app;
