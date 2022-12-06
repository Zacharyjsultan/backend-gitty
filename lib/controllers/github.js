const { Router } = require('express');

module.exports = Router()
  .get('/login', (req, res) => {
    // redirect 2 gh
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  })
  .get('/callback', (req, res) => {
    // code from URL params
    // u take code i take token
    // use token for info from user(github)
    // create user with that info in DB
  });
