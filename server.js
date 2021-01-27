const {screenshot} = require('./screenshot-playwright.js')

const express = require('express');
const app = express();

app.use(screenshot);

const server = app.listen(process.env.PORT || 8080, err => {
    if (err) return console.error(err);
    const port = server.address().port;
    console.info(`App listening on port ${port}`);
  });

module.exports = app;


process.on('unhandledRejection', err => console.error(err))
process.on('uncaughtException', err => console.error(err))
