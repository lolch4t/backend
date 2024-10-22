const cors = require('cors');
const express = require('express');

function setupMiddleware(app) {
  // Enable CORS
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
  }));

  // Parse JSON bodies
  app.use(express.json());

  // Basic security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });
}

module.exports = { setupMiddleware };
