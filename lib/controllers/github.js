const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const GithubUser = require('../models/GithubUser');
const { codeForToken, fetchGithubProfile } = require('../services/github');

const jwt = require('jsonwebtoken');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', (req, res) => {
    // redirect 2 gh
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  })
  .get('/callback', async (req, res, next) => {
    try {
      const { code } = req.query;
      const token = await codeForToken(code);
      // use the token to get info about the user from Github
      const { email, login, avatar_url } = await fetchGithubProfile(token);
      // create a user with that info in our database
      let user = await GithubUser.findBylogin(login);
      if (!user) {
        user = await GithubUser.insert({
          login,
          email,
          avatar: avatar_url,
        });
      }

      const payload = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      res
        .cookie(process.env.COOKIE_NAME, payload, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .redirect('/api/v1/github/dashboard');
    } catch (e) {
      next(e);
    }
  })
  .get('/dashboard', [authenticate], (req, res) => {
    res.json(req.user);
  });
