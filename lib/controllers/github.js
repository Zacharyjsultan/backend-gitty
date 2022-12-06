const { Router } = require('express');
const { codeForToken } = require('../services/github');

module.exports = Router()
  .get('/login', (req, res) => {
    // redirect 2 gh
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  })
  .get('/callback', async (req, res) => {
    const { code } = req.query;

    // u take code i take token
    const token = await codeForToken(code);
    // use token for info from user(github)
    res.json({ token });
    // create user with that info in DB
  });
