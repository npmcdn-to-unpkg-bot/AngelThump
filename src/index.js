'use strict';

const app = require('./app');
const port = app.get('port');

const fs = require('fs');
const https  = require('https');

const server = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/angelthump.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/angelthump.com/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/angelthump.com/fullchain.pem')
}, app).listen(port);

app.setup(server);