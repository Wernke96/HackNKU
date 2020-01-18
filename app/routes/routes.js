const passport = require('passport');
const express = require('express');
const AuthenticationController = require('../controller/auth');
const requireAuth = passport.authenticate('jwt', { session: false });
const passportService = require('../../config/passport');

module.exports = function setupRoutes(app) {

    app.post('/login', AuthenticationController.login);


}