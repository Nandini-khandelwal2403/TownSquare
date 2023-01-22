require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const key = fs.readFileSync(path.join(__dirname, '/certs/selfsigned.key'));
const cert = fs.readFileSync(path.join(__dirname, '/certs/selfsigned.crt'));
const options = {
    key: key,
    cert: cert
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const server = http.createServer(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});